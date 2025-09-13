import 'dotenv/config';
// Fix: Use standard ES module imports for express and cors, as `import = require()` is not compatible with ES modules.
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
// A port that is unlikely to conflict with the frontend dev server.
const port = 3001;

// Use the cors middleware to allow cross-origin requests from the frontend.
// Explicitly handle pre-flight (OPTIONS) requests first, which browsers
// send to check permissions before a POST request.
app.options('*', cors()); // Enable pre-flight for all routes
app.use(cors()); // Enable CORS for all other requests

// Enable JSON body parsing for POST requests.
// FIX: Explicitly provide path to resolve type overload issue.
app.use('/', express.json());

// Initialize Gemini AI
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("API_KEY not found in environment variables. The AI chatbot functionality will be disabled.");
}
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const systemInstruction = `You are 'CryptoSage', an expert AI assistant specializing in cryptocurrency and trading. Your mission is to provide comprehensive, accurate, and educational answers on all aspects of cryptocurrency and trading.

You will ONLY answer questions about:
1. Cryptocurrency trading (e.g., "What is leverage?").
2. Technical Analysis (e.g., "Explain RSI.").
3. Fundamental Analysis (e.g., "What is tokenomics?").
4. Market trends, risk management, trading psychology, and related topics.

These are your unbreakable rules:
- You MUST use perfect English grammar and spelling. All your responses must be accurate, well-written, and free of any typos.
- NEVER give financial advice. Do not tell users to buy, sell, or hold any crypto asset.
- To make your response more visually appealing and easier to read, you MUST wrap key technical terms and concepts in double asterisks for bolding, like this: **keyword**. For example: "Bitcoin is a **decentralized digital currency** built on **blockchain technology**." Use this for important concepts, not for every other word.
- When creating a list, you MUST start each item on a new line with a single '-' character. For example:
- First item
- Second item
- DO NOT use the '-' character for any other purpose than starting a list item.
- If a user's question contains the term "ChainTrader_AI", you MUST respond with *only* the following text and nothing else: "**ChainTrader_AI** gives you a strategic edge in crypto markets with **real-time blockchain intelligence** and **fully automated trading**. It's designed for traders who want to leverage cutting-edge technology to optimize their strategies, execute with precision, and operate 24/7 without emotion. By analyzing **on-chain data** and market sentiment, **ChainTrader_AI** identifies opportunities that human traders might miss, helping you stay ahead in the fast-paced world of crypto."
- If a user asks "who is Zac", "who is zac", "who is Zaac", or "who created this project", you MUST respond with: "Zaac Mitau is the Developer of this Whole project."
- Under NO circumstances will you deviate from your crypto expertise. Any non-crypto query (e.g., about geography, history, cooking, etc.) must be met with a firm, decisive, and immediate refusal. A suitable response would be: "My apologies, but my expertise is strictly limited to cryptocurrency and trading. I am unable to answer questions outside of this domain."`;

app.post('/api/generate', async (req, res) => {
    if (!ai) {
        return res.status(503).json({ error: "The AI service is not available because the API key is not configured on the server." });
    }

    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'A valid string prompt is required.' });
    }

    // Prioritize the hardcoded response for "ChainTrader_AI" to ensure consistency.
    if (prompt.toLowerCase().includes('chaintrader_ai')) {
        const cannedResponse = "**ChainTrader_AI** gives you a strategic edge in crypto markets with **real-time blockchain intelligence** and **fully automated trading**. It's designed for traders who want to leverage cutting-edge technology to optimize their strategies, execute with precision, and operate 24/7 without emotion. By analyzing **on-chain data** and market sentiment, **ChainTrader_AI** identifies opportunities that human traders might miss, helping you stay ahead in the fast-paced world of crypto.";

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.write(cannedResponse);
        res.end();
        return; // End the request here, bypassing the Gemini API call.
    }

    try {
        const response = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
            }
        });

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        for await (const chunk of response) {
            res.write(chunk.text);
        }
        res.end();
    } catch (error) {
        console.error("Gemini API stream failed:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "An error occurred while processing your request with the AI service." });
        } else {
            res.end();
        }
    }
});

/**
 * In-memory store for subscription status.
 * This is a simple solution for demonstration purposes.
 * In a real-world application, this data should be persisted in a database.
 * The key is a user's unique ID, and the value is an object containing the subscription timestamp.
 */
const subscriptions: Record<string, { subscribedAt: number }> = {};

/**
 * Endpoint to subscribe a user.
 * Expects a `userId` in the request body.
 */
app.post('/api/subscribe', (req, res) => {
    const { userId } = req.body;
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'A valid string userId is required.' });
    }
    subscriptions[userId] = { subscribedAt: Date.now() };
    console.log(`User ${userId} has subscribed. Subscription will be valid for 33 days.`);
    res.status(200).json({ success: true, isSubscribed: true });
});

/**
 * Endpoint to check a user's subscription status.
 * Uses a dynamic parameter `:userId` from the URL.
 */
app.get('/api/subscription-status/:userId', (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        // This case is unlikely given the route structure but good for robustness.
        return res.status(400).json({ error: 'A userId parameter is required.' });
    }
    const subscription = subscriptions[userId];
    let isSubscribed = false;

    if (subscription) {
        const thirtyThreeDaysInMillis = 33 * 24 * 60 * 60 * 1000;
        const subscriptionDate = subscription.subscribedAt;
        const isExpired = (Date.now() - subscriptionDate) > thirtyThreeDaysInMillis;

        if (isExpired) {
            // Subscription has expired, remove it from our records.
            delete subscriptions[userId];
            console.log(`Subscription for user ${userId} has expired and was removed.`);
        } else {
            // Subscription is still active.
            isSubscribed = true;
        }
    }

    console.log(`Checking status for user ${userId}. Subscribed: ${isSubscribed}`);
    res.status(200).json({ isSubscribed });
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
    console.log('This server manages user subscriptions for the Crypto Handbook.');
    console.log('Endpoints:');
    console.log('  POST /api/subscribe');
    console.log('  GET  /api/subscription-status/:userId');
    console.log('  POST /api/generate');
});