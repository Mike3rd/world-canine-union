interface SubmitButtonProps {
    isSubmitting: boolean;
}

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
    return (
        <div className="pt-6">
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-buttons text-surface py-4 rounded-xl font-heading font-semibold text-lg hover:opacity-90 transition-all shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                aria-label={isSubmitting ? "Processing registration" : "Submit registration and continue to payment"}
            >
                {isSubmitting ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                    </>
                ) : (
                    'Continue to Payment - $25'
                )}
            </button>
            <p className="text-center text-text-muted text-sm mt-4">
                A portion of every registration supports animal rescue organizations
            </p>
        </div>
    );
}