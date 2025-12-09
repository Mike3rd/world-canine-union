interface ShelterInfoSectionProps {
    formData: {
        shelterName: string;
        shelterCity: string;
        shelterState: string;
        shelterWebsite: string;
        rescueLocation: string;
    };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    // REMOVE fieldErrors - not used anymore
}

export default function ShelterInfoSection({ formData, onInputChange }: ShelterInfoSectionProps) {
    return (
        <div className="pt-4 border-t border-border">
            <h3 className="text-xl font-heading font-semibold text-primary mb-6">
                Rescue/Shelter Information  (optional)
            </h3>
            <p className="text-text-muted mb-4 text-sm">
                Help us recognize the amazing organizations that save dogs! This information will be used to build our national shelter directory.
            </p>

            <div className="space-y-4">
                <div>
                    <label htmlFor="shelterName" className="block text-sm font-body2 font-medium text-text mb-2">
                        Shelter/Rescue Name
                    </label>
                    <input
                        id="shelterName"
                        type="text"
                        name="shelterName"
                        value={formData.shelterName}
                        onChange={onInputChange}
                        aria-label="Shelter or rescue name (optional)"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                        placeholder="e.g., Happy Tails Rescue"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="shelterCity" className="block text-sm font-body2 font-medium text-text mb-2">
                            City
                        </label>
                        <input
                            id="shelterCity"
                            type="text"
                            name="shelterCity"
                            value={formData.shelterCity}
                            onChange={onInputChange}
                            aria-label="Shelter city (optional)"
                            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                            placeholder="City"
                        />
                    </div>
                    <div>
                        <label htmlFor="shelterState" className="block text-sm font-body2 font-medium text-text mb-2">
                            State
                        </label>
                        <input
                            id="shelterState"
                            type="text"
                            name="shelterState"
                            value={formData.shelterState}
                            onChange={onInputChange}
                            aria-label="Shelter state (optional)"
                            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                            placeholder="State"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="shelterWebsite" className="block text-sm font-body2 font-medium text-text mb-2">
                        Shelter Website (optional)
                    </label>
                    <input
                        id="shelterWebsite"
                        type="text"
                        name="shelterWebsite"
                        value={formData.shelterWebsite}
                        onChange={onInputChange}
                        aria-label="Shelter website URL (optional)"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                        placeholder="example.com or https://example.org"
                    />
                    {formData.shelterWebsite && !formData.shelterWebsite.includes('.') && (
                        <p className="text-yellow-500 text-xs mt-1" role="alert">
                            Tip: Include a domain like .com, .org, etc.
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="rescueLocation" className="block text-sm font-body2 font-medium text-text mb-2">
                        Where was your dog found/rescued?
                    </label>
                    <input
                        id="rescueLocation"
                        type="text"
                        name="rescueLocation"
                        value={formData.rescueLocation}
                        onChange={onInputChange}
                        aria-label="Location where dog was found or rescued"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                        placeholder="e.g., Camden, NJ or Los Angeles County Animal Control"
                    />
                    <p className="text-xs text-text-muted mt-1">
                        City, state, or specific location where your dog was rescued
                    </p>
                </div>
            </div>
        </div>
    );
}