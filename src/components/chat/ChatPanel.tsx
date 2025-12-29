// app/components/chat/ChatPanel.tsx
'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatComplete from './ChatComplete';
import { useChatState } from './hooks/useChatState';

interface ChatPanelProps {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const { state, handlers, resetChat } = useChatState();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };



  // Smooth close with animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      if (typeof onClose === 'function') {
        onClose();
      } else {
        console.error('onClose is not a function');
      }
      resetChat();
      setIsClosing(false);
    }, 300);
  }, [onClose, resetChat]);

  // Prevent body scroll when chat is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/20 p-4 md:items-center transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        className={`relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden transition-transform duration-300 ${isClosing ? 'translate-y-4' : 'translate-y-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* FIXED: Pass handleClose directly */}
        <ChatHeader onClose={handleClose} />

        <div className="h-96 overflow-y-auto bg-gray-50">
          <ChatMessages messages={state.messages} />
        </div>

        {state.step === 'complete' ? (
          <ChatComplete
            onNewChat={() => {
              resetChat();
              handlers.setStep('message');
            }}
          />
        ) : (
          <ChatInput
            step={state.step}
            message={state.message}
            email={state.email}
            isSubmitting={state.isSubmitting}
            onMessageChange={handlers.setMessage}
            onEmailChange={handlers.setEmail}
            onMessageSubmit={handlers.handleMessageSubmit}
            onEmailSubmit={handlers.handleEmailSubmit}
            onStartChat={() => handlers.setStep('message')}
          />
        )}
      </div>
    </div>
  );
}