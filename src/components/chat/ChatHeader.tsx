// app/components/chat/ChatHeader.tsx
'use client';
import { MessageCircle, X } from 'lucide-react';

interface ChatHeaderProps {
    onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
    // DEBUG: Check if onClose is valid
    console.log('ChatHeader render, onClose:', typeof onClose, onClose);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();

        // Validate onClose before calling
        if (typeof onClose !== 'function') {
            console.error('onClose is not a function:', onClose);
            return;
        }

        onClose();
    };

    return (
        <div className="border-b border-gray-200 bg-blue-600 p-4 text-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <MessageCircle size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold">World Canine Union</h3>
                        <p className="text-sm text-blue-100">Chat with Mike</p>
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    className="rounded-full p-1 hover:bg-white/20 transition-colors"
                    aria-label="Close chat"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}