// /app/update-form/components/LoadingState.tsx
interface LoadingStateProps {
    dogName?: string;
}

export default function LoadingState({ dogName }: LoadingStateProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-200">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-6"></div>
            <h3 className="text-xl font-heading font-semibold text-gray-800 mb-2">
                Loading Your Dog's Information
            </h3>
            <p className="text-gray-600">
                Retrieving {dogName || 'your dog'}'s profile...
            </p>
        </div>
    );
}