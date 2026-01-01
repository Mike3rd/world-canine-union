// app/components/chat/ChatMessages.tsx
'use client';
import { useEffect, useRef } from 'react';

interface Message {
    text: string;
    isBot: boolean;
}

interface ChatMessagesProps {
    messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <div className="p-4 space-y-4">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${msg.isBot ? '' : 'justify-end'}`}
                >
                    <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.isBot
                            ? 'rounded-tl-none bg-white border border-gray-200 text-gray-800'
                            : 'rounded-tr-none bg-blue-600 text-white'
                            }`}
                    >
                        {/* Add a <span> with break-words here */}
                        <span className="break-words whitespace-pre-wrap">
                            {msg.text}
                        </span>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}