// app/dog/[wcuNumber]/components/living/LivingShareCard.tsx

interface LivingShareCardProps {
    dogName: string
}

export default function LivingShareCard({ dogName }: LivingShareCardProps) {
    return (
        <div className="bg-gradient-to-br from-dog-background to-dog-surface rounded-2xl shadow-xl p-6 border border-dog-border">
            <h2 className="text-xl font-bold text-dog-text mb-4">Share the Love</h2>
            <p className="text-dog-text-muted mb-4 font-body">
                Share {dogName}'s profile with friends and family!
            </p>
            <div className="flex space-x-3">
                <button className="flex-1 bg-dog-buttons text-white px-4 py-2 rounded-lg font-medium hover:bg-dog-error transition font-body">
                    Share
                </button>
                <button className="flex-1 bg-dog-background text-dog-text px-4 py-2 rounded-lg font-medium hover:bg-dog-border transition font-body">
                    Save
                </button>
            </div>
        </div>
    )
}