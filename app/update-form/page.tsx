// /app/update-form/page.tsx
import UpdateForm from './UpdateForm';
import { Suspense } from 'react';
import UpdateFormWrapper from './UpdateFormWrapper';
import LoadingState from './components/LoadingState';

export default function UpdateFormPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-900 mb-4">
                        Update Your Dog's Information
                    </h1>
                    <p className="text-lg text-gray-600">
                        Make changes to your dog's profile or report that your dog has passed
                    </p>
                </div>

                {/* Main Form Container */}
                <Suspense fallback={<LoadingState />}>
                    <UpdateFormWrapper />
                </Suspense>

                {/* Footer Note */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>All updates are reviewed by WCU admins before being applied to your dog's profile.</p>
                    <p className="mt-1">Your changes will be visible within 24-48 hours after approval.</p>
                </div>
            </div>
        </div>
    );
}