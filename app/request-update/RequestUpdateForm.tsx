// /app/request-update/RequestUpdateForm.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RequestUpdateForm() {
    const [wcuNumber, setWcuNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Clean and validate WCU number
            const cleanWcuNumber = wcuNumber.trim().toUpperCase();
            if (!cleanWcuNumber.match(/^WCU-\d{5}$/)) {
                setMessage({
                    type: 'error',
                    text: 'Invalid format. Please use WCU-00000 format.'
                });
                setLoading(false);
                return;
            }

            // 1. Look up the dog by WCU number
            const { data: dog, error: lookupError } = await supabase
                .from('registrations')
                .select('registration_number, dog_name, owner_email, is_memorial')
                .eq('registration_number', cleanWcuNumber)
                .single();

            if (lookupError || !dog) {
                setMessage({
                    type: 'error',
                    text: 'WCU number not found. Please check and try again.'
                });
                setLoading(false);
                return;
            }

            // Check if already memorial
            if (dog.is_memorial) {
                setMessage({
                    type: 'info',
                    text: `${dog.dog_name} is already memorialized. You can still update memorial information.`
                });
            }

            // 2. Generate a secure token for the magic link
            const token = crypto.randomUUID();
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

            // 3. Store the token in update_tokens table
            const { error: tokenError } = await supabase
                .from('update_tokens')
                .insert({
                    token: token,
                    registration_number: dog.registration_number,
                    expires_at: expiresAt.toISOString(),
                    used: false
                });

            if (tokenError) {
                console.error('Token storage error:', tokenError);
                setMessage({
                    type: 'error',
                    text: 'Failed to generate update link. Please try again.'
                });
                setLoading(false);
                return;
            }

            // 4. For now, show the magic link (we'll implement email later)
            const updateLink = `${window.location.origin}/update-form?token=${token}`;

            setMessage({
                type: 'success',
                text: `✅ Update link generated for ${dog.dog_name}! 
               For testing, use this link: ${updateLink}
               (In production, this will be emailed to ${dog.owner_email})`
            });

            setWcuNumber('');

        } catch (error) {
            console.error('Update request error:', error);
            setMessage({
                type: 'error',
                text: 'An unexpected error occurred. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="wcuNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    WCU Registration Number
                </label>
                <div className="relative">
                    <input
                        type="text"
                        id="wcuNumber"
                        value={wcuNumber}
                        onChange={(e) => setWcuNumber(e.target.value)}
                        placeholder="WCU-00000"
                        className="w-full px-4 py-3 pl-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                        required
                        pattern="WCU-\d{5}"
                        title="Format: WCU-00000"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                    Find this number on your certificate or registration email
                </p>
            </div>

            {message && (
                <div className={`p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 border border-green-200' : message.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
                    <div className="flex">
                        <div className={`flex-shrink-0 ${message.type === 'success' ? 'text-green-400' : message.type === 'error' ? 'text-red-400' : 'text-blue-400'}`}>
                            {message.type === 'success' ? '✅' : message.type === 'error' ? '❌' : 'ℹ️'}
                        </div>
                        <div className="ml-3">
                            <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-800' : message.type === 'error' ? 'text-red-800' : 'text-blue-800'}`}>
                                {message.text.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Link...
                    </span>
                ) : (
                    'Generate Secure Update Link'
                )}
            </button>
        </form>
    );
}