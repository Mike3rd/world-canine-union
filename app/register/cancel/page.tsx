// /app/register/cancel/page.tsx
export default function CancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600 mb-6">
                    Your registration was saved but payment wasn't completed.
                    You can complete payment later if you'd like.
                </p>

                <div className="space-y-3">
                    <a
                        href="/register"
                        className="block w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                    >
                        Try Payment Again
                    </a>
                    <a
                        href="/"
                        className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Return to Homepage
                    </a>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                    Questions? Email support@worldcanineunion.org
                </p>
            </div>
        </div>
    );
}