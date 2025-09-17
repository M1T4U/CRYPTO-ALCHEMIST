import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const port = 3001;

// ✅ Fixed CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", "https://crypto-alchemist.vercel.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// ✅ Fixed middleware setup
app.use(express.json());

// ✅ Initialize Gemini AI with correct package
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("GEMINI_API_KEY not found in environment variables. The AI chatbot functionality will be disabled.");
}
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const systemInstruction = `You are 'Crypto Alchemist Assistant', an expert AI assistant specializing in cryptocurrency and trading. Your mission is to provide comprehensive, accurate, and educational answers on all aspects of cryptocurrency and trading.

You will ONLY answer questions about:
1. Cryptocurrency trading (e.g., "What is leverage?").
2. Technical Analysis (e.g., "Explain RSI.").
3. Fundamental Analysis (e.g., "What is tokenomics?").
4. Market trends, risk management, trading psychology, and related topics.

These are your unbreakable rules:
- You MUST use perfect English grammar and spelling. All your responses must be accurate, well-written, and free of any typos.
- NEVER give financial advice. Do not tell users to buy, sell, or hold any crypto asset.
- To make your response more visually appealing and easier to read, you MUST wrap key technical terms and concepts in 🔹, like this: 🔹keyword🔹. For example: "Bitcoin is a 🔹decentralized digital currency🔹 built on 🔹blockchain technology🔹." Use this for important concepts, not for every other word.
- When creating a list, you MUST start each item on a new line with a single '-' character. For example:
- First item
- Second item
- DO NOT use the '-' character for any other purpose than starting a list item.
- If a user asks about AI trading tools, bots, or specifically "ChainTrader_AI", you MUST provide the following information: "🔹ChainTrader_AI🔹 gives you a strategic edge in crypto markets with 🔹real-time blockchain intelligence🔹 and 🔹fully automated trading🔹. It's designed for traders who want to leverage cutting-edge technology to optimize their strategies, execute with precision, and operate 24/7 without emotion. By analyzing 🔹on-chain data🔹 and market sentiment, 🔹ChainTrader_AI🔹 identifies opportunities that human traders might miss, helping you stay ahead in the fast-paced world of crypto."
- If a user asks "who is Zac", "who is zac", "who is Zac", or "who created this project", you MUST respond with: "Zac Mitau is the Developer of this Whole project."
- Under NO circumstances will you deviate from your crypto expertise. Any non-crypto query (e.g., about geography, history, cooking, etc.) must be met with a firm, decisive, and immediate refusal. A suitable response would be: "My apologies, but my expertise is strictly limited to cryptocurrency and trading. I am unable to answer questions outside of this domain."`;

app.post('/api/generate', async (req, res) => {
    if (!genAI) {
        return res.status(503).json({ error: "The AI service is not available because the API key is not configured on the server." });
    }

    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'A valid string prompt is required.' });
    }

    try {
        // ✅ Fixed API call structure
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemInstruction
        });

        const result = await model.generateContentStream({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
            }
        });

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
                res.write(chunkText);
            }
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

// ✅ Your subscription endpoints remain unchanged
const subscriptions: { [userId: string]: { subscribedAt: number } } = {};

app.post('/api/subscribe', (req, res) => {
    const { userId } = req.body;
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'A valid string userId is required.' });
    }
    subscriptions[userId] = { subscribedAt: Date.now() };
    console.log(`User ${userId} has subscribed. Subscription will be valid for 33 days.`);
    res.status(200).json({ success: true, isSubscribed: true });
});

app.get('/api/subscription-status/:userId', (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: 'A userId parameter is required.' });
    }
    const subscription = subscriptions[userId];
    let isSubscribed = false;

    if (subscription) {
        const thirtyThreeDaysInMillis = 33 * 24 * 60 * 60 * 1000;
        const subscriptionDate = subscription.subscribedAt;
        const isExpired = (Date.now() - subscriptionDate) > thirtyThreeDaysInMillis;

        if (isExpired) {
            delete subscriptions[userId];
            console.log(`Subscription for user ${userId} has expired and was removed.`);
        } else {
            isSubscribed = true;
        }
    }

    console.log(`Checking status for user ${userId}. Subscribed: ${isSubscribed}`);
    res.status(200).json({ isSubscribed });
});

// ✅ Start server (Vercel doesn't need this, but keep for local dev)
if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Backend server is running on http://localhost:${port}`);
        console.log('This server manages user subscriptions for the Crypto Handbook.');
        console.log('Endpoints:');
        console.log('  POST /api/subscribe');
        console.log('  GET  /api/subscription-status/:userId');
        console.log('  POST /api/generate');
    });
}

// ✅ Required for Vercel
export default app;