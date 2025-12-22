// app/admin/emails/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Mail, Search, Filter, RefreshCw, Reply } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SupportEmail {
    id: string;
    from_email: string;
    from_name: string;
    subject: string;
    message: string;
    received_at: Date;
    wcu_number?: string;
    status: 'unread' | 'read' | 'replied' | 'archived';
}

export default function EmailAdminPage() {
    const [emails, setEmails] = useState<SupportEmail[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmail, setSelectedEmail] = useState<SupportEmail | null>(null);
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        loadEmails();
    }, []);

    const loadEmails = async () => {
        // This will eventually query a new 'support_emails' table
        // For now, we'll simulate with mock data
        const mockEmails: SupportEmail[] = [
            {
                id: '1',
                from_email: 'owner@example.com',
                from_name: 'Jane Doe',
                subject: 'PDF certificate not received',
                message: 'Hi, I registered my dog Buddy but never got the PDF...',
                received_at: new Date('2024-12-15T10:30:00'),
                wcu_number: 'WCU-00045',
                status: 'unread'
            },
            {
                id: '2',
                from_email: 'someone@gmail.com',
                from_name: 'Robert Smith',
                subject: 'Change my dog\'s name',
                message: 'I need to update my dog\'s name from Max to Maximus...',
                received_at: new Date('2024-12-14T14:20:00'),
                wcu_number: 'WCU-00092',
                status: 'replied'
            }
        ];

        setEmails(mockEmails);
        setLoading(false);
    };

    const handleSendReply = async () => {
        if (!selectedEmail) return;

        // Call your sendSupportReply function here
        // await sendSupportReply(selectedEmail.from_email, selectedEmail.subject, replyText);

        alert('Reply sent!');
        setReplyText('');

        // Update email status
        setEmails(prev => prev.map(email =>
            email.id === selectedEmail.id
                ? { ...email, status: 'replied' }
                : email
        ));
    };

    if (loading) {
        return <div>Loading emails...</div>;
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Support Emails</h1>
                    <p className="text-gray-600">Manage incoming support requests</p>
                </div>
                <button
                    onClick={loadEmails}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Mail className="h-8 w-8 text-blue-600" />
                        <div>
                            <p className="text-2xl font-bold">{emails.length}</p>
                            <p className="text-sm text-gray-600">Total Emails</p>
                        </div>
                    </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold">
                        {emails.filter(e => e.status === 'unread').length}
                    </p>
                    <p className="text-sm text-gray-600">Unread</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold">
                        {emails.filter(e => e.status === 'replied').length}
                    </p>
                    <p className="text-sm text-gray-600">Replied</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold">
                        {emails.filter(e => e.wcu_number).length}
                    </p>
                    <p className="text-sm text-gray-600">Linked to WCU#</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Email List */}
                <div className="lg:col-span-1 space-y-3">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search emails..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            />
                        </div>
                        <button className="p-2 border rounded-lg">
                            <Filter className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                        {emails.map(email => (
                            <div
                                key={email.id}
                                onClick={() => setSelectedEmail(email)}
                                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedEmail?.id === email.id ? 'bg-blue-50 border-blue-200' : ''
                                    } ${email.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold truncate">{email.from_name}</p>
                                        <p className="text-sm text-gray-600 truncate">{email.subject}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${email.status === 'unread' ? 'bg-blue-100 text-blue-800' :
                                            email.status === 'replied' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {email.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {email.wcu_number || 'No WCU# linked'}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    {email.received_at.toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Email Viewer & Reply */}
                <div className="lg:col-span-2">
                    {selectedEmail ? (
                        <div className="bg-white border rounded-lg p-6 space-y-6">
                            <div>
                                <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-600">
                                        From: {selectedEmail.from_name} &lt;{selectedEmail.from_email}&gt;
                                    </p>
                                    {selectedEmail.wcu_number && (
                                        <a
                                            href={`/admin/dashboard?search=${selectedEmail.wcu_number}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            View Dog: {selectedEmail.wcu_number}
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <p className="whitespace-pre-wrap">{selectedEmail.message}</p>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="font-semibold mb-3">Send Reply</h3>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={6}
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Type your reply here..."
                                />
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        onClick={() => setReplyText('')}
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={handleSendReply}
                                        disabled={!replyText.trim()}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        <Reply className="h-4 w-4" />
                                        Send Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 border rounded-lg p-12 text-center">
                            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700">Select an email</h3>
                            <p className="text-gray-500">Choose an email from the list to view and reply</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}