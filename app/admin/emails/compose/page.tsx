'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ComposePage() {
    const router = useRouter();
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        message: '',
        wcuNumber: '',
        category: 'outreach',
    });

    const handleSend = async () => {
        if (!formData.to || !formData.subject || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSending(true);
        try {
            const response = await fetch('/admin/emails/reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: formData.to,
                    subject: formData.subject,
                    message: formData.message,
                    wcu_number: formData.wcuNumber || null,
                    isNewEmail: true, // Critical: tells API this is new, not reply
                }),
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Send failed');

            alert('✅ Email sent successfully!');
            router.push('/admin/emails'); // Back to inbox
        } catch (error) {
            console.error('Send error:', error);
            alert('❌ Failed to send: ' + (error as Error).message);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-3">
                <button
                    onClick={() => router.push('/admin/emails')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Inbox
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Compose New Email</h1>
                    <p className="text-gray-600">Send from mike@worldcanineunion.org</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                {/* To Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        To <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={formData.to}
                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-3"
                        placeholder="recipient@example.com"
                        required
                        disabled={isSending}
                    />
                </div>

                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-3"
                        placeholder="Email subject"
                        required
                        disabled={isSending}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-3"
                        disabled={isSending}
                    >
                        <option value="support">Support (to/from customers)</option>
                        <option value="outreach">Outreach/Partnership (to vendors/partners)</option>
                    </select>
                </div>

                {/* WCU Number (Optional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        WCU Number <span className="text-gray-500 text-sm">(optional)</span>
                    </label>
                    <input
                        type="text"
                        value={formData.wcuNumber}
                        onChange={(e) => setFormData({ ...formData, wcuNumber: e.target.value.toUpperCase() })}
                        className="w-full border border-gray-300 rounded-lg p-3 font-mono"
                        placeholder="WCU-00000"
                        disabled={isSending}
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={10}
                        className="w-full border border-gray-300 rounded-lg p-3"
                        placeholder="Type your message here..."
                        required
                        disabled={isSending}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => router.push('/admin/emails')}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        disabled={isSending}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={isSending || !formData.to || !formData.subject || !formData.message}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSending ? 'Sending...' : 'Send Email'}
                    </button>
                </div>
            </div>
        </div>
    );
}