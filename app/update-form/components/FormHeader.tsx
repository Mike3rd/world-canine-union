// /app/update-form/components/FormHeader.tsx
interface FormHeaderProps {
    dogData: any;
}

export default function FormHeader({ dogData }: FormHeaderProps) {
    return (
        <div className="border-b border-border pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-primary">{dogData.dog_name}</h2>
                    <p className="text-text-muted font-body">{dogData.registration_number}</p>
                    <p className="text-text-muted text-sm font-body mt-1">
                        Make changes below. All fields are optional - only fill what you want to update.
                    </p>
                </div>
                <div className={`px-4 py-2 rounded-full font-heading font-semibold ${dogData.is_memorial
                    ? 'bg-secondary/20 text-secondary border border-secondary/30'
                    : 'bg-success/20 text-success border border-success/30'
                    }`}>
                    {dogData.is_memorial ? '🏳️ Memorialized' : '🐕 Living'}
                </div>
            </div>
        </div>
    );
}