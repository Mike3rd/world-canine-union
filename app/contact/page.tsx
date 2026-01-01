// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, Mail, Clock } from "lucide-react";

export default function ContactPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // This uses your existing chat submission endpoint
        try {
            const response = await fetch('/api/contact/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, message }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setEmail('');
                setMessage('');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageCircle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-heading font-bold text-primary mb-4">
                        Contact World Canine Union
                    </h1>
                    <p className="text-xl text-text-muted">
                        Send us a message and we'll get back to you within 24 hours.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-surface rounded-2xl p-8 border border-border shadow-lg">
                        <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                            Send a Message
                        </h2>

                        {isSubmitted ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-green-800 mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-green-700">
                                    We've received your message and will respond within 24 hours.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-4 text-accent hover:text-accent/80 font-medium"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="How can we help you?"
                                        rows={6}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-buttons hover:bg-buttons-hover text-white font-heading font-bold py-3 px-6 rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                            <div className="flex items-start mb-4">
                                <Clock className="w-6 h-6 text-primary mr-3 mt-1" />
                                <div>
                                    <h3 className="font-heading font-bold text-primary mb-2">Response Time</h3>
                                    <p className="text-text-muted">
                                        We typically respond within 24 hours during business days (Monday-Friday).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface rounded-2xl p-6 border border-border">
                            <h3 className="font-heading font-bold text-primary mb-4">Common Questions</h3>
                            <ul className="space-y-3">
                                <li className="text-text-muted">
                                    <a href="/faq#registration" className="text-accent hover:text-accent/80">Registration questions →</a>
                                </li>
                                <li className="text-text-muted">
                                    <a href="/faq#certificates" className="text-accent hover:text-accent/80">Certificate issues →</a>
                                </li>
                                <li className="text-text-muted">
                                    <a href="/faq#donations" className="text-accent hover:text-accent/80">Donation inquiries →</a>
                                </li>
                                <li className="text-text-muted">
                                    <a href="/faq#shelters" className="text-accent hover:text-accent/80">Shelter directory →</a>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-surface rounded-2xl p-6 border border-border">
                            <h3 className="font-heading font-bold text-primary mb-4">Other Ways to Connect</h3>
                            <p className="text-text-muted text-sm">
                                You can also use the chat widget in the bottom right corner of any page for quick questions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}