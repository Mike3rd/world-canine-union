import RequestUpdateForm from '@/components/RequestUpdateForm';

export default function RequestUpdatePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-900 mb-4">
                        Update Dog Information
                    </h1>
                    <p className="text-lg text-gray-600">
                        Request changes to your dog's profile or report that your dog has passed
                    </p>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                    <div className="mb-6">
                        <div className="flex items-center justify-center mb-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                            Start Update Request
                        </h2>
                        <p className="text-center text-gray-600">
                            Enter your dog's WCU number to receive a secure update link
                        </p>
                    </div>

                    <RequestUpdateForm />
                </div>

                {/* Info Box */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">How It Works</h3>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                            <span className="inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-1">
                                1
                            </span>
                            <span>Enter your WCU number (e.g., WCU-00092)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-1">
                                2
                            </span>
                            <span>We'll send a secure magic link to the email on file</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-1">
                                3
                            </span>
                            <span>Click the link to access a pre-filled update form</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-1">
                                4
                            </span>
                            <span>Submit changes for admin review</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}