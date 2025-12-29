// app/components/chat/ChatWidget.tsx
'use client';

import { useState } from 'react';
import FloatingButton from './chat/FloatingButton';
import ChatPanel from './chat/ChatPanel';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);

    };

    const handleClose = () => {
        setIsOpen(false);
        // Optional: Small delay before resetting to avoid flicker
        setTimeout(() => {
            // Reset handled by ChatPanel's internal state
        }, 300);
    };

    return (
        <>
            <FloatingButton
                isOpen={isOpen}
                onClick={isOpen ? handleClose : handleOpen}
            />
            {isOpen && <ChatPanel onClose={handleClose} />}
        </>
    );
}