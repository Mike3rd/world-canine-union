// app/components/chat/ChatComplete.tsx
'use client';
import { CheckCircle, Mail } from 'lucide-react';

interface ChatCompleteProps {
    onNewChat: () => void;
}

export default function ChatComplete({ onNewChat }: ChatCompleteProps) {
    return (
        <div className="border-t border-gray-200 p-6 text-center">
            <CheckCircle className="mx-auto mb-3 text-green-500" size={48} />
            <h4 className="mb-2 font-semibold text-gray-800">Message Sent Successfully!</h4>
            <p className="mb-4 text-gray-600">
                I'll review your message and respond within 24 hours. For urgent matters,
                feel free to email me directly:
            </p>

            <div className="mb-6 rounded-lg bg-blue-50 p-4">
                <div className="flex items-center justify-center gap-2 text-blue-700">
                    <Mail size={18} />
                    <a
                        href="mailto:mike@worldcanineunion.org"
                        className="font-medium hover:underline"
                    >
                        mike@worldcanineunion.org
                    </a>
                </div>
            </div>

            <div className="space-y-3">
                <button
                    onClick={onNewChat}
                    className="w-full rounded-xl bg-blue-600 py-3 px-6 font-medium text-white hover:bg-blue-700 transition-colors"
                >
                    Start New Conversation
                </button>

                <button
                    onClick={() => window.location.href = '/contact'}
                    className="w-full rounded-xl border border-blue-600 py-3 px-6 font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                >
                    Visit Contact Page
                </button>
            </div>

            <p className="mt-4 text-xs text-gray-500">
                Thank you for reaching out to World Canine Union
            </p>
        </div>
    );
}