// /app/update-form/components/ErrorState.tsx
'use client';

import { useRouter } from 'next/navigation';

interface ErrorStateProps {
    error: string;
    router: ReturnType<typeof useRouter>;
}

export default function ErrorState({ error, router }: ErrorStateProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-error">
            <div className="text-center">
                <div className="text-error text-4xl mb-4">❌</div>
                <h2 className="text-2xl font-heading font-bold text-error mb-2">Error</h2>
                <p className="text-text mb-6">{error}</p>
                <button
                    onClick={() => router.push('/request-update')}
                    className="bg-buttons text-white px-6 py-3 rounded-xl font-heading font-semibold hover:opacity-90 transition"
                >
                    Request New Update Link
                </button>
            </div>
        </div>
    );
}