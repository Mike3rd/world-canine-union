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
    message_text: string;
    received_at: Date;
    wcu_number?: string;
    status: 'unread' | 'read' | 'replied' | 'archived';
}

export default function EmailAdminPage() {
    const [emails, setEmails] = useState<SupportEmail[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmail, setSelectedEmail] = useState<SupportEmail | null>(null);
    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState<any[]>([]);

    const fetchReplies = async (supportEmailId: string) => {
        try {
            const { data, error } = await supabase
                .from('email_logs')
                .select('id, message_text, created_at, current_status')
                .eq('support_email_id', supportEmailId)
                .order('created_at', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching replies:', error);
            return [];
        }
    };

    useEffect(() => {
        loadEmails();
    }, []);

    // NEW: Load replies whenever selectedEmail changes

    useEffect(() => {
        if (selectedEmail) {
            const loadReplies = async () => {
                const repliesData = await fetchReplies(selectedEmail.id);
                setReplies(repliesData);
            };
            loadReplies();
        } else {
            setReplies([]); // Clear replies if no email selected
        }
    }, [selectedEmail]); // This runs every time selectedEmail changes

    const loadEmails = async () => {
        setLoading(true);
        try {
            // Query the REAL support_emails table
            const { data, error } = await supabase
                .from('support_emails')
                .select('*')
                .order('received_at', { ascending: false });

            if (error) {
                console.error('Database error:', error);
                throw new Error(`Database error: ${error.message}`);
            }

            console.log('📧 Loaded emails from database:', data?.length || 0);

            // Fix the TypeScript error by typing the parameter
            const formattedEmails: SupportEmail[] = (data || []).map((email: any) => ({
                id: email.id,
                from_email: email.from_email,
                from_name: email.from_name || email.from_email.split('@')[0],
                subject: email.subject || '(No subject)',
                message_text: email.message_text || email.message_html || '(No message content)',
                received_at: new Date(email.received_at || email.created_at),
                wcu_number: email.wcu_number || undefined,
                status: email.status || 'unread'
            }));

            setEmails(formattedEmails);

            // Auto-select first email if none selected
            if (formattedEmails.length > 0 && !selectedEmail) {
                setSelectedEmail(formattedEmails[0]);
            }

        } catch (error) {
            console.error('❌ Error loading emails:', error);
            alert('Failed to load emails. Check console for error details.');
            setEmails([]); // Set empty array instead of mock data
        } finally {
            setLoading(false);
        }
    };

    const handleEmailClick = async (email: SupportEmail) => {
        // 1. Select the email
        setSelectedEmail(email);

        // 2. If it's unread, mark it as read
        if (email.status === 'unread') {
            try {
                // Update in database
                const { error } = await supabase
                    .from('support_emails')
                    .update({ status: 'read' })
                    .eq('id', email.id);

                if (error) throw error;

                // Update in local state
                setEmails(prev => prev.map(e =>
                    e.id === email.id ? { ...e, status: 'read' } : e
                ));

            } catch (error) {
                console.error('Failed to mark email as read:', error);
            }
        }
    };

    const handleSendReply = async () => {
        if (!selectedEmail || !replyText.trim()) return;

        try {
            // This URL points to your API route at: app/admin/emails/reply/route.ts
            const response = await fetch('/admin/emails/reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: selectedEmail.from_email,
                    subject: `Re: ${selectedEmail.subject}`,
                    message: replyText,
                    support_email_id: selectedEmail.id,
                    wcu_number: selectedEmail.wcu_number
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send reply');
            }

            // Update local state to show "replied" status
            setEmails(prev => prev.map(email =>
                email.id === selectedEmail.id
                    ? { ...email, status: 'replied' }
                    : email
            ));

            setReplyText('');
            alert('✅ Reply sent successfully!');

        } catch (error) {
            console.error('Error:', error);
            alert(`❌ Failed to send reply: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
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
                                onClick={() => handleEmailClick(email)}
                                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedEmail?.id === email.id ? 'bg-blue-50 border-blue-200' : ''
                                    } ${email.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold truncate">{email.from_name}</p>
                                        <p className="text-sm text-gray-600 truncate">{email.subject}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${email.status === 'unread' ? 'bg-blue-100 text-blue-800' : email.status === 'read' ? 'bg-gray-100 text-gray-800' :
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
                                <p className="whitespace-pre-wrap">{selectedEmail.message_text}</p>
                            </div>

                            {replies.length > 0 && (
                                <div className="border-t pt-6">
                                    <h3 className="font-semibold text-lg mb-3 text-primary">Replies Sent</h3>
                                    <div className="space-y-4">
                                        {replies.map((reply) => (
                                            <div
                                                key={reply.id}
                                                className="bg-gray-50 border border-border rounded-lg p-4"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="text-sm text-text-muted">
                                                        <span className="font-medium">You replied</span>
                                                        {' • '}
                                                        {new Date(reply.created_at).toLocaleString()}
                                                        {' • '}
                                                        <span className={`px-2 py-0.5 text-xs rounded-full ${reply.current_status === 'delivered'
                                                            ? 'bg-success text-white'
                                                            : reply.current_status === 'sent'
                                                                ? 'bg-amber-100 text-amber-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {reply.current_status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="whitespace-pre-wrap text-text">
                                                    {reply.message_text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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