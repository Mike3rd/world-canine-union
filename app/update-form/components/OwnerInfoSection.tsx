// /app/update-form/components/OwnerInfoSection.tsx
interface OwnerInfoSectionProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function OwnerInfoSection({ formData, handleChange }: OwnerInfoSectionProps) {
    return (
        <div className="space-y-6 pt-4 border-t border-border">
            <h3 className="text-xl font-heading font-semibold text-primary border-l-4 border-primary pl-4">
                1. Owner Information Updates
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="ownerName" className="block text-sm font-body2 font-medium text-text mb-2">
                        Your Name(s)
                        <span className="text-xs text-text-muted ml-2">
                            {formData.ownerName?.length || 0}/50
                        </span>
                    </label>
                    <input
                        id="ownerName"
                        type="text"
                        name="ownerName"
                        value={formData.ownerName || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                        placeholder="Your full name"
                        maxLength={50}
                    />
                    <p className="text-xs text-text-muted mt-1">Leave blank to keep current</p>
                </div>
                <div>
                    <label htmlFor="ownerEmail" className="block text-sm font-body2 font-medium text-text mb-2">
                        Email Address
                    </label>
                    <input
                        id="ownerEmail"
                        type="email"
                        name="ownerEmail"
                        value={formData.ownerEmail || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                        placeholder="your.email@example.com"
                    />
                    <p className="text-xs text-text-muted mt-1">Leave blank to keep current</p>
                </div>
            </div>
        </div>
    );
}