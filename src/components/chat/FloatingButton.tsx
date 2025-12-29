// app/components/chat/FloatingButton.tsx
'use client';
import { MessageCircle, X } from 'lucide-react';

interface FloatingButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function FloatingButton({ isOpen, onClick }: FloatingButtonProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-110 active:scale-95"
            aria-label={isOpen ? "Close chat" : "Open chat"}
        >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
    );
}