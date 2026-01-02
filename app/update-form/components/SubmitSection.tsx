// /app/update-form/components/SubmitSection.tsx
import Link from 'next/link';

interface SubmitSectionProps {
    submitting: boolean;
}

export default function SubmitSection({ submitting }: SubmitSectionProps) {
    return (
        <div className="border-t border-border pt-8">
            <div className="mb-6 p-4 bg-surface-light rounded-xl border border-border">
                <div className="flex items-start">
                    <div className="text-accent mr-3 mt-1">ℹ️</div>
                    <div>
                        <h4 className="font-heading font-semibold text-text mb-1">Important Notes</h4>
                        <ul className="text-sm text-text-muted space-y-1">
                            <li>• Only fill fields you want to update - blank fields will keep current values</li>
                            <li>• Updates are reviewed by WCU admins within 24-48 hours</li>
                            <li>• Memorial reports require date of passing</li>
                            <li>• Your changes will be visible within 24-48 hours after approval.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className="mb-2 text-sm text-text-muted mx-auto text-center">
                By submitting this form, you agree to our{' '}
                <Link href="/privacy" className="text-accent hover:underline font-medium">
                    Privacy Policy
                </Link>
                .
            </p>
            <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 px-6 rounded-xl font-heading font-semibold text-lg transition-all ${submitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-buttons hover:bg-buttons-hover active:scale-[0.98]'
                    } text-white shadow-lg`}
            >
                {submitting ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Update Request...
                    </span>
                ) : 'Submit Update Request'}
            </button>
        </div>
    );
}