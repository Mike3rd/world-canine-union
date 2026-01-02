// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, Mail, Clock, HelpCircle, Dog, Users, Shield } from "lucide-react";
import Link from 'next/link';

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
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-header-text">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center mb-6">
                            <MessageCircle className="w-12 h-12 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-heading font-bold">
                                Get in Touch
                            </h1>
                        </div>
                        <p className="text-xl opacity-90">
                            We're here to help with registration, memorial conversions, shelter information, and more
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Info Panel */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Response Time */}
                        <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-start mb-6">
                                <div className="bg-primary/10 p-3 rounded-full mr-4">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-primary mb-2 text-lg">Response Time</h3>
                                    <p className="text-text-muted">
                                        We typically respond within 24 hours during business days (Monday-Friday).
                                        Urgent matters may be addressed sooner.
                                    </p>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-border">
                                <h4 className="font-medium text-primary mb-3">Best Contact Times</h4>
                                <div className="space-y-2 text-sm text-text-muted">
                                    <div className="flex justify-between">
                                        <span>Mon-Fri</span>
                                        <span className="font-medium">9 AM - 6 PM EST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Weekends</span>
                                        <span className="font-medium">Limited availability</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Common Questions */}
                        <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center mb-6">
                                <HelpCircle className="w-6 h-6 text-primary mr-3" />
                                <h3 className="font-heading font-bold text-primary text-lg">Quick Links</h3>
                            </div>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="/faq#registration"
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="flex items-center">
                                            <Dog className="w-4 h-4 text-accent mr-3" />
                                            <span className="text-primary group-hover:text-accent transition-colors">
                                                Registration Questions
                                            </span>
                                        </div>
                                        <span className="text-text-muted group-hover:text-accent transition-colors">→</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/request-update"
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="flex items-center">
                                            <Shield className="w-4 h-4 text-secondary mr-3" />
                                            <span className="text-primary group-hover:text-accent transition-colors">
                                                Certificate Issues
                                            </span>
                                        </div>
                                        <span className="text-text-muted group-hover:text-accent transition-colors">→</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/request-update"
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="flex items-center">
                                            <Heart className="w-4 h-4 text-primary mr-3" />
                                            <span className="text-primary group-hover:text-accent transition-colors">
                                                Memorial Conversions
                                            </span>
                                        </div>
                                        <span className="text-text-muted group-hover:text-accent transition-colors">→</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/shelters"
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 text-success mr-3" />
                                            <span className="text-primary group-hover:text-accent transition-colors">
                                                Shelter Directory
                                            </span>
                                        </div>
                                        <span className="text-text-muted group-hover:text-accent transition-colors">→</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Chat Widget Note */}
                        <div className="bg-gradient-to-tl from-primary/10 to-white rounded-2xl p-8 border border-primary/20">
                            <div className="flex items-center mb-4">
                                <MessageCircle className="w-6 h-6 text-primary mr-3" />
                                <h3 className="font-heading font-bold text-primary text-lg">Quick Questions?</h3>
                            </div>
                            <p className="text-text-muted text-sm mb-4">
                                Use the chat widget in the bottom right corner of any page for immediate assistance with common questions.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form Column - Wider */}
                    <div className="lg:col-span-2">
                        <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
                            <h2 className="text-2xl font-heading font-bold text-primary mb-8">
                                Send Us a Message
                            </h2>

                            {isSubmitted ? (
                                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-2xl p-10 text-center">
                                    <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <MessageCircle className="w-10 h-10 text-success" />
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold text-success mb-4">
                                        Message Sent Successfully!
                                    </h3>
                                    <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
                                        Thank you for reaching out. We've received your message and will respond within 24 hours.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                                        >
                                            Send Another Message
                                        </button>
                                        <Link
                                            href="/faq"
                                            className="bg-transparent border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
                                        >
                                            Visit FAQ Page
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8 bg-primary/5 p-6 rounded-xl border border-primary/10">
                                        <p className="text-text-muted">
                                            Whether you have questions about registration, need help with a memorial conversion,
                                            want to update your dog's profile, or have feedback about our platform — we're here to help.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-primary mb-3">
                                                Your Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="you@example.com"
                                                    className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-primary mb-3">
                                                Your Message
                                            </label>
                                            <div className="relative">
                                                <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-text-muted" />
                                                <textarea
                                                    id="message"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="How can we help you today? Please include relevant details like WCU numbers, registration dates, or specific issues you're experiencing."
                                                    rows={8}
                                                    className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white resize-none"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-start mb-4">
                                            <input
                                                type="checkbox"
                                                id="privacy"
                                                className="mt-1 mr-3"
                                                required
                                            />
                                            <label htmlFor="privacy" className="text-sm text-text-muted">
                                                I agree to the{' '}
                                                <Link href="/privacy" className="text-accent hover:text-accent/80 font-medium">
                                                    Privacy Policy
                                                </Link>{' '}
                                                and understand that my email will be used solely for responding to this inquiry.
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-heading font-bold py-4 px-6 rounded-xl text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending Message...
                                                </span>
                                            ) : 'Send Message'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-border">
                    <Link
                        href="/"
                        className="text-accent hover:text-accent/80 font-medium text-center"
                    >
                        ← Return to Homepage
                    </Link>
                    <Link
                        href="/register"
                        className="text-accent hover:text-accent/80 font-medium text-center"
                    >
                        Register Your Dog →
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Need to import Heart icon
import { Heart } from 'lucide-react';