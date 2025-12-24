// app/admin/emails/components/ReplyItem.tsx
import { EmailReply } from '../types';

interface ReplyItemProps {
    reply: EmailReply;
}

export default function ReplyItem({ reply }: ReplyItemProps) {
    // Determine status badge color
    const getStatusColor = () => {
        switch (reply.current_status) {
            case 'delivered':
                return 'bg-success text-white';
            case 'sent':
                return 'bg-amber-100 text-amber-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-gray-50 border border-border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-text-muted">
                    <span className="font-medium">You replied</span>
                    {' • '}
                    {new Date(reply.created_at).toLocaleString()}
                    {' • '}
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor()}`}>
                        {reply.current_status}
                    </span>
                </div>
            </div>
            <p className="whitespace-pre-wrap text-text">
                {reply.message_text}
            </p>
        </div>
    );
}