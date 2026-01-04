"use client";

import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">

                    {/* Success Icon */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            🎉 Welcome to the Pack!
                        </h1>
                        <p className="text-lg text-gray-600 mb-2">
                            Your World Canine Union registration is complete.
                        </p>
                        <p className="text-gray-500">
                            Check your email for your official certificate and WCU number.
                        </p>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-blue-50 rounded-xl p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            What to Expect:
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <div className="bg-blue-100 p-1 rounded mr-3">
                                    <span className="text-blue-600 font-bold">1</span>
                                </div>
                                <span><strong>WCU Certificate</strong> - Emailed within minutes</span>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-blue-100 p-1 rounded mr-3">
                                    <span className="text-blue-600 font-bold">2</span>
                                </div>
                                <span><strong>Your WCU Number</strong> - In the email (save it!)</span>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-blue-100 p-1 rounded mr-3">
                                    <span className="text-blue-600 font-bold">3</span>
                                </div>
                                <span><strong>Online Dog Profile</strong> - Coming soon at worldcanineunion.org/dogs/your-WCU Number</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/"
                            className="flex-1 bg-primary text-white text-center py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                        >
                            Return Home
                        </Link>
                        <Link
                            href="/register"
                            className="flex-1 border-2 border-primary text-primary text-center py-3 px-6 rounded-lg hover:bg-primary/5 transition-colors font-medium"
                        >
                            Register Another Dog
                        </Link>
                    </div>

                    {/* Help */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center">
                            Need help? Please use our{' '}
                            <a href="/contact" className="text-primary hover:underline font-medium">
                                contact form
                            </a>
                            {' '}or click the blue chat icon &#8212; bottom right.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}