// app/admin/emails/components/ReplyForm.tsx
'use client';

import { Reply } from 'lucide-react';
import { useState } from 'react';

interface ReplyFormProps {
    onSubmit: (replyText: string) => Promise<void> | void;
    disabled?: boolean;
}

export default function ReplyForm({ onSubmit, disabled = false }: ReplyFormProps) {
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!replyText.trim() || disabled || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onSubmit(replyText);
            setReplyText(''); // Clear on success
        } catch (error) {
            console.error('Reply submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Submit on Ctrl/Cmd + Enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t pt-6">
            <h3 className="font-semibold mb-3 text-primary">Send Reply</h3>
            <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={6}
                className="w-full border border-border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Type your reply here... (Ctrl+Enter to send)"
                disabled={disabled || isSubmitting}
            />
            <div className="flex justify-end gap-3 mt-4">
                <button
                    type="button"
                    onClick={() => setReplyText('')}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50"
                    disabled={isSubmitting || !replyText.trim()}
                >
                    Clear
                </button>
                <button
                    type="submit"
                    disabled={!replyText.trim() || disabled || isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-buttons text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Reply className="h-4 w-4" />
                    {isSubmitting ? 'Sending...' : 'Send Reply'}
                </button>
            </div>
        </form>
    );
}