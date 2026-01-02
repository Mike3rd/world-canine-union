// app/update-request/page.tsx
import { Mail, Shield, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import RequestUpdateForm from '@/components/RequestUpdateForm';

export default function RequestUpdatePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-header-text">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center mb-6">
                            <RefreshCw className="w-12 h-12 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-heading font-bold">
                                Update Your Dog's Profile
                            </h1>
                        </div>
                        <p className="text-xl opacity-90">
                            Request changes to your dog's information or convert to a memorial profile
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form - Wider Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
                            <div className="text-center mb-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Mail className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                                    Start Your Update Request
                                </h2>
                                <p className="text-text-muted text-lg">
                                    Enter your dog's WCU number to receive a secure update link via email
                                </p>
                            </div>

                            {/* Form Component */}
                            <RequestUpdateForm />

                            {/* Security Note */}
                            <div className="mt-8 bg-primary/5 p-6 rounded-xl border border-primary/10">
                                <div className="flex items-start">
                                    <Shield className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-heading font-bold text-primary mb-2">
                                            Secure & Private
                                        </h3>
                                        <p className="text-text-muted text-sm">
                                            For security, we don't allow direct profile editing. You'll receive a
                                            secure, time-limited link to your registered email. This ensures only
                                            authorized owners can update their dog's information.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Memorial Conversion Note */}
                        <div className="mt-8 bg-gradient-to-r from-secondary/10 to-accent/5 rounded-2xl p-8 border border-secondary/20">
                            <div className="flex items-start mb-4">
                                <AlertCircle className="w-8 h-8 text-secondary mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="font-heading font-bold text-primary text-xl mb-2">
                                        Converting to a Memorial Profile
                                    </h3>
                                    <p className="text-text-muted mb-4">
                                        If your beloved companion has passed, you can convert their living profile
                                        to a beautiful memorial tribute. After receiving your secure link, you'll
                                        be able to add Rainbow Bridge details, memorial stories, and special
                                        memories.
                                    </p>
                                    <ul className="text-text-muted text-sm space-y-2">
                                        <li className="flex items-center">
                                            <CheckCircle className="w-4 h-4 text-success mr-2" />
                                            <span>Add Rainbow Bridge date and location</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="w-4 h-4 text-success mr-2" />
                                            <span>Share memorial stories and favorite memories</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="w-4 h-4 text-success mr-2" />
                                            <span>Create a lasting digital tribute</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Info Panel */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* How It Works */}
                        <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
                            <h2 className="font-heading font-bold text-primary text-xl mb-6">
                                How It Works
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                                        <span className="font-bold">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-primary mb-1">Enter WCU Number</h3>
                                        <p className="text-text-muted text-sm">
                                            Provide your dog's unique registration number (e.g., WCU-00092)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                                        <span className="font-bold">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-primary mb-1">Receive Secure Link</h3>
                                        <p className="text-text-muted text-sm">
                                            We'll email a magic link to the address on file. Link expires in 24 hours.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                                        <span className="font-bold">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-primary mb-1">Complete Update Form</h3>
                                        <p className="text-text-muted text-sm">
                                            The link opens a form with your dog's current information pre-filled.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                                        <span className="font-bold">4</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-primary mb-1">Admin Review & Update</h3>
                                        <p className="text-text-muted text-sm">
                                            Your request is reviewed by our team, then the profile is updated.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Common Updates */}
                        <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
                            <h2 className="font-heading font-bold text-primary text-xl mb-6">
                                Common Updates
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                    <h3 className="font-medium text-primary mb-1">Information Updates</h3>
                                    <p className="text-text-muted text-sm">
                                        Correct details, update contact information, or add new photos.
                                    </p>
                                </div>
                                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                                    <h3 className="font-medium text-primary mb-1">Memorial Conversion</h3>
                                    <p className="text-text-muted text-sm">
                                        Transition a living profile to a memorial tribute with special features.
                                    </p>
                                </div>
                                <div className="p-4 bg-accent/5 rounded-xl border border-accent/10">
                                    <h3 className="font-medium text-primary mb-1">Certificate Reissue</h3>
                                    <p className="text-text-muted text-sm">
                                        Request a new certificate with updated information or memorial status.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Support Note */}
                        <div className="bg-gradient-to-tl from-primary/10 to-white rounded-2xl p-6 border border-accent/20">
                            <div className="flex items-center">

                                <div>
                                    <h2 className="font-heading font-bold text-primary text-xl mb-2">
                                        Need Help?
                                    </h2>
                                    <p className="text-text-muted text-sm">
                                        If you don't receive the email or have issues, contact our support team.
                                    </p>
                                    <a
                                        href="/contact"
                                        className="text-accent hover:text-accent/80 text-sm font-medium mt-2 inline-block"
                                    >
                                        Contact Support →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-border">
                    <a
                        href="/"
                        className="text-accent hover:text-accent/80 font-medium text-center"
                    >
                        ← Return to Homepage
                    </a>
                    <a
                        href="/faq#updates"
                        className="text-accent hover:text-accent/80 font-medium text-center"
                    >
                        View Update FAQs →
                    </a>
                </div>
            </div>
        </div>
    );
}