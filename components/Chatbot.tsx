import React, { useState, useRef, useEffect } from 'react';
import type { Message, Theme } from '../types';
import { BotIcon, UserIcon, SendIcon, RestartIcon, SpinnerIcon } from '../constants/icons';
import { getAiResponse } from '../services/geminiService';
import { faqQuestions } from '../constants/faq';

// Enhanced text sanitization function
const sanitizeText = (text: string) => {
  return text
    .replace(/\uFFFD/g, "") // remove � replacement characters
    .replace(/🔹/g, "") // remove diamond characters
    .replace(/[^\x09\x0A\x0D\x20-\uFFFF]/g, "") // strip invalid non-printable chars but keep emojis
    .trim();
};

const AiMessage: React.FC<{ text: string; isStreaming: boolean }> = ({ text, isStreaming }) => {
    const renderFormattedText = (txt: string) => {
        // Clean the text first
        const cleanedTxt = sanitizeText(txt);
        
        // Split by Markdown bold syntax (**keyword**)
        const parts = cleanedTxt.split(/(\*\*.*?\*\*)/g);
        
        return parts.filter(part => part).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                // Remove the ** markers and apply futuristic styling
                const keyword = part.slice(2, -2);
                return (
                    <span 
                        key={index} 
                        className="font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-transparent bg-clip-text animate-pulse shadow-lg"
                        style={{
                            textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
                            filter: 'drop-shadow(0 0 2px rgba(20, 184, 166, 0.8))'
                        }}
                    >
                        {keyword}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="text-sm leading-relaxed whitespace-pre-line">
            {renderFormattedText(text)}
            {isStreaming && (
                <span className="animate-pulse inline-block w-2 h-4 bg-gradient-to-r from-brand-blue to-tech-green -mb-1 ml-1 rounded-sm" />
            )}
        </div>
    );
};

const BlockchainNodeBackground = () => (
    <div className="absolute inset-0 overflow-hidden z-0">
        {/* Enhanced animated background nodes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-brand-blue/30 to-tech-green/20 rounded-full filter blur-2xl animate-hover" 
             style={{animationDuration: '15s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-br from-brand-purple/30 to-brand-blue/20 rounded-full filter blur-3xl animate-hover" 
             style={{animationDuration: '20s', animationDelay: '-5s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-gradient-to-br from-tech-green/20 to-brand-purple/10 rounded-full filter blur-2xl animate-hover" 
             style={{animationDuration: '25s', animationDelay: '-10s'}}></div>
        
        {/* Additional subtle nodes for more depth */}
        <div className="absolute top-3/4 right-1/3 w-16 h-16 bg-brand-blue/10 rounded-full filter blur-xl animate-hover" 
             style={{animationDuration: '18s', animationDelay: '-8s'}}></div>
        <div className="absolute top-1/6 right-1/6 w-20 h-20 bg-tech-green/15 rounded-full filter blur-xl animate-hover" 
             style={{animationDuration: '22s', animationDelay: '-12s'}}></div>
    </div>
);

export const Chatbot: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: 'initial', 
            text: "Welcome! I'm **CryptoSage**, your AI trading tutor. Ask me anything about **cryptocurrency** and **trading strategies**, or start with one of the popular questions below.", 
            sender: 'ai' 
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showFaqs, setShowFaqs] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleRestartChat = () => {
        setMessages([{ 
            id: 'welcome-back', 
            text: "Welcome back! I'm **CryptoSage** and I'm ready to help you with **crypto trading** knowledge. You can ask me anything, or start with one of the popular questions below.", 
            sender: 'ai' 
        }]);
        setShowFaqs(true);
    };

    const sendMessage = async (prompt: string) => {
        if (!prompt.trim() || isLoading) return;
        if (showFaqs) setShowFaqs(false);

        // Sanitize user input
        const cleanPrompt = sanitizeText(prompt);
        const userMessage: Message = { 
            id: Date.now().toString(), 
            text: cleanPrompt, 
            sender: 'user' 
        };
        
        const aiMessageId = (Date.now() + 1).toString();
        const aiMessagePlaceholder: Message = { 
            id: aiMessageId, 
            text: '', 
            sender: 'ai' 
        };

        setMessages(prev => [...prev, userMessage, aiMessagePlaceholder]);
        setInput('');
        setIsLoading(true);

        const onChunk = (chunk: string) => {
            // Clean each chunk as it arrives
            const cleanChunk = sanitizeText(chunk);
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessageId ? { 
                        ...msg, 
                        text: msg.text + cleanChunk 
                    } : msg
                )
            );
        };

        const onError = (errorText: string) => {
            const cleanError = sanitizeText(errorText);
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessageId ? { 
                        ...msg, 
                        text: cleanError || "I apologize, but I encountered an error. Please try asking your question again." 
                    } : msg
                )
            );
        };
        
        try {
            await getAiResponse(cleanPrompt, onChunk, onError);
        } catch (error) {
            console.error("Error in sendMessage streaming:", error);
            onError("I'm experiencing technical difficulties. Please try again in a moment.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendMessage(input);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Don't sanitize input as user types - allow normal typing including spaces
        setInput(e.target.value);
    };

    return (
        <div className="relative flex flex-col h-full bg-gradient-to-br from-tertiary/50 via-tertiary/30 to-secondary/20 overflow-hidden">
            <BlockchainNodeBackground />
            
            {/* Header */}
            <div className="relative p-4 border-b border-border-color/50 backdrop-blur-sm bg-secondary/20 flex items-center justify-between z-10">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className={`p-2 bg-gradient-to-br from-brand-purple/30 to-brand-blue/20 text-brand-purple rounded-lg backdrop-blur-sm border border-brand-purple/20 transition-all duration-300 ${isLoading ? 'animate-pulse scale-105' : 'hover:scale-105'}`}>
                            <BotIcon />
                        </div>
                        <span className="absolute -bottom-1 -right-1 block h-3 w-3 rounded-full border-2 border-secondary bg-gradient-to-r from-tech-green to-brand-blue animate-pulse"></span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-brand-blue via-tech-green to-brand-purple text-transparent bg-clip-text">
                            CryptoSage
                        </h2>
                        <p className="text-sm text-text-secondary">Your AI Trading Tutor</p>
                    </div>
                </div>
                <button 
                    onClick={handleRestartChat}
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-tertiary/50 rounded-full transition-all duration-200 hover:scale-105"
                    aria-label="Restart Chat"
                >
                    <RestartIcon />
                </button>
            </div>

            {/* Messages */}
            <div className="relative flex-grow p-4 overflow-y-auto space-y-4 z-10">
                {messages.map((msg, index) => (
                    <div 
                        key={msg.id} 
                        className={`flex items-start gap-3 animate-fade-in-message ${
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {msg.sender === 'ai' && (
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-brand-purple/30 to-brand-blue/20 flex items-center justify-center text-brand-purple backdrop-blur-sm border border-brand-purple/20">
                                <BotIcon />
                            </div>
                        )}
                        <div className={`relative max-w-xs md:max-w-md px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-200 hover:scale-[1.02] ${
                            msg.sender === 'user' 
                                ? 'bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-violet-600/10 text-white border-purple-400/40 shadow-lg shadow-purple-500/20' 
                                : 'bg-gradient-to-br from-chat-bubble-ai/80 to-secondary/60 text-chat-bubble-ai-text border-border-color/30'
                        }`}>
                            {msg.sender === 'ai' ? (
                                <AiMessage 
                                    text={msg.text} 
                                    isStreaming={isLoading && index === messages.length - 1} 
                                />
                            ) : (
                                <p className="text-sm leading-relaxed">
                                    {sanitizeText(msg.text)}
                                </p>
                            )}
                        </div>
                        {msg.sender === 'user' && (
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 border border-purple-400/50">
                                <UserIcon />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* FAQ Buttons */}
            {showFaqs && !isLoading && (
                <div className="relative p-4 border-t border-border-color/50 backdrop-blur-sm bg-secondary/20 animate-fade-in-message z-10">
                    <div className="grid grid-cols-1 gap-2">
                        {faqQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => sendMessage(q)}
                                className="text-left w-full bg-gradient-to-r from-secondary/80 to-tertiary/60 hover:from-secondary hover:to-tertiary p-3 rounded-lg text-sm text-text-primary transition-all duration-200 backdrop-blur-sm border border-border-color/30 hover:border-brand-blue/50 hover:scale-[1.02]"
                            >
                                {sanitizeText(q)}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Input Form */}
            <div className="relative p-4 border-t border-border-color/50 backdrop-blur-sm bg-secondary/20 z-10">
                <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask about crypto trading..."
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-secondary to-tertiary/80 border border-border-color/50 rounded-full py-3 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all duration-200 backdrop-blur-sm placeholder-text-secondary/70"
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading || !input.trim()} 
                        className="p-3 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full text-white hover:from-brand-purple/80 hover:to-brand-blue/80 disabled:from-text-muted disabled:to-text-muted disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl"
                    >
                        {isLoading ? <SpinnerIcon /> : <SendIcon />}
                    </button>
                </form>
            </div>
        </div>
    );
};