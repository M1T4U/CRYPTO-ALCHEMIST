import React, { useState, useEffect } from 'react';
import type { Module } from '../types';

const TypingEffect: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText(''); // Reset on chapter change
        setIsComplete(false);
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
                setIsComplete(true);
            }
        }, 20); // Adjust typing speed here

        return () => clearInterval(typingInterval);
    }, [text]);

    return (
        <p className={`whitespace-pre-line ${className || ''}`}>
            {displayedText}
            {!isComplete && <span className="animate-blink inline-block -ml-1">|</span>}
        </p>
    );
};

const Keyword = ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-keyword-light dark:text-tech-green">
        {children}
    </strong>
);

const ChapterContentWrapper: React.FC<{ title: string, level: string, children: React.ReactNode }> = ({ title, level, children }) => (
    <div className="animate-fade-in">
        <div className="mb-8">
            <span className="text-sm font-medium bg-brand-blue/20 text-brand-blue py-1 px-3 rounded-full">{level}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-brand-blue to-brand-purple text-transparent bg-clip-text mb-4">{title}</h1>
        <div className="max-w-none space-y-6">
            {children}
        </div>
    </div>
);

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-tertiary p-4 rounded-lg border border-border-color my-6 prose-p:my-0">
        <div className="text-sm text-text-secondary">{children}</div>
    </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start">
        <span className="mr-3 mt-1 flex-shrink-0 font-bold bg-gradient-to-r from-brand-blue to-green-400 text-transparent bg-clip-text">•</span>
        <span>{children}</span>
    </li>
);

export const modules: Module[] = [
    {
        id: 'module-1',
        title: 'Module 1: Crypto Fundamentals',
        level: 'Beginner',
        chapters: [
            {
                id: 'm1-intro',
                title: 'Welcome, Digital Alchemist',
                level: 'Beginner',
                content: <ChapterContentWrapper title="Welcome, Digital Alchemist" level="Beginner">
                    <TypingEffect text={`Yoou are entering a world where markets move at the speed of thought, and every tick in price tells a story. This is not traditional investing. This is crypto trading—an intense, real-time battle of psychology, strategy, and execution where milliseconds can mean millions, and the prepared trader thrives while the unprepared is swept aside.

This handbook is your tactical guide to mastering the chaos, a blueprint forged in the heat of volatile markets, designed to turn raw information into profitable decisions. It is packed with advanced strategies, proven systems, and deep insights drawn from real market experience—built to transform you from an uncertain participant into a confident, consistent, and strategic crypto trader.

In this arena, there are no closing bells. Crypto never sleeps. Global liquidity moves 24/7 across decentralized exchanges, leveraged derivatives, and volatile altcoin pairs. Success belongs to those who can read the signals beneath the surface—who analyze order books, price action, and volume with surgical precision, while managing risk and emotion with the discipline of a professional.

You will learn to see what others miss—the early whispers of a trend reversal, the subtle patterns in candlestick behavior, the buildup before a breakout. You’ll decode on-chain metrics, social sentiment, and macro triggers that move entire sectors. More importantly, you’ll build a system that removes guesswork and replaces it with structured, repeatable decisions.

But trading isn’t just data. It’s war against your own emotions. You’ll need to train your mind to remain focused and calm while others are driven by fear, greed, or FOMO. You’ll develop the mental resilience to stick to your plan in the face of volatility—and the emotional strength to accept losses without losing confidence.

This isn’t about gambling. It’s not luck. It’s about mastering the edge—the small, consistent advantages that compound over time. You’ll learn how to size your positions, manage your portfolio, and build your strategy around probabilities, not predictions.

Whether you trade Bitcoin, altcoins, perpetuals, or options, the core principles remain the same: discipline, data, and timing. And with the right mindset, the right system, and relentless execution, crypto trading can be your path to financial independence—faster, freer, and more accessible than ever before.

So step in. Sharpen your edge. The markets are waiting—and every chart holds an opportunity for the trader who knows where to look.`} />
                </ChapterContentWrapper>
            },
            {
                id: 'm1-what-is-crypto',
                title: 'What is Cryptocurrency?',
                level: 'Beginner',
                content: <ChapterContentWrapper title="What is Cryptocurrency?" level="Beginner">
                    <p>A cryptocurrency is a digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit or double-spend. Most exist on decentralized networks using blockchain technology—a distributed ledger enforced by a global network of computers. A defining feature is their theoretical immunity to government interference, as they are generally not issued by any central authority.</p>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Key Arcane Knowledge:</h3>
                    <ul className="space-y-4">
                        <ListItem>Decentralized Power: This technology allows digital assets to exist outside the control of governments and central banks.</ListItem>
                        <ListItem>Disruptive Potential: Experts believe blockchain will revolutionize many industries, including finance and law.</ListItem>
                        <ListItem>Advantages: The magic of crypto includes cheaper, faster money transfers and systems that don't have a single point of failure.</ListItem>
                        <ListItem>Disadvantages: Be wary of price volatility, the high energy cost of some networks, and its use in illicit activities.</ListItem>
                    </ul>
                </ChapterContentWrapper>
            },
            {
                id: 'm1-blockchain',
                title: 'Blockchain: The Cosmic Ledger',
                level: 'Beginner',
                content: <ChapterContentWrapper title="Blockchain: The Cosmic Ledger" level="Beginner">
                    <p>Cryptocurrency is powered by blockchain, a celestial ledger of connected blocks of information. Each transaction is a new entry, independently verified by network participants and cryptographically linked to the last, forming an immutable chain. This technology enables a world without traditional intermediaries, built on verifiable digital trust.</p>
                    <p>Every new block must be verified before being confirmed, making the transaction history almost impossible to forge. Experts see blockchain's potential far beyond currency, envisioning uses in supply chains, online voting, and crowdfunding.</p>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Core Concepts:</h3>
                    <ul className="space-y-4">
                        <ListItem>Decentralization: No single entity is in control. The network is maintained by its participants (nodes).</ListItem>
                        <ListItem>Cryptography: Advanced math secures transactions and controls the creation of new units using techniques like public-private key pairs.</ListItem>
                        <ListItem>Consensus Mechanisms: How the network agrees on the state of the ledger. Common types are Proof-of-Work (PoW) and Proof-of-Stake (PoS).</ListItem>
                    </ul>
                </ChapterContentWrapper>
            },
            {
                id: 'm1-types-of-crypto',
                title: 'A Universe of Digital Assets',
                level: 'Beginner',
                content: <ChapterContentWrapper title="A Universe of Digital Assets" level="Beginner">
                    <p>While Bitcoin was the genesis, thousands of cryptocurrencies now exist, each with a unique purpose. Understanding these types is key to identifying projects with true potential.</p>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Categories of Crypto:</h3>
                    <ul className="space-y-4">
                        <ListItem>Utility Tokens: Created to perform a specific function on a blockchain. For example, Ethereum's Ether (ETH) is used to pay for transaction fees on its network.</ListItem>
                        <ListItem>Transactional Tokens: Designed primarily as a method of payment. Bitcoin is the most famous example.</ListItem>
                        <ListItem>Governance Tokens: Grant holders voting rights or other powers on a blockchain protocol, like Uniswap's UNI token.</ListItem>
                        <ListItem>Platform Tokens: Support decentralized applications (dApps) built on a specific blockchain, such as Solana (SOL).</ListItem>
                        <ListItem>Security Tokens: Digital representations of ownership in a real-world asset, like tokenized stocks or real estate.</ListItem>
                    </ul>
                    <CodeBlock>A guiding principle: A cryptocurrency with a clear purpose is often a more sound and less risky investment than one with no discernible use case.</CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm1-wallets',
                title: 'Wallets: Your Digital Vault',
                level: 'Beginner',
                content: <ChapterContentWrapper title="Wallets: Your Digital Vault" level="Beginner">
                    <p>A crypto wallet is your gateway to the digital economy. It doesn't store your coins, but rather the secret keys that prove your ownership and allow you to make transactions. Mastering wallet security is non-negotiable.</p>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Wallet Spectrum:</h3>
                    <ul className="space-y-4">
                        <ListItem>Hot Wallets (Software/Web): Connected to the internet. Convenient for frequent use but less secure. (e.g., MetaMask, Trust Wallet).</ListItem>
                        <ListItem>Cold Wallets (Hardware): Offline physical devices offering maximum security for long-term storage. (e.g., Ledger, Trezor).</ListItem>
                    </ul>
                    <CodeBlock>The Golden Rule: NEVER share your seed phrase. Write it down and store it in multiple secure, physical locations. "Not your keys, not your coins."</CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm1-exchanges',
                title: 'Exchanges: The Grand Bazaar',
                level: 'Beginner',
                content: <ChapterContentWrapper title="Exchanges: The Grand Bazaar" level="Beginner">
                    <p>Crypto exchanges are marketplaces where you buy, sell, and trade digital assets. You can also gain exposure through traditional finance vehicles.</p>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Avenues for Acquisition:</h3>
                    <ul className="space-y-4">
                        <ListItem>Centralized Exchanges (CEX): Run by a company (e.g., Binance, Coinbase). User-friendly, high liquidity, but you entrust them with your funds.</ListItem>
                        <ListItem>Decentralized Exchanges (DEX): Run on smart contracts, allowing peer-to-peer trading without a middleman (e.g., Uniswap, PancakeSwap). You retain full custody of your assets.</ListItem>
                        <ListItem>Brokerages: Some traditional brokers like Robinhood allow users to invest in cryptocurrencies, though you may not be able to withdraw them for direct use.</ListItem>
                        <ListItem>ETFs (Exchange-Traded Funds): Provide exposure to crypto without direct ownership. The SEC has approved Bitcoin spot and futures ETFs, as well as Ether spot ETFs.</ListItem>
                    </ul>
                </ChapterContentWrapper>
            },
            {
                id: 'm1-legality',
                title: 'Navigating the Regulatory Cosmos',
                level: 'Beginner',
                content: <ChapterContentWrapper title="Navigating the Regulatory Cosmos" level="Beginner">
                    <p>Unlike government-issued fiat currency, crypto's legal status is a complex, evolving tapestry that varies across the globe. Understanding the rules of the jurisdictions you operate in is crucial.</p>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">A Global Snapshot:</h3>
                    <ul className="space-y-4">
                        <ListItem>United States: The IRS treats crypto as property for tax purposes. Regulatory bodies like the SEC are actively involved, with court rulings suggesting crypto can be a security in some contexts (e.g., institutional sales).</ListItem>
                        <ListItem>Europe: The Markets in Crypto-Assets (MiCA) regulation provides a legal framework, establishing rules for crypto service providers to protect users.</ListItem>
                        <ListItem>Asia: Japan defines Bitcoin as legal property, requiring exchanges to collect customer data. China has banned crypto transactions and mining. India is still developing its framework.</ListItem>
                        <ListItem>El Salvador: As of mid-2024, El Salvador remains the only country to adopt Bitcoin as official legal tender.</ListItem>
                    </ul>
                </ChapterContentWrapper>
            },
            {
                id: 'm1-adv-disadv',
                title: 'The Two Sides of the Coin',
                level: 'Beginner',
                content: <ChapterContentWrapper title="The Two Sides of the Coin" level="Beginner">
                    <p>Crypto was born from a revolutionary vision, but like any powerful magic, it has both light and shadow. A true alchemist understands both sides.</p>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Advantages (The Light):</h3>
                    <ul className="space-y-4">
                        <ListItem>Decentralization: Removes single points of failure like banks, preventing a crisis at one institution from crashing the system.</ListItem>
                        <ListItem>Ease of Transfer: Allows for direct peer-to-peer fund transfers without costly intermediaries.</ListItem>
                        <ListItem>Streamlined Remittances: Can make cross-border payments faster and cheaper by using crypto as an intermediate currency.</ListItem>
                    </ul>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Disadvantages (The Shadow):</h3>
                     <ul className="space-y-4">
                        <ListItem>Pseudonymity: Transactions aren't truly anonymous; they leave a digital trail that can be traced.</ListItem>
                        <ListItem>Illicit Use: Its nature has made it a tool for criminal activities, from dark web marketplaces to ransomware.</ListItem>
                        <ListItem>Centralization Creep: While decentralized in theory, mining and ownership are becoming increasingly concentrated among large entities.</ListItem>
                        <ListItem>Price Volatility: Extreme price swings are common, making it a highly speculative and risky asset class for the unprepared.</ListItem>
                    </ul>
                </ChapterContentWrapper>
            }
        ]
    },
    {
        id: 'module-2',
        title: 'Module 2: Technical Analysis',
        level: 'Intermediate',
        chapters: [
            {
                id: 'm2-ta-intro',
                title: 'Reading the Market\'s Soul',
                level: 'Intermediate',
                content: <ChapterContentWrapper title="Reading the Market's Soul" level="Intermediate">
                    <p>Technical Analysis (TA) is the art and science of forecasting future price movements by studying historical market data, with a primary focus on price action and volume. It's built on the premise that all available information is already priced into the market, and that human psychology creates predictable, repeatable patterns.</p>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Three Fundamental Assumptions</h3>
                    <ul className="space-y-4">
                        <ListItem><strong>Market Action Discounts Everything:</strong> All factors—news, earnings, sentiment—are already reflected in the current price.</ListItem>
                        <ListItem><strong>Price Moves in Trends:</strong> Prices tend to move in identifiable directions (uptrend, downtrend, or sideways) over time.</ListItem>
                        <ListItem><strong>History Repeats Itself:</strong> Human psychology remains constant, leading to recurring and predictable chart patterns.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Trader's Toolkit</h3>
                    <p>Technical analysts use a variety of tools to interpret the market's language. Here are the essentials:</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Charts:</strong> The canvas of the market. Candlestick charts are most popular, as each candle tells a story of the battle between buyers (bulls) and sellers (bears) over a specific time frame.</ListItem>
                        <ListItem><strong>Trends, Support, and Resistance:</strong> The absolute foundation. An uptrend is a series of higher highs and higher lows. Support is a price floor where buyers step in, while Resistance is a price ceiling where sellers emerge. A broken level often reverses its role.</ListItem>
                        <ListItem><strong>Volume:</strong> The "truth detector." Volume should confirm the strength of a price move. A breakout on high volume is much more significant than one on low volume.</ListItem>
                        <ListItem><strong>Chart Patterns:</strong> Recognizable shapes like Head and Shoulders (reversal), Triangles (continuation), and Double Tops/Bottoms (reversal) that can signal future price direction.</ListItem>
                        <ListItem><strong>Indicators & Oscillators:</strong> Mathematical tools that help confirm trends and momentum. Key examples include Moving Averages (to identify trend direction), the Relative Strength Index (RSI) (to measure overbought/oversold conditions), and MACD.</ListItem>
                        <ListItem><strong>Fibonacci Analysis:</strong> A tool for identifying potential support and resistance levels (retracements) and price targets (extensions) based on natural market rhythms.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Psychology and Risk Management</h3>
                    <p>Beyond the charts, TA is a study of crowd psychology—the endless cycle of fear and greed. Success is not just about reading patterns; it's about managing your own emotions and biases.</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Risk Management is Paramount:</strong> Professionals focus on preserving capital. This involves proper position sizing (e.g., risking only 1-2% per trade), using mandatory stop-losses, and ensuring a favorable risk-to-reward ratio.</ListItem>
                        <ListItem><strong>Multiple Time Frame Analysis:</strong> A top-down approach—analyzing long-term charts for trend and short-term charts for entry—provides a more complete picture of the market.</ListItem>
                    </ul>
                    
                    <CodeBlock>Remember: Technical analysis is not a crystal ball. It is a probabilistic discipline. The goal is to identify high-probability opportunities where the potential reward outweighs the risk.</CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm2-candlesticks',
                title: 'Language of Candlesticks',
                level: 'Intermediate',
                content: <ChapterContentWrapper title="The Language of Candlesticks" level="Intermediate">
                    <p>Each candle tells a story of the <strong>eternal battle between buyers (bulls) and sellers (bears)</strong>. Master these patterns to read the market's emotions and gain a decisive trading edge.</p>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Candlestick Battlefield</h3>
                    <ul className="space-y-4">
                        <ListItem><strong>Body</strong>: The main battlefield, showing the session's open-to-close range.</ListItem>
                        <ListItem><strong>Wicks/Shadows</strong>: Represent the extreme high and low prices of the battle.</ListItem>
                        <ListItem><strong>Green/White Candle</strong>: The bulls won the session {'(Close > Open)'}.</ListItem>
                        <ListItem><strong>Red/Black Candle</strong>: The bears won the session {'(Close < Open)'}.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Key Reversal Patterns</h3>

                    <h4 className="text-xl font-semibold text-text-primary mt-6">Hammer & Hanging Man</h4>
                    <p><em>Signal potential bottoms and tops with a single candle.</em></p>
                    <p><strong>The Battle Story:</strong> A small body with a long lower wick shows a fierce rejection of lower prices. When it appears at a bottom (a <strong>Hammer</strong>), it's a bullish signal that buyers fought back heroically. When at a top (a <strong>Hanging Man</strong>), it's a bearish warning that sellers overpowered a push higher.</p>

                    <h4 className="text-xl font-semibold text-text-primary mt-6">Engulfing Patterns</h4>
                    <p><em>A strong, two-candle pattern showing a decisive shift in power.</em></p>
                    <p><strong>The Battle Story:</strong> A large candle completely "swallows" the body of the previous one. A <strong>Bullish Engulfing</strong> pattern (big green engulfs small red) shows a massive bull counterattack. A <strong>Bearish Engulfing</strong> pattern (big red engulfs small green) shows an overwhelming bear assault.</p>

                    <h4 className="text-xl font-semibold text-text-primary mt-6">Doji</h4>
                    <p><em>Represents indecision and a potential turning point.</em></p>
                    <p><strong>The Battle Story:</strong> Bulls and bears fought to a perfect stalemate, where the open and close prices are nearly identical. This "ceasefire" signals market uncertainty and often precedes a major move. Always requires a confirmation candle.</p>

                    <h4 className="text-xl font-semibold text-text-primary mt-6">Morning & Evening Star</h4>
                    <p><em>A powerful, three-candle pattern signaling a major reversal.</em></p>
                    <p><strong>The Battle Story:</strong> This is a three-act epic. The <strong>Morning Star</strong> (bullish) shows bears dominating (big red), then hesitating (small doji/star), then bulls surging back (big green). The <strong>Evening Star</strong> (bearish) is the opposite, marking a potential top.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Master's Quick Reference</h3>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Pattern Power Ranking:</h4>
                    <ul className="space-y-4">
                        <ListItem><strong>Morning/Evening Star</strong> - Most reliable reversals.</ListItem>
                        <ListItem><strong>Engulfing Patterns</strong> - Strong momentum shifts.</ListItem>
                        <ListItem><strong>Hammer/Hanging Man</strong> - Good, but needs confirmation.</ListItem>
                        <ListItem><strong>Doji</strong> - A warning sign, needs strong confirmation.</ListItem>
                    </ul>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">What Amplifies Pattern Power:</h4>
                    <ul className="space-y-4">
                        <ListItem><strong>Volume</strong>: Higher volume equals stronger conviction.</ListItem>
                        <ListItem><strong>Location</strong>: Patterns at key support/resistance are more significant.</ListItem>
                        <ListItem><strong>Context</strong>: Must fit the bigger trend story.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Avoid These Deadly Mistakes</h3>
                     <ul className="space-y-4">
                        <ListItem>Trading patterns in isolation without considering the overall trend or market structure.</ListItem>
                        <ListItem>Jumping in too early without waiting for the candle to close and for confirmation from the next candle.</ListItem>
                        <ListItem>Ignoring volume, which validates the strength of the pattern.</ListItem>
                        <ListItem>Forgetting risk management. Every trade needs a pre-defined stop-loss.</ListItem>
                    </ul>

                    <CodeBlock>
                        <strong>Final Wisdom:</strong> Candlesticks reveal the market's soul—the eternal struggle between fear and greed. Master these patterns, and you'll read the market's emotions like an open book, giving you a decisive edge in your trading battles!
                    </CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm2-sr',
                title: 'Support & Resistance',
                level: 'Intermediate',
                content: <ChapterContentWrapper title="Support & Resistance" level="Intermediate">
                    <p>Support is a price level where buying pressure is strong enough to overcome selling pressure, causing price to bounce. Resistance is the opposite. These are the fundamental building blocks of a chart.</p>
                    <p>Levels are created by historical price action. A broken resistance level often becomes new support, and vice versa. This is known as a "role reversal" or "polarity flip".</p>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Confirming Levels with Candlesticks</h3>
                    <p>Support and resistance levels tell you <strong>where</strong> to watch for a potential trade. Candlestick patterns tell you <strong>when</strong> to act. They reveal the market's psychology at these critical zones and provide powerful confirmation for your trading decisions.</p>
                    <p>Instead of just buying at support or selling at resistance, professionals wait for a specific candlestick pattern to confirm that the level is likely to hold.</p>
                    
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Bullish Signals at a Support Level</h4>
                    <p>When price pulls back to a support area, look for these patterns to signal that buyers are taking control and a bounce is likely:</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Hammer:</strong> A long lower wick shows that sellers pushed the price down, but buyers rejected those low prices and pushed it back up forcefully.</ListItem>
                        <ListItem><strong>Bullish Engulfing:</strong> A large green candle completely "swallows" the previous red candle, indicating a powerful and decisive shift in momentum to the upside.</ListItem>
                        <ListItem><strong>Morning Star:</strong> A three-candle pattern showing a transition from bearish despair to bullish hope, often marking a significant bottom.</ListItem>
                    </ul>
                    
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Bearish Signals at a Resistance Level</h4>
                    <p>When price rallies up to a resistance area, look for these patterns to signal that sellers are stepping in and a drop is likely:</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Shooting Star / Hanging Man:</strong> A long upper wick shows that buyers tried to push higher but were overwhelmed by sellers, who pushed the price back down.</ListItem>
                        <ListItem><strong>Bearish Engulfing:</strong> A large red candle completely "swallows" the previous green candle, showing a decisive takeover by sellers.</ListItem>
                        <ListItem><strong>Evening Star:</strong> The opposite of a Morning Star, this three-candle pattern signals a potential peak as bullish optimism gives way to bearish control.</ListItem>
                    </ul>

                    <CodeBlock>Pro Tip: The most reliable signals occur when a clear candlestick pattern forms right at a pre-defined, significant support or resistance level, and is accompanied by an increase in volume.</CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm2-chart-patterns',
                title: 'Classic Chart Patterns',
                level: 'Intermediate',
                content: <ChapterContentWrapper title="Classic Chart Patterns: The Market's Architectural Blueprints" level="Intermediate">
                    <p>Chart patterns are geometric shapes formed by price movements that can help predict future direction. They are visual representations of the psychological battle between buyers and sellers. Mastering them allows you to see potential trend continuations and reversals before they become obvious to the crowd.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Reversal Patterns: Signaling a Change in the Guard</h3>
                    <p>These patterns suggest that the current trend is losing steam and a change in direction is imminent.</p>

                    <h4 className="text-xl font-semibold text-text-primary mt-6">Head and Shoulders (Bearish)</h4>
                    <p><em>The king of bearish reversal patterns, signaling a potential top.</em></p>
                    <p><strong>The Structure:</strong> It consists of three peaks: a central peak (the <strong>Head</strong>) that is higher than the two surrounding peaks (the <strong>Shoulders</strong>). A trendline drawn connecting the lows between the peaks is called the <strong>Neckline</strong>.</p>
                    <p><strong>The Psychology:</strong> The pattern demonstrates that buying pressure is exhausted. The break of the neckline confirms that sellers have taken control.</p>
                    <p>An <strong>Inverse Head and Shoulders</strong> is the bullish version of this pattern, appearing at bottoms and signaling a potential move from down to up.</p>

                    <h4 className="text-xl font-semibold text-text-primary mt-6">Double Top (Bearish) & Double Bottom (Bullish)</h4>
                    <p><em>A simpler but effective reversal signal.</em></p>
                    <p><strong>The Structure:</strong> A <strong>Double Top</strong> looks like the letter "M" and forms after an uptrend. A <strong>Double Bottom</strong> looks like a "W" and forms at the end of a downtrend.</p>
                    <p><strong>The Psychology:</strong> In a Double Top, buyers fail twice to break through a key resistance level. In a Double Bottom, sellers fail twice to push prices lower. Both show that the prevailing trend's momentum is fading.</p>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Continuation Patterns: The Trend is Your Friend</h3>
                    <p>These patterns represent temporary pauses in an ongoing trend, suggesting the trend is likely to resume its original course.</p>

                    <h4 className="text-xl font-semibold text-text-primary mt-6">Triangles</h4>
                    <p><em>A period of consolidation where energy coils before a breakout.</em></p>
                    <ul className="space-y-4">
                        <ListItem><strong>Ascending Triangle (Bullish):</strong> A flat resistance top and a rising support line. Buyers are becoming increasingly aggressive. A breakout to the upside is expected.</ListItem>
                        <ListItem><strong>Descending Triangle (Bearish):</strong> A flat support bottom and a descending resistance line. Sellers are becoming more aggressive. A breakdown to the downside is expected.</ListItem>
                        <ListItem><strong>Symmetrical Triangle:</strong> Two converging trendlines. Represents pure indecision, but typically resolves in the direction of the prior trend.</ListItem>
                    </ul>

                    <h4 className="text-xl font-semibold text-text-primary mt-6">Flags and Pennants</h4>
                    <p><em>Brief pauses during a powerful, explosive trend.</em></p>
                    <p><strong>The Structure:</strong> These patterns appear after a sharp, near-vertical price move called the "flagpole." A <strong>Flag</strong> is a small, rectangular channel that slopes against the trend. A <strong>Pennant</strong> is a small, symmetrical triangle.</p>
                    <p><strong>The Psychology:</strong> This is a brief period of profit-taking before the next wave of participants jumps in to push the trend further.</p>
                    
                    <CodeBlock>
                        <strong>Pro Tip:</strong> Volume is your confirmation tool. For reversal patterns, volume is often lower on the right side of the pattern. For any breakout from a continuation pattern, a surge in volume is a strong sign of confirmation.
                    </CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm2-indicators',
                title: 'Your Trading Compass',
                level: 'Intermediate',
                content: <ChapterContentWrapper title="Your Trading Compass: Essential Indicators Guide" level="Intermediate">
                    <p>Indicators are mathematical calculations based on price and/or volume that help traders navigate the markets. Think of them as your compass in the trading wilderness - they help confirm trends, momentum, and volatility to guide your decisions. Their key purpose is to transform raw price data into actionable insights.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Moving Averages (MAs): Your Trend GPS</h3>
                    <p>MAs smooth out price noise to reveal the <strong>true trend direction</strong>.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Types & Settings:</h4>
                    <ul className="space-y-4">
                        <ListItem><strong>Simple MA (SMA):</strong> Average of closing prices</ListItem>
                        <ListItem><strong>Exponential MA (EMA):</strong> Gives more weight to recent prices</ListItem>
                        <ListItem><strong>Popular periods:</strong> 20, 50, 100, 200</ListItem>
                    </ul>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">The Golden Cross & Death Cross</h4>
                    <p>A <strong>Golden Cross</strong> occurs when a short-term MA crosses above a long-term MA (e.g., 50-day above 200-day), signaling strong bullish momentum. A <strong>Death Cross</strong> is the opposite and signals bearish momentum.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Trading Strategies:</h4>
                    <ul className="space-y-4">
                        <ListItem><strong>Trend Following:</strong> Trade in the direction of the MA slope.</ListItem>
                        <ListItem><strong>Dynamic Support/Resistance:</strong> Price often bounces off MAs.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">RSI: The Momentum Meter</h3>
                    <p>The Relative Strength Index (RSI) measures the speed and change of price movements.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">The Magic Numbers:</h4>
                    <ul className="space-y-4">
                        <ListItem>Scale: 0 to 100</ListItem>
                        <ListItem>Above 70: <strong>Overbought</strong> (potential sell signal)</ListItem>
                        <ListItem>Below 30: <strong>Oversold</strong> (potential buy signal)</ListItem>
                    </ul>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Divergence: The Power Signal</h4>
                    <p><strong>Bullish Divergence:</strong> Price makes lower lows while RSI makes higher lows. This is a powerful signal that momentum is shifting bullish despite falling prices. <strong>Bearish Divergence</strong> is the opposite.</p>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Bollinger Bands: The Volatility Detector</h3>
                    <p>These bands measure volatility by plotting standard deviations above and below a central moving average.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">The Squeeze: Your Alert System</h4>
                    <p>When the bands contract tightly together, it's a <strong>Bollinger Band Squeeze</strong>. This indicates a period of low volatility and often signals that a big price move is coming soon.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Trading Strategies:</h4>
                    <ul className="space-y-4">
                        <ListItem><strong>Band Bounces:</strong> Price often bounces between the upper and lower bands in a ranging market.</ListItem>
                        <ListItem><strong>Breakout Trading:</strong> Enter a trade when price breaks out of a squeeze with a surge in volume.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">MACD: The Trend-Momentum Master</h3>
                    <p>The Moving Average Convergence Divergence (MACD) is a trend-following momentum indicator that shows the relationship between two moving averages.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Key Signals:</h4>
                    <ul className="space-y-4">
                        <ListItem><strong>Signal Line Crossovers:</strong> The MACD line crossing above the signal line is bullish; crossing below is bearish.</ListItem>
                        <ListItem><strong>Centerline Crossovers:</strong> The MACD line crossing above zero indicates uptrend momentum; crossing below indicates downtrend momentum.</ListItem>
                        <ListItem><strong>Divergence:</strong> Like the RSI, MACD divergence is a very powerful reversal signal.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Indicator Combination Strategies</h3>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">The Triple Confirmation System:</h4>
                    <p>Enter only when multiple indicators align. For example, for a long trade:</p>
                    <ul className="space-y-4">
                        <ListItem><strong>MA:</strong> Price is above the moving average, and the slope is up.</ListItem>
                        <ListItem><strong>RSI:</strong> Is not overbought and is ideally showing bullish momentum.</ListItem>
                        <ListItem><strong>MACD:</strong> Has a bullish crossover confirming the trend.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Common Indicator Mistakes</h3>
                    <ul className="space-y-4">
                        <ListItem><strong>Indicator Overload:</strong> Using too many indicators creates "analysis paralysis." Master 2-3 deeply.</ListItem>
                        <ListItem><strong>Ignoring Price Action:</strong> Indicators support price action; they don't replace it.</ListItem>
                        <ListItem><strong>Wrong Market Conditions:</strong> Using trend indicators (like MAs) in choppy markets, or oscillators (like RSI) in strong trends can lead to false signals.</ListItem>
                        <ListItem><strong>No Confirmation:</strong> Acting on a single indicator signal without looking for confirmation from price or other tools.</ListItem>
                    </ul>

                    <CodeBlock>
                        <strong>Final Wisdom:</strong> Indicators are your compass, not your destination. They help you navigate market conditions, but price action is king. The best traders use indicators to confirm what they see in price, time their entries, and manage risk. Your success formula is: Price Action + Indicator Confirmation + Risk Management = Consistent Profits.
                    </CodeBlock>
                </ChapterContentWrapper>
            }
        ]
    },
     {
        id: 'module-3',
        title: 'Module 3: Advanced Analysis',
        level: 'Advanced',
        chapters: [
            {
                id: 'm3-fa',
                title: 'Fundamental Analysis (FA)',
                level: 'Advanced',
                content: <ChapterContentWrapper title="Fundamental Analysis: Uncovering Intrinsic Value" level="Advanced">
                    <p>While Technical Analysis reads the market's emotions, Fundamental Analysis (FA) seeks to determine a project's true, intrinsic value. It's the art of investing in the technology, the team, and the vision, not just trading the chart. Master FA, and you can identify the giants of tomorrow before the rest of the market wakes up.</p>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Core FA Pillars</h3>
                    <p>A thorough fundamental analysis rests on several key pillars. Before diving deep, every pro trader starts with this high-level checklist:</p>
                    <ul className="space-y-4">
                        <ListItem><strong>The Whitepaper:</strong> The project's constitution. What problem does it solve? Is the solution viable, innovative, and clearly articulated?</ListItem>
                        <ListItem><strong>The Team:</strong> The architects of the future. Are they public and transparent? Do they possess relevant, verifiable experience and a history of successful execution?</ListItem>
                        <ListItem><strong>Tokenomics:</strong> The economic engine. What is the token's core utility? Is there a fixed supply to create scarcity? Is the token distribution fair and transparent, or heavily concentrated in a few hands?</ListItem>
                    </ul>
                    <p className="mt-6">Beyond these foundational pillars, two of the most critical, dynamic factors for assessing long-term potential are the project's community and its roadmap. A project with a revolutionary idea is worthless without a vibrant community to support it and a clear roadmap to guide its development.</p>
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Deep Dive: Community & Roadmap Assessment</h3>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Community Analysis: The Project's Heartbeat</h4>
                    <p><strong>Why It's Crucial:</strong> A strong community drives adoption, provides invaluable feedback, and creates powerful network effects. An active, resilient community is often a leading indicator of a project's ability to survive volatile market cycles.</p>
                    <p className="font-semibold text-text-primary mt-4">Key Metrics to Evaluate:</p>
                    <p className="mt-2"><strong>Quantitative (The Numbers):</strong></p>
                    <ul className="space-y-2 pl-4">
                        <ListItem>Follower counts and engagement rates across Twitter, Discord, and Telegram.</ListItem>
                        <ListItem>GitHub activity: Commits, contributors, and forks signal development health.</ListItem>
                        <ListItem>Holder distribution: Are tokens concentrated in a few wallets or widely distributed?</ListItem>
                    </ul>
                    <p className="mt-4"><strong>Qualitative (The Vibe):</strong></p>
                    <ul className="space-y-2 pl-4">
                        <ListItem>Quality of discussion: Is it deep technical talk or just "wen moon?" speculation?</ListItem>
                        <ListItem>Sentiment during downturns: Panic selling vs. a "keep building" mentality.</ListItem>
                        <ListItem>Real-world use cases and organic ecosystem growth.</ListItem>
                    </ul>
                    <p className="mt-4"><strong>Red Flags to Watch For:</strong></p>
                    <ul className="space-y-2 pl-4">
                        <ListItem>Sudden spikes in followers without news (indicates bots).</ListItem>
                        <ListItem>An echo chamber that shuts down valid criticism.</ListItem>
                        <ListItem>Inactive official channels and poor community management.</ListItem>
                    </ul>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Roadmap Evaluation: The Path Forward</h4>
                    <p><strong>Why It's Crucial:</strong> The roadmap is the strategic plan that outlines the project's vision and development stages. It should be a clear, specific, and realistic guide, not a vague marketing document filled with buzzwords.</p>
                    <p className="font-semibold text-text-primary mt-4">Hallmarks of a Strong Roadmap:</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Clarity & Specificity:</strong> Milestones are measurable and have realistic (even if flexible) timelines. It answers "what" and "why," not just "soon."</ListItem>
                        <ListItem><strong>Technical Coherence:</strong> Features build upon each other logically. The goals are ambitious but technically feasible for the team.</ListItem>
                        <ListItem><strong>Market Alignment:</strong> The roadmap addresses actual market needs and has a clear strategy for gaining a competitive edge.</ListItem>
                        <ListItem><strong>Execution Track Record:</strong> The team has a history of meeting its previous goals, communicating transparently about delays, and delivering quality products.</ListItem>
                    </ul>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Putting It All Together: Critical Questions</h4>
                    <p>Always cross-reference these elements and ask yourself:</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Community:</strong> Is the growth organic? How resilient is the community during a crisis? Are third-party developers inspired enough to build on this platform?</ListItem>
                        <ListItem><strong>Roadmap:</strong> Are the milestones specific enough to be verified as "complete"? Has the team consistently delivered on past promises? Is there a clear path to long-term sustainability?</ListItem>
                        <ListItem><strong>Integration:</strong> Can this team *actually execute* this roadmap? Do the roadmap goals enhance the token's utility as defined in the tokenomics?</ListItem>
                    </ul>
                    <p className="font-semibold text-text-primary mt-4">Tools for Assessment:</p>
                    <ul className="space-y-2 pl-4">
                        <ListItem><strong>Community Tools:</strong> Social media analytics platforms, GitHub trackers, on-chain holder analysis tools (e.g., Etherscan, Dune Analytics), sentiment analysis platforms.</ListItem>
                        <ListItem><strong>Roadmap Tracking:</strong> Official project blogs and updates, GitHub milestone tracking, testnet participation, and monitoring partner announcements.</ListItem>
                    </ul>
                    <CodeBlock>A strong community and an executable roadmap are a project's lifeblood. They provide a clearer signal of long-term potential than short-term price action, making them indispensable tools in your hunt for the next 100x opportunity.</CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm3-onchain',
                title: 'On-Chain Analysis',
                level: 'Advanced',
                content: <ChapterContentWrapper title="On-Chain Analysis: Reading the Blockchain's Story" level="Advanced">
                    <p>On-chain analysis examines publicly available blockchain data to understand investor behavior, network health, and market sentiment. Unlike traditional markets, crypto's transparent ledger provides unprecedented insights into actual user activity and capital flows.</p>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Key Metrics Deep Dive</h3>
            
                    <h4 className="text-xl font-semibold text-text-primary mt-6">1. Active Addresses</h4>
                    <p className="font-semibold text-text-primary mt-4">What It Measures:</p>
                    <p>The number of unique addresses that were active on the network (either as a sender or receiver) in a given period. It's a key proxy for network adoption and genuine usage.</p>
                    <p className="font-semibold text-text-primary mt-4">Interpretation:</p>
                    <ul className="space-y-2 pl-4">
                        <ListItem><strong>Bullish:</strong> Sustained growth in active addresses, especially during price consolidation, signals a healthy, growing network.</ListItem>
                        <ListItem><strong>Bearish:</strong> Declining active addresses despite a rising price suggests hype is outpacing fundamental usage, a potential warning sign.</ListItem>
                    </ul>
            
                    <h4 className="text-xl font-semibold text-text-primary mt-6">2. Exchange Inflow/Outflow</h4>
                    <p className="font-semibold text-text-primary mt-4">What It Reveals:</p>
                    <p>The net flow of coins to and from exchange wallets, indicating potential buying or selling pressure.</p>
                    <ul className="space-y-2 pl-4">
                        <ListItem><strong>Inflows (Coins to Exchanges):</strong> Often indicates an intent to sell. Large, sudden inflows can precede a market downturn.</ListItem>
                        <ListItem><strong>Outflows (Coins from Exchanges):</strong> Suggests investors are moving assets to private wallets for long-term holding (HODLing), reducing the immediately sellable supply. This is generally seen as bullish.</ListItem>
                    </ul>
                    
                    <h4 className="text-xl font-semibold text-text-primary mt-6">3. MVRV Ratio (Market Value to Realized Value)</h4>
                    <p>A powerful valuation tool that compares an asset's market cap to its realized cap. The realized cap values each coin at the price it was last moved, providing a more accurate "cost basis" for the entire market.</p>
                    <p className="font-semibold text-text-primary mt-4">Interpretation Zones:</p>
                    <ul className="space-y-2 pl-4">
                        <ListItem><strong>MVRV &gt; 3.5 (Distribution Zone):</strong> Historically signals market tops where the asset is significantly overvalued.</ListItem>
                        <ListItem><strong>MVRV &lt; 1 (Accumulation Zone):</strong> Historically signals market bottoms where the asset is undervalued, presenting potential buying opportunities.</ListItem>
                    </ul>
            
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Additional Critical On-Chain Metrics</h3>
                    <ul className="space-y-4">
                        <ListItem><strong>NVT Ratio (Network Value to Transactions):</strong> The "P/E ratio" of crypto. A high NVT suggests the network's valuation is outstripping its utility, a potential sign of overvaluation.</ListItem>
                        <ListItem><strong>Supply Distribution:</strong> Tracks whale concentration (risk of dumps), long-term holder supply (price stability), and exchange reserves (available selling pressure).</ListItem>
                        <ListItem><strong>Realized Profit/Loss:</strong> Identifies capitulation events (high realized losses, potential bottoms) and periods of euphoria (high realized profits, potential tops).</ListItem>
                        <ListItem><strong>Dormancy Metrics (e.g., Coin Days Destroyed):</strong> Measures the movement of long-dormant coins. A spike can indicate that experienced, long-term holders are taking profits.</ListItem>
                    </ul>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Advanced Strategies & Tools</h3>
                    <p>Pro analysis involves cross-referencing metrics. For example, a bullish case strengthens when you see growing active addresses, consistent exchange outflows, and a rising MVRV that isn't yet in the danger zone.</p>
                    <p className="font-semibold text-text-primary mt-4">Tools of the Trade:</p>
                     <ul className="space-y-2 pl-4">
                        <ListItem><strong>Free/Freemium:</strong> Glassnode, CoinMetrics, Messari.</ListItem>
                        <ListItem><strong>Professional:</strong> Nansen, IntoTheBlock, Santiment.</ListItem>
                    </ul>
            
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Limitations & Red Flags</h3>
                    <p>On-chain data is not a crystal ball. Be aware of its limitations, such as data from Layer-2 solutions not always being visible on the base layer. Red flags to watch for include declining network usage despite positive news, whale accumulation followed by coordinated selling, or an MVRV ratio reaching extreme highs.</p>
                    
                    <CodeBlock>On-chain analysis provides objective, quantifiable insights impossible in traditional finance. When combined with other fundamental techniques, it creates a powerful framework for identifying opportunities and risks, giving you a distinct edge in the market.</CodeBlock>
            
                </ChapterContentWrapper>
            },
            {
                id: 'm3-narratives',
                title: 'Trading Narratives',
                level: 'Advanced',
                content: <ChapterContentWrapper title="Trading Narratives: The Art of Story-Driven Investment" level="Advanced">
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Understanding Crypto Narratives</h3>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">What Are Trading Narratives?</h4>
                    <ul className="space-y-4">
                        <ListItem>Compelling stories that capture market imagination and drive capital allocation.</ListItem>
                        <ListItem>Thematic investment trends that create sector-wide momentum.</ListItem>
                        <ListItem>Self-fulfilling prophecies where belief in the story drives actual adoption.</ListItem>
                        <ListItem>Market psychology phenomena unique to crypto's speculative nature.</ListItem>
                    </ul>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Why Narratives Matter:</h4>
                    <ul className="space-y-4">
                        <ListItem>Crypto markets are forward-looking and speculation-driven.</ListItem>
                        <ListItem>Stories provide a framework for understanding complex technology.</ListItem>
                        <ListItem>Narratives guide venture capital and retail investment flows.</ListItem>
                        <ListItem>Early narrative identification can lead to outsized returns.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Narrative Lifecycle Analysis</h3>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Stage 1: Inception (Pre-Market Recognition)</h4>
                    <p><strong>Characteristics:</strong> Technology development happening quietly, limited market attention, few projects, and early-stage venture funding.</p>
                    <p><strong>Opportunity:</strong> Highest risk/reward ratio for early adopters.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Stage 2: Early Adoption (Smart Money Entry)</h4>
                    <p><strong>Characteristics:</strong> Key influencers and VCs begin discussing, first successful projects gain traction, and technical discussions increase.</p>
                    <p><strong>Opportunity:</strong> Still significant upside before mainstream adoption.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Stage 3: Mainstream Recognition (Market Expansion)</h4>
                    <p><strong>Characteristics:</strong> Major exchanges list related tokens, traditional media coverage begins, and retail investor FOMO kicks in.</p>
                    <p><strong>Opportunity:</strong> Late but still profitable entry point.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Stage 4: Peak Hype (Distribution Phase)</h4>
                    <p><strong>Characteristics:</strong> Mainstream media saturation, celebrity endorsements, and valuations disconnect from fundamentals.</p>
                    <p><strong>Opportunity:</strong> Exit strategy time for early investors.</p>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Stage 5: Disillusionment (Reality Check)</h4>
                    <p><strong>Characteristics:</strong> Technical limitations become apparent, market corrects, and the narrative loses momentum.</p>
                    <p><strong>Opportunity:</strong> Accumulation of quality projects at discounted prices.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Historical Narrative Case Studies</h3>
                    <ul className="space-y-4">
                        <ListItem><strong>DeFi Summer (2020):</strong> The story of reimagining finance on-chain, driven by yield farming. Lesson: First-mover advantage is powerful, but sustainability is key.</ListItem>
                        <ListItem><strong>NFT Boom (2021):</strong> The digital ownership revolution, driven by art speculation and celebrity adoption. Lesson: Cultural moments can drive irrational valuations.</ListItem>
                        <ListItem><strong>Layer-1 Wars (2021-2022):</strong> The search for "Ethereum killers" solving scalability. Lesson: Technical promises must meet the reality of execution.</ListItem>
                        <ListItem><strong>GameFi/Play-to-Earn (2021-2022):</strong> The convergence of gaming and DeFi. Lesson: Tokenomics sustainability is crucial for long-term success.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Narrative Identification Framework</h3>
                    <p>Narratives can be driven by technology (AI + Crypto, DePIN), regulatory/macro events (institutional adoption, stablecoin regulation), or social/cultural trends (creator monetization, real-world asset tokenization).</p>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Narrative Research and Monitoring</h3>
                     <h4 className="text-xl font-semibold text-text-primary mt-6">Key Information Sources</h4>
                     <ul className="space-y-4">
                         <ListItem><strong>Tier 1 Influencers:</strong> Follow crypto VCs (a16z, Pantera), thought leaders (Vitalik Buterin), and research firms (Messari, Delphi Digital).</ListItem>
                         <ListItem><strong>Early Signal Platforms:</strong> Monitor Twitter/X for real-time sentiment, Discord/Telegram for alpha, and GitHub for development activity.</ListItem>
                         <ListItem><strong>VC Flow Analysis:</strong> Track funding announcements, portfolio construction, and strategic partnerships.</ListItem>
                     </ul>
                    <h4 className="text-xl font-semibold text-text-primary mt-6">Quantitative Tracking</h4>
                    <p>Combine social metrics (hashtag trends, influencer mentions) with on-chain metrics (TVL growth, developer activity) and market metrics (sector rotation, volume changes) for a complete picture.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Advanced Narrative Strategy</h3>
                    <p>Construct a diversified portfolio with core positions in established narratives, growth positions in emerging ones, and smaller "moonshot" positions in pre-narrative tech. Also, look for contrarian opportunities in out-of-favor narratives.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Current and Emerging Narratives (2025)</h3>
                     <ul className="space-y-4">
                        <ListItem><strong>Hot Narratives:</strong> AI x Crypto, Real-World Asset (RWA) Tokenization, Modular Blockchains, DePIN.</ListItem>
                        <ListItem><strong>Developing Narratives:</strong> Quantum Resistance, Decentralized Science (DeSci), Prediction Markets.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Psychological Aspects of Narrative Trading</h3>
                    <p>The biggest challenge is overcoming your own biases. You must actively fight confirmation bias, recency bias, and herd mentality. Manage your emotions, especially FOMO, and develop the patience to see a narrative through its lifecycle.</p>

                    <CodeBlock>
                        Success in narrative trading requires combining technological understanding, market psychology insights, and disciplined execution. The most profitable approach involves identifying narratives early, positioning appropriately for each stage, and maintaining the flexibility to adapt as stories evolve or new ones emerge.
                    </CodeBlock>
                </ChapterContentWrapper>
            }
        ]
    },
    {
        id: 'module-4',
        title: 'Module 4: The Pro Trader',
        level: 'Pro',
        chapters: [
             {
                id: 'm4-risk',
                title: 'Risk Management: Foundation of Trading',
                level: 'Pro',
                content: <ChapterContentWrapper title="Risk Management: The Foundation of Professional Trading" level="Pro">
                    <p>The single greatest differentiator between amateur traders and professionals lies not in their ability to find winning trades, but in their unwavering discipline with risk management. Amateurs ask, "How much can I make?" Professionals ask, "How much can I afford to lose?" This chapter lays down the non-negotiable principles for protecting your capital, the foundation upon which all trading success is built.</p>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Mathematical Reality of Loss</h3>
                    <p>Avoiding large losses is mathematically more important than capturing large gains. The path to recovery from a significant drawdown is brutally steep:</p>
                    <ul className="space-y-4">
                        <ListItem>A <strong>25% loss</strong> requires a <strong>33% gain</strong> to recover.</ListItem>
                        <ListItem>A <strong>50% loss</strong> requires a <strong>100% gain</strong> to recover.</ListItem>
                        <ListItem>A <strong>90% loss</strong> requires a staggering <strong>900% gain</strong> to recover.</ListItem>
                    </ul>
                    <p>Your primary objective is capital preservation. Profits are a secondary outcome of excellent risk management.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Core Risk Management Principles</h3>
                    
                    <h4 className="text-xl font-semibold text-text-primary mt-6">1. Position Sizing: The 1% Rule</h4>
                    <p>The most fundamental rule: <strong>Never risk more than 1-2% of your total portfolio on a single trade.</strong> If your portfolio is $10,000, your maximum risk per trade is $100. This discipline allows you to survive long losing streaks (which are inevitable) and stay in the game.</p>
                    
                    <h4 className="text-xl font-semibold text-text-primary mt-6">2. Stop-Losses: Your Capital Guardian</h4>
                    <p>A stop-loss is a mandatory, pre-defined exit order that sells your position if the price moves against you to a certain point. Trading without one is like flying a plane without an ejector seat—it's not a matter of if, but when, disaster will strike.</p>
                    <p className="font-semibold text-text-primary mt-4">Types of Stops:</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Technical Stop:</strong> Placed below a key support level, trendline, or moving average. This is the preferred method as it's based on market structure.</ListItem>
                        <ListItem><strong>Volatility-Based Stop:</strong> Uses the Average True Range (ATR) to set a dynamic stop that adapts to market volatility. Ideal for preventing premature stop-outs in choppy conditions.</ListItem>
                        <ListItem><strong>Trailing Stop:</strong> A dynamic stop that moves up as the price moves in your favor, locking in profits while giving the trade room to grow.</ListItem>
                    </ul>
                    
                    <h4 className="text-xl font-semibold text-text-primary mt-6">3. Asymmetric Risk-to-Reward (R:R) Ratios</h4>
                    <p>Only take trades where the potential reward is significantly greater than the potential risk. Professionals target a minimum <strong>R:R of 3:1.</strong> This means for every $1 you risk, you aim to make $3.</p>
                    <p>The power of asymmetry is that you can be wrong more often than you are right and still be highly profitable. With a 3:1 R:R, you only need to win 3 out of 10 trades to be profitable.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Advanced Risk Management Strategies</h3>
                    <ul className="space-y-4">
                        <ListItem><strong>Portfolio Heat:</strong> Keep your total risk exposure across all open positions below 5-10% of your portfolio. Be aware of how correlated your assets are—if you are long BTC, ETH, and SOL, you effectively have one big trade on, not three separate ones.</ListItem>
                        <ListItem><strong>Market Condition Adaptation:</strong> Your risk strategy must adapt. In bull markets, you might use wider stops to accommodate volatility. In bear markets, use tighter stops and smaller position sizes. In sideways markets, take profits quickly at range boundaries.</ListItem>
                        <ListItem><strong>Maximum Drawdown Limits:</strong> Define a maximum acceptable loss for your portfolio (e.g., 20%). If you approach this limit, you must reduce position sizes or stop trading entirely to reassess your strategy. This is your personal circuit breaker.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Ultimate Risk Management Checklist</h3>
                    <p>Before placing any trade, you must be able to answer "yes" to all these questions:</p>
                    <ul className="space-y-4">
                        <ListItem>Is my position size calculated to risk no more than 1-2% of my capital?</ListItem>
                        <ListItem>Is my stop-loss level determined and the order ready to be placed?</ListItem>
                        <ListItem>Is my potential reward at least 3x my potential risk?</ListItem>
                        <ListItem>Have I checked my total portfolio heat and correlation risk?</ListItem>
                        <ListItem>Is my emotional state neutral and objective?</ListItem>
                        <ListItem>Is this trade part of my documented trading plan?</ListItem>
                    </ul>

                    <CodeBlock>Risk management isn't just one component of trading—it IS trading. Master these principles, and you'll build the foundation for long-term survival and profitability in the most competitive arena on Earth.</CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm4-psychology',
                title: 'The Trader\'s Mind: Mastering Psychology',
                level: 'Pro',
                content: <ChapterContentWrapper title="The Trader's Mind: Mastering Psychology" level="Pro">
                    <p>The greatest battle in trading is not fought against the market, but against the ingrained human biases within your own mind. A trader with a C-level strategy but A-level psychological control will always outperform a trader with an A-level strategy and C-level psychology. Your profitability is a direct reflection of your mental discipline.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">The Twin Demons: Fear and Greed</h3>
                    <p>All trading mistakes stem from two core emotions: fear and greed. Fear causes you to sell winners too early and hesitate on valid entries. Greed causes you to hold losers too long (hoping they'll come back), over-leverage, and chase pumps. Your job is to create a systematic, rules-based approach that makes these emotions irrelevant.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Conquering Your Cognitive Biases</h3>
                    <p>Cognitive biases are mental shortcuts that lead to irrational decisions. You cannot eliminate them, but you can build systems to mitigate them.</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Confirmation Bias:</strong> The tendency to seek out information that confirms your existing beliefs. <strong>Antidote:</strong> Actively play devil's advocate. Before entering a trade, write down three reasons why it might fail. Follow analysts with opposing views.</ListItem>
                        <ListItem><strong>Loss Aversion:</strong> The pain of losing is psychologically about twice as powerful as the pleasure of gaining. This leads to holding losing trades and selling winning trades too soon. <strong>Antidote:</strong> Use mandatory, pre-set stop-losses and take-profit targets. Let your plan, not your feelings, dictate your exits.</ListItem>
                        <ListItem><strong>FOMO (Fear of Missing Out):</strong> Chasing a price that is already moving rapidly, driven by emotion rather than strategy. <strong>Antidote:</strong> Accept that you will miss moves. There will always be another opportunity. Never trade without a valid setup according to your plan.</ListItem>
                        <ListItem><strong>Revenge Trading:</strong> Trying to win back losses immediately after a losing trade, usually by taking bigger, riskier positions. <strong>Antidote:</strong> Implement a mandatory "cool-off" period. After 2-3 consecutive losses, or a single large loss, step away from the screen for at least a few hours.</ListItem>
                        <ListItem><strong>Overconfidence Bias:</strong> Becoming reckless after a winning streak, believing you can't lose. <strong>Antidote:</strong> Stick to your risk management plan religiously, especially when you're winning. Consider reducing position size slightly after a string of big wins to stay grounded.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Building an EmotionalControl System</h3>
                    <ul className="space-y-4">
                        <ListItem><strong>Pre-Trade Planning:</strong> Define every aspect of the trade (entry, exit, stop, position size) when you are calm and objective—before you put any money on the line.</ListItem>
                        <ListItem><strong>Trade Automation:</strong> Use limit orders for entries and pre-set stop-loss/take-profit orders. This removes the need for in-the-moment emotional decisions.</ListItem>
                        <ListItem><strong>Position Size Comfort:</strong> Never risk so much on one trade that it affects your sleep or causes anxiety. If you're constantly checking a position, your size is too big.</ListItem>
                    </ul>

                    <CodeBlock>The market is a mirror that reflects your internal state. To achieve mastery, you must first master yourself. A trading journal is your most powerful tool in this endeavor, allowing you to track not just your trades, but your emotional patterns.</CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm4-journal',
                title: 'The Trading Journal: Your Learning Engine',
                level: 'Pro',
                content: <ChapterContentWrapper title="The Trading Journal: Your Learning Engine" level="Pro">
                    <p>A trading journal is the single most effective tool for accelerating your growth as a trader. It transforms trading from a series of random events into a structured process of continuous improvement. Elite performers in every field, from athletes to CEOs, use journaling to analyze performance and find edges. Trading is no different.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Essential Journal Components</h3>
                    <p>Your journal should be more than just a log of wins and losses. It must capture your state of mind and your decision-making process.</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Pre-Trade Analysis:</strong> Why are you taking this trade? Screenshot the chart and annotate your setup. Document your entry trigger, stop-loss level, and profit targets. State your calculated position size and the exact dollar amount at risk.</ListItem>
                        <ListItem><strong>Trade Execution:</strong> Log your actual entry and exit prices. Note any slippage or execution issues. Critically, rate your emotional state during the trade on a scale of 1-5 (e.g., calm, anxious, greedy).</ListItem>
                        <ListItem><strong>Post-Trade Review:</strong> What went right? What went wrong? Did you follow your plan perfectly? If not, why? What was the ultimate lesson from this trade, regardless of the outcome?</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Tracking Key Performance Metrics (KPIs)</h3>
                    <p>Your journal data allows you to move beyond gut feelings and analyze your trading like a business.</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Win Rate:</strong> The percentage of trades that are profitable.</ListItem>
                        <ListItem><strong>Risk-to-Reward Ratio (R:R):</strong> Your average winner divided by your average loser. A high win rate means nothing if your R:R is poor.</ListItem>
                        <ListItem><strong>Expectancy:</strong> The ultimate metric. Formula: (Win Rate % * Average Win Size) - (Loss Rate % * Average Loss Size). A positive expectancy means your system is profitable over the long run.</ListItem>
                        <ListItem><strong>Maximum Drawdown:</strong> The largest peak-to-trough decline in your portfolio's value. This measures the inherent risk of your strategy.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Journal Analysis: Finding Your Edge</h3>
                    <p>Regularly (e.g., weekly) review your journal to find patterns:</p>
                    <ul className="space-y-4">
                        <ListItem>Which chart patterns or setups are most profitable for you?</ListItem>
                        <ListItem>What time of day or day of the week are you most successful?</ListItem>
                        <ListItem>What is the most common mistake you make (e.g., moving stops, exiting early)?</ListItem>
                        <ListItem>Is there a correlation between your emotional state and your trading results?</ListItem>
                    </ul>

                    <CodeBlock>Your trading journal is your coach, your therapist, and your business analyst, all in one. Diligent journaling is the fastest path from amateur speculation to professional execution. It's hard work, and most traders won't do it. That's why most traders fail.</CodeBlock>
                </ChapterContentWrapper>
            },
            {
                id: 'm4-ai-bots',
                title: 'AI Trading & Automation',
                level: 'Pro',
                content: <ChapterContentWrapper title="AI Trading & Automation: The Digital Trading Revolution" level="Pro">
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Understanding Automated Trading</h3>
                    <p>AI and automated trading represent the pinnacle of trading execution. These systems use computer algorithms and machine learning to analyze markets and execute trades 24/7, operating with a level of speed, consistency, and discipline that is impossible for a human to replicate. They remove emotion from the equation, making decisions based purely on data and logic.</p>
                    
                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Types of Automated Trading Systems</h3>
                    
                    <h4 className="text-xl font-semibold text-text-primary mt-6">1. Simple Automation Strategies</h4>
                    <ul className="space-y-4">
                        <ListItem><strong>Grid Trading Bots:</strong> Place buy and sell orders at set intervals, profiting from price oscillations in sideways markets. Beginner-friendly but less effective in strong trends.</ListItem>
                        <ListItem><strong>Dollar-Cost Averaging (DCA) Bots:</strong> Automatically purchase fixed dollar amounts at regular intervals, reducing your average cost basis over time. Ideal for long-term accumulation.</ListItem>
                    </ul>

                    <h4 className="text-xl font-semibold text-text-primary mt-6">2. Advanced AI Trading Systems</h4>
                    <ul className="space-y-4">
                        <ListItem><strong>Technical Analysis Bots:</strong> Execute strategies based on indicators like Moving Averages, RSI, and MACD. Can range from simple crossovers to complex, multi-indicator models.</ListItem>
                        <ListItem><strong>Arbitrage Bots:</strong> Exploit price differences for the same asset across different exchanges or pairs. Low-risk but requires speed and capital.</ListItem>
                        <ListItem><strong>Machine Learning Systems:</strong> The most advanced bots. They adapt and learn from market data, using on-chain metrics, sentiment analysis, and news feeds to predict price movements.</ListItem>
                    </ul>
                    
                    <h4 className="text-xl font-semibold text-text-primary mt-6">3. Copy Trading and Social Trading</h4>
                    <p>These platforms allow you to automatically replicate the trades of proven, successful traders. It's a powerful way to learn and diversify your strategies without needing deep technical knowledge yourself.</p>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Platforms and Tools</h3>
                    <p>The landscape of automation tools is vast and growing. It can be broken down into two main categories:</p>
                     <ul className="space-y-4">
                        <ListItem><strong>Exchange-Native Bots:</strong> Many major exchanges like Binance, KuCoin, and Bybit offer built-in, user-friendly bots (Grid, DCA) that are seamlessly integrated into their platforms. This is the perfect starting point for beginners.</ListItem>
                        <ListItem><strong>Third-Party Platforms:</strong> Services like 3Commas and Cryptohopper offer more comprehensive features, connecting to multiple exchanges and providing advanced bot types, backtesting, and marketplaces for strategies.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Building a Custom Bot (Advanced Path)</h3>
                    <p>For traders with programming skills, building a custom bot offers ultimate flexibility. The typical development workflow involves:</p>
                    <ul className="space-y-4">
                        <ListItem><strong>Language & Libraries:</strong> Python is the industry standard, using libraries like `pandas` for data analysis and `ccxt` to connect to exchange APIs.</ListItem>
                        <ListItem><strong>Strategy & Backtesting:</strong> Define your trading rules and rigorously test them against historical data to validate their effectiveness.</ListItem>
                        <ListItem><strong>Deployment & Monitoring:</strong> Run the bot on a cloud server (like AWS) for 24/7 operation and set up real-time monitoring to track performance and errors.</ListItem>
                    </ul>

                    <h3 className="text-2xl font-semibold text-text-primary mt-8">Risk Management in Automated Trading</h3>
                    <p>Automation introduces new layers of risk that must be managed meticulously.</p>
                     <ul className="space-y-4">
                        <ListItem><strong>Technology Risk:</strong> System failures, internet outages, or bugs in the code can lead to significant losses. Redundancy and robust error handling are critical.</ListItem>
                        <ListItem><strong>Market Risk:</strong> Flash crashes or extreme volatility can trigger unexpected behavior in an algorithm. Your bot must have "circuit breakers" or daily loss limits.</ListItem>
                        <ListItem><strong>Automation-Specific Controls:</strong> Always implement strict controls like maximum position sizes, total capital allocation limits, and have a manual override for emergencies.</ListItem>
                    </ul>
                    
                    <CodeBlock>
                        <p className="font-semibold text-text-primary">Introducing ChainTrader_AI:</p>
                        <p className="mt-2">
                            <Keyword>ChainTrader_AI</Keyword> gives you a strategic edge in crypto markets with <Keyword>real-time blockchain intelligence</Keyword> and <Keyword>fully automated trading</Keyword>. It's designed for traders who want to leverage cutting-edge technology to optimize their strategies, execute with precision, and operate 24/7 without emotion. By analyzing <Keyword>on-chain data</Keyword> and market sentiment, <Keyword>ChainTrader_AI</Keyword> identifies opportunities that human traders might miss, helping you stay ahead in the fast-paced world of crypto.
                        </p>
                    </CodeBlock>
                </ChapterContentWrapper>
            },
        ]
    }
];