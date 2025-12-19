// /app/update-form/components/MemorialSection.tsx
interface MemorialSectionProps {
    reportPassing: boolean;
    setReportPassing: (value: boolean) => void;
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function MemorialSection({
    reportPassing,
    setReportPassing,
    formData,
    handleChange
}: MemorialSectionProps) {
    return (
        <div className="space-y-6 border-t border-border pt-8">
            <div className="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="report_passing"
                    checked={reportPassing}
                    onChange={(e) => setReportPassing(e.target.checked)}
                    className="mt-1 h-5 w-5 text-accent rounded focus:ring-accent"
                />
                <div>
                    <label htmlFor="report_passing" className="text-lg font-heading font-semibold text-text">
                        Report that my dog has passed away
                    </label>
                    <p className="text-text-muted mt-1">
                        Check this box to update your dog's status to "In Memoriam" and share memorial information.
                    </p>
                </div>
            </div>

            {reportPassing && (
                <div className="ml-8 space-y-6 bg-surface-light p-6 rounded-xl border border-border">
                    <h4 className="text-lg font-heading font-semibold text-text">Memorial Information</h4>

                    <div>
                        <label className="block text-sm font-medium text-text mb-2">
                            Date of Passing
                        </label>
                        <input
                            type="date"
                            name="memorial_date"
                            value={formData.memorial_date}
                            onChange={handleChange}
                            required={reportPassing}
                            className="w-full px-4 py-3 border border-border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition font-body"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text mb-2">
                            Memorial Message (Optional)
                        </label>
                        <textarea
                            name="memorial_message"
                            value={formData.memorial_message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition font-body"
                            placeholder="Share a special message or tribute..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text mb-2">
                            Favorite Memories (Optional)
                        </label>
                        <textarea
                            name="memorial_favorite_memories"
                            value={formData.memorial_favorite_memories}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition font-body"
                            placeholder="What were your favorite moments together?"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}