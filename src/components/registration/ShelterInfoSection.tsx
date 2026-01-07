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
                        <select
                            id="shelterState"
                            name="shelterState"
                            value={formData.shelterState}
                            onChange={onInputChange}
                            aria-label="Shelter state (optional)"
                            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                        >
                            <option value="">Select a state (optional)</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
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