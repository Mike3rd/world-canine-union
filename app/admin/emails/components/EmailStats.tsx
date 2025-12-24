// app/admin/emails/components/EmailStats.tsx
import { Mail } from 'lucide-react';
import { SupportEmail } from '../types'; // Import shared type

interface EmailStatsProps {
    emails: SupportEmail[];
}

export default function EmailStats({ emails }: EmailStatsProps) {
    const unreadCount = emails.filter(e => e.status === 'unread').length;
    const repliedCount = emails.filter(e => e.status === 'replied').length;
    const linkedCount = emails.filter(e => e.wcu_number).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Total Emails Card */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                    <Mail className="h-8 w-8 text-blue-600" />
                    <div>
                        <p className="text-2xl font-bold">{emails.length}</p>
                        <p className="text-sm text-gray-600">Total Emails</p>
                    </div>
                </div>
            </div>

            {/* Unread Card */}
            <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-gray-600">Unread</p>
            </div>

            {/* Replied Card */}
            <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-2xl font-bold">{repliedCount}</p>
                <p className="text-sm text-gray-600">Replied</p>
            </div>

            {/* Linked to WCU# Card */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-2xl font-bold">{linkedCount}</p>
                <p className="text-sm text-gray-600">Linked to WCU#</p>
            </div>
        </div>
    );
}