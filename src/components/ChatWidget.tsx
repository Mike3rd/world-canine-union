// app/components/ChatWidget.tsx
'use client';
import { useState } from 'react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'welcome' | 'message' | 'email' | 'complete'>('welcome');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        // Send to your API
        await fetch('/api/chat/submit', {
            method: 'POST',
            body: JSON.stringify({ message, email })
        });

        setStep('complete');
    };

    return (
        <>
            {/* Floating button */}
            <button onClick={() => setIsOpen(true)} className="chat-button">
                💬
            </button>

            {/* Chat panel */}
            {isOpen && (
                <div className="chat-panel">
                    <div className="chat-messages">
                        {step === 'welcome' && (
                            <div className="bot-message">
                                👋 Hi! How can we help?
                            </div>
                        )}
                        {/* ... more steps */}
                    </div>

                    <input
                        value={step === 'message' ? message : email}
                        onChange={/* ... */}
                        placeholder={step === 'message' ? 'Type your message...' : 'Your email...'}
                    />
                </div>
            )}
        </>
    );
}