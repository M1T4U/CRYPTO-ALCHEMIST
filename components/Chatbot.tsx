
import React, { useState, useRef, useEffect } from 'react';
import type { Message, Theme } from '../types';
import { BotIcon, UserIcon, SendIcon, RestartIcon, SpinnerIcon } from '../constants/icons';
import { getAiResponse } from '../services/geminiService';
import moduleFaqs from '../constants/faq';

const AiMessage: React.FC<{ text: string; isStreaming: boolean }> = ({ text, isStreaming }) => {
    const renderFormattedText = (txt: string) => {
        // Clean up any stray characters from old formatting or rendering issues.
        const cleanedTxt = txt.replace(/[�🔹]/g, '');
        const parts = cleanedTxt.split(/(##.*?##)/g);
        
        return parts.filter(part => part).map((part, index) => {
            if (part.startsWith('##') && part.endsWith('##')) {
                const keyword = part.slice(2, -2);
                return (
                    <strong key={index} className="font-bold bg-gradient-to-r from-brand-blue to-tech-green text-transparent bg-clip-text">
                        {keyword}
                    </strong>
                );
            }
            return part;
        });
    };

    return (
        <p className="text-sm leading-relaxed whitespace-pre-line">
            {renderFormattedText(text)}
            {isStreaming && <span className="animate-blink inline-block w-2 h-4 bg-text-secondary/70 -mb-1 ml-0.5" />}
        </p>
    );
};

const BlockchainNodeBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0 backdrop-blur-sm">
    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-blue/20 rounded-full filter blur-2xl animate-hover" style={{animationDuration: '15s'}}></div>
    <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-brand-purple/20 rounded-full filter blur-3xl animate-hover" style={{animationDuration: '20s', animationDelay: '-5s'}}></div>
    <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-brand-blue/10 rounded-full filter blur-2xl animate-hover" style={{animationDuration: '25s', animationDelay: '-10s'}}></div>
  </div>
);

const getInitialFaqs = (moduleId?: string): string[] => {
    if (moduleId && moduleFaqs[moduleId]) {
        return moduleFaqs[moduleId];
    }
    return moduleFaqs['default'];
};


export const Chatbot: React.FC<{ theme: Theme; moduleId?: string }> = ({ theme, moduleId }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial', text: "Welcome! I'm your Crypto Alchemist Assistant. Ask me anything about crypto, or start with one of the popular questions below.", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showFaqs, setShowFaqs] = useState(true);
    const [currentFaqs, setCurrentFaqs] = useState<string[]>(() => getInitialFaqs(moduleId));
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        // This effect ensures that if the component somehow re-renders with a new moduleId
        // without re-mounting, the FAQs still update correctly.
        setCurrentFaqs(getInitialFaqs(moduleId));
        // When the module context changes, always show the relevant FAQs again.
        setShowFaqs(true);
    }, [moduleId]);

    const handleRestartChat = () => {
        setMessages([{ id: 'welcome-back', text: "Welcome back! I'm ready to assist. You can ask me anything, or start with one of the popular questions below.", sender: 'ai' }]);
        setShowFaqs(true);
    };

    const sendMessage = async (prompt: string) => {
        if (!prompt.trim() || isLoading) return;
        if (showFaqs) setShowFaqs(false);

        const userMessage: Message = { id: Date.now().toString(), text: prompt, sender: 'user' };
        
        const aiMessageId = (Date.now() + 1).toString();
        const aiMessagePlaceholder: Message = { id: aiMessageId, text: '', sender: 'ai' };

        setMessages(prev => [...prev, userMessage, aiMessagePlaceholder]);
        setInput('');
        setIsLoading(true);

        const onChunk = (chunk: string) => {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessageId ? { ...msg, text: msg.text + chunk } : msg
                )
            );
        };

        const onError = (errorText: string) => {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessageId ? { ...msg, text: errorText } : msg
                )
            );
        };
        
        try {
            await getAiResponse(prompt, onChunk, onError);
        } catch (error) {
            console.error("Error in sendMessage streaming:", error);
            onError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendMessage(input);
    };

    return (
        <div className="relative flex flex-col h-full bg-tertiary/50 overflow-hidden">
            <BlockchainNodeBackground />
            <div className="relative p-4 border-b border-border-color flex items-center justify-between z-10">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className={`p-2 bg-brand-purple/20 text-brand-purple rounded-lg transition-all duration-300 ${isLoading ? 'animate-pulse-fast' : ''}`}>
                            <BotIcon />
                        </div>
                        <span className="absolute -bottom-1 -right-1 block h-3 w-3 rounded-full border-2 border-secondary bg-green-400"></span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-brand-blue to-brand-purple text-transparent bg-clip-text">Crypto Alchemist Assistant</h2>
                        <p className="text-sm text-text-secondary">Your AI Trading Tutor</p>
                    </div>
                </div>
                <button 
                  onClick={handleRestartChat}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-tertiary rounded-full transition-colors"
                  aria-label="Restart Chat"
                >
                    <RestartIcon />
                </button>
            </div>
            <div className="relative flex-grow p-4 overflow-y-auto space-y-4 z-10">
                {messages.map((msg, index) => (
                    <div key={msg.id} className={`flex items-start gap-3 animate-fade-in-message ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && (
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                                <BotIcon />
                            </div>
                        )}
                        <div className={`relative max-w-xs md:max-w-md px-4 py-3 rounded-xl ${
                          msg.sender === 'user' 
                            ? 'bg-chat-bubble-user text-chat-bubble-user-text' 
                            : 'bg-chat-bubble-ai text-chat-bubble-ai-text'
                        }`}>
                           {msg.sender === 'ai' ? 
                                <AiMessage text={msg.text} isStreaming={isLoading && index === messages.length - 1} /> :
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                           }
                           <div className={`absolute bottom-0 h-0 w-0 border-[10px] border-solid ${
                               msg.sender === 'user'
                                   ? 'right-[-10px] border-l-chat-bubble-user border-r-transparent border-t-transparent border-b-chat-bubble-user'
                                   : 'left-[-10px] border-l-transparent border-r-chat-bubble-ai border-t-transparent border-b-chat-bubble-ai'
                           }`}></div>
                        </div>
                         {msg.sender === 'user' && (
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-tertiary flex items-center justify-center text-text-secondary">
                                <UserIcon />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {showFaqs && !isLoading && (
                <div className="relative p-4 border-t border-border-color animate-fade-in-message z-10">
                    <div className="grid grid-cols-1 gap-2">
                        {currentFaqs.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => sendMessage(q)}
                                className="text-left w-full bg-secondary/80 hover:bg-secondary p-3 rounded-lg text-sm text-text-primary transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="relative p-4 border-t border-border-color z-10">
                <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about trading..."
                        disabled={isLoading}
                        className="w-full bg-secondary border border-border-color rounded-full py-2 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-purple transition"
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-brand-purple rounded-full text-white hover:bg-opacity-80 disabled:bg-text-muted disabled:cursor-not-allowed transition-colors duration-200">
                        {isLoading ? <SpinnerIcon /> : <SendIcon />}
                    </button>
                </form>
            </div>
        </div>
    );
};