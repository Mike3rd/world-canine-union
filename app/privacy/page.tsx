// app/privacy/page.tsx
import { Shield, Lock, Database, Mail, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    const lastUpdated = "January 1, 2026";

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-header-text">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="max-w-4xl">
                        <div className="flex items-center mb-6">
                            <Shield className="w-10 h-10 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-heading font-bold">
                                Privacy Policy
                            </h1>
                        </div>
                        <p className="text-xl opacity-90">
                            How World Canine Union LLC collects, uses, and protects your information
                        </p>
                        <div className="mt-8 text-sm opacity-80">
                            <p>Last Updated: {lastUpdated}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Introduction */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-8">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                        Our Commitment to Your Privacy
                    </h2>
                    <p className="text-text-muted mb-4">
                        At World Canine Union LLC, we are committed to protecting your personal information
                        and being transparent about how we collect, use, and safeguard your data. This
                        Privacy Policy explains our practices regarding the information we collect when
                        you register your dog, use our website, or interact with our services.
                    </p>
                    <p className="text-text-muted">
                        By using our website and services, you consent to the data practices described
                        in this policy. If you have any questions, please contact us using the
                        information provided at the end of this document.
                    </p>
                </div>

                {/* Information We Collect */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-8">
                    <div className="flex items-center mb-6">
                        <Database className="w-8 h-8 text-primary mr-3" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            Information We Collect
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                            <h3 className="font-heading font-bold text-primary mb-3">
                                Dog Registration Information
                            </h3>
                            <ul className="text-text-muted space-y-2 text-sm">
                                <li>• Dog's name and breed description</li>
                                <li>• Photos of your dog</li>
                                <li>• Birth date and adoption/rescue story</li>
                                <li>• Physical description and special traits</li>
                                <li>• Favorite activities and personality details</li>
                                <li>• Memorial information (if applicable)</li>
                            </ul>
                        </div>

                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                            <h3 className="font-heading font-bold text-primary mb-3">
                                Owner Information
                            </h3>
                            <ul className="text-text-muted space-y-2 text-sm">
                                <li>• Your name and email address</li>
                                <li>• Shelter information (if provided)</li>
                                <li>• Payment information (processed securely by Stripe)</li>
                                <li>• Communication preferences</li>
                                <li>• Profile update requests</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* How We Use Information */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-8">
                    <div className="flex items-center mb-6">
                        <Lock className="w-8 h-8 text-primary mr-3" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            How We Use Your Information
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <div className="p-4 border-l-4 border-accent bg-accent/5">
                            <h3 className="font-heading font-bold text-primary mb-2">
                                Primary Purposes
                            </h3>
                            <ul className="text-text-muted space-y-2 text-sm">
                                <li>• Creating and maintaining your dog's official WCU registration</li>
                                <li>• Generating and delivering digital certificates</li>
                                <li>• Displaying public dog profiles (your email will not be displayed)</li>
                                <li>• Populating our shelter directory (with provided shelter info)</li>
                                <li>• Processing registration payments</li>
                                <li>• Responding to your inquiries and support requests</li>
                            </ul>
                        </div>

                        <div className="p-4 border-l-4 border-secondary bg-secondary/5">
                            <h3 className="font-heading font-bold text-primary mb-2">
                                Community & Statistical Use
                            </h3>
                            <ul className="text-text-muted space-y-2 text-sm">
                                <li>• Calculating and displaying community impact metrics</li>
                                <li>• Improving our services and website functionality</li>
                                <li>• Sending important service updates (not marketing)</li>
                                <li>• Complying with legal obligations</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Data Sharing & Protection */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-8">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                        Data Sharing & Protection
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-heading font-bold text-primary mb-2">
                                We Do Not Sell Your Data
                            </h3>
                            <p className="text-text-muted">
                                World Canine Union LLC does not sell, rent, or trade your personal
                                information to third parties. We only share information as described
                                below or with your explicit consent.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-heading font-bold text-primary mb-2">
                                Limited Sharing Circumstances
                            </h3>
                            <ul className="text-text-muted space-y-2">
                                <li>
                                    <strong>Service Providers:</strong> We use trusted third-party
                                    services (Supabase for database, Stripe for payments, Resend for
                                    emails) that process data on our behalf under strict confidentiality
                                    agreements.
                                </li>
                                <li>
                                    <strong>Legal Requirements:</strong> We may disclose information if
                                    required by law or to protect our rights, users, or the public.
                                </li>
                                <li>
                                    <strong>Public Profiles:</strong> Dog names, photos, and stories
                                    (without owner contact information) are displayed publicly on
                                    profile pages unless you opt for a private registration.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Your Rights & Choices */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-8">
                    <div className="flex items-center mb-6">
                        <UserCheck className="w-8 h-8 text-primary mr-3" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            Your Rights & Choices
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-heading font-bold text-primary mb-3">
                                Access and Control
                            </h3>
                            <ul className="text-text-muted space-y-3">
                                <li>• View and update your dog's profile information</li>
                                <li>• Request a copy of your personal data</li>
                                <li>• Request correction of inaccurate information</li>
                                <li>• Request deletion of your account and data</li>
                                <li>• Opt-out of non-essential communications</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-heading font-bold text-primary mb-3">
                                How to Exercise Your Rights
                            </h3>
                            <p className="text-text-muted mb-4">
                                To exercise any of these rights, please contact us at the email below.
                                We will respond within 30 days and may need to verify your identity
                                before processing certain requests.
                            </p>
                            <div className="bg-primary/5 p-4 rounded-lg">
                                <p className="text-sm text-text-muted">
                                    Note: Some data may be retained for legal or legitimate business
                                    purposes, such as transaction records or to prevent fraud.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security & Contact */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                                Data Security
                            </h2>
                            <p className="text-text-muted mb-4">
                                We implement industry-standard security measures to protect your
                                information, including encryption, secure servers, and access controls.
                                However, no method of electronic transmission or storage is 100% secure.
                            </p>
                            <div className="flex items-center text-sm text-text-muted">
                                <Shield className="w-4 h-4 mr-2" />
                                <span>SSL/TLS encryption on all data transmissions</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center mb-4">
                                <Mail className="w-8 h-8 text-primary mr-3" />
                                <h2 className="text-2xl font-heading font-bold text-primary">
                                    Contact Us
                                </h2>
                            </div>
                            <p className="text-text-muted mb-4">
                                If you have questions about this Privacy Policy or wish to exercise your rights regarding your personal data:
                            </p>
                            <div className="bg-primary/5 p-4 rounded-lg">
                                <p className="font-medium text-primary mb-2">
                                    Please visit our Contact Page
                                </p>
                                <p className="text-text-muted text-sm">
                                    Use the <Link href="/contact" className="text-accent hover:text-accent/80 font-medium">contact form</Link> or chat widget for the quickest response regarding data privacy requests.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Policy Updates */}
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <h2 className="text-xl font-heading font-bold text-primary mb-3">
                        Policy Updates
                    </h2>
                    <p className="text-text-muted text-sm">
                        We may update this Privacy Policy periodically. When we do, we will revise the
                        "Last Updated" date at the top of this page. Significant changes will be
                        communicated through our website or via email. We encourage you to review this
                        policy regularly.
                    </p>
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
                        href="/contact"
                        className="text-accent hover:text-accent/80 font-medium text-center"
                    >
                        Contact Us for Privacy Questions →
                    </Link>
                </div>
            </div>
        </div>
    );
}