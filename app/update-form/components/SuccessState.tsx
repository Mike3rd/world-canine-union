// /app/update-form/components/SuccessState.tsx
'use client';

import { useRouter } from 'next/navigation';

interface SuccessStateProps {
    dogData: any;
    router: ReturnType<typeof useRouter>;
}

export default function SuccessState({ dogData, router }: SuccessStateProps) {
    return (
        <div className="bg-surface rounded-2xl shadow-xl p-8 border border-success">
            <div className="text-center">
                <div className="text-success text-4xl mb-4">✅</div>
                <h2 className="text-2xl font-heading font-bold text-success mb-2">
                    Update Request Submitted!
                </h2>
                <p className="text-text mb-4">
                    Your update request for <span className="font-semibold text-primary">{dogData.dog_name}</span> has been submitted.
                </p>
                <p className="text-text-muted mb-6">
                    Our admins will review your changes within 24-48 hours. You'll receive an email when your updates are approved.
                </p>
                <div className="space-y-3 max-w-md mx-auto">
                    <button
                        onClick={() => router.push(`/dog/${dogData.registration_number}`)}
                        className="block w-full bg-buttons text-white px-6 py-3 rounded-xl font-heading font-semibold hover:bg-buttons-hover active:bg-buttons-active transition shadow-md"
                    >
                        View {dogData.dog_name}'s Current Profile
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="block w-full bg-surface-light text-text px-6 py-3 rounded-xl font-heading font-semibold hover:bg-surface-dark transition border border-border"
                    >
                        Return to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
}