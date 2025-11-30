interface DogInfoSectionProps {
    formData: {
        dogName: string;
        gender: string;
        birthDate: string;
        gotchaDay: string;
        primaryBreed: string;
        secondaryBreed: string;
        tertiaryBreed: string;
        dogDescription: string;
        specialAttributes: string;
        favoriteActivities: string;
        uniqueTraits: string;
        dogStory: string;
    };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    fieldErrors: Record<string, string>;
}

export default function DogInfoSection({ formData, onInputChange, fieldErrors }: DogInfoSectionProps) {
    return (
        <>
            {/* Dog Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-body2 font-medium text-text mb-2">
                        Dog&apos;s Name *
                    </label>
                    <input
                        type="text"
                        name="dogName"
                        value={formData.dogName}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.dogName ? 'border-red-500' : 'border-border'
                            }`}
                        placeholder="Enter your dog's name"
                    />
                    {fieldErrors.dogName && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.dogName}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-body2 font-medium text-text mb-2">
                        Gender *
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.gender ? 'border-red-500' : 'border-border'
                            }`}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {fieldErrors.gender && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.gender}</p>
                    )}
                </div>
            </div>

            {/* Birth Date & Gotcha Day */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-body2 font-medium text-text mb-2">
                        Birth Date
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={onInputChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    />
                    <p className="text-xs text-text-muted mt-1">If known</p>
                </div>
                <div>
                    <label className="block text-sm font-body2 font-medium text-text mb-2">
                        Gotcha Day *
                    </label>
                    <input
                        type="date"
                        name="gotchaDay"
                        required
                        value={formData.gotchaDay}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.gotchaDay ? 'border-red-500' : 'border-border'
                            }`}
                    />
                    {fieldErrors.gotchaDay && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.gotchaDay}</p>
                    )}
                    <p className="text-xs text-text-muted mt-1">
                        When your dog joined your family
                    </p>
                </div>
            </div>

            {/* Breed Mix */}
            <div>
                <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Suspected Breed Mix *
                </label>
                <div className="space-y-3">
                    <input
                        type="text"
                        name="primaryBreed"
                        required
                        value={formData.primaryBreed}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.primaryBreed ? 'border-red-500' : 'border-border'
                            }`}
                        placeholder="Primary breed (e.g., Labrador)"
                    />
                    <input
                        type="text"
                        name="secondaryBreed"
                        value={formData.secondaryBreed}
                        onChange={onInputChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                        placeholder="Secondary breed (optional)"
                    />
                    <input
                        type="text"
                        name="tertiaryBreed"
                        value={formData.tertiaryBreed}
                        onChange={onInputChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                        placeholder="Tertiary breed (optional)"
                    />
                </div>
                {fieldErrors.primaryBreed && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.primaryBreed}</p>
                )}
                <p className="text-xs text-text-muted mt-2">
                    Your best guess is perfect! This helps us celebrate your
                    dog&apos;s unique heritage.
                </p>
            </div>

            {/* Dog's Story */}
            <div>
                <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Your Dog&apos;s Story
                    <span className="text-xs text-text-muted ml-2">
                        {formData.dogStory.length}/500
                    </span>
                </label>
                <textarea
                    name="dogStory"
                    rows={4}
                    value={formData.dogStory}
                    onChange={onInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.dogStory ? 'border-red-500' : 'border-border'
                        }`}
                    placeholder="Tell us about your dog's personality, how you met, or what makes them special..."
                />
                {fieldErrors.dogStory && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.dogStory}</p>
                )}
            </div>

            {/* Physical Description & Markings */}
            <div>
                <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Physical Description & Markings
                </label>
                <textarea
                    name="dogDescription"
                    rows={3}
                    value={formData.dogDescription}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Describe your dog's appearance, coloring, markings, size, distinctive features..."
                />
                <p className="text-xs text-text-muted mt-1">
                    Help us create a complete visual record of your unique companion
                </p>
            </div>

            {/* Special Attributes */}
            <div>
                <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Special Qualities & Personality
                </label>
                <textarea
                    name="specialAttributes"
                    rows={2}
                    value={formData.specialAttributes}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Their unique personality, special skills, what makes them extraordinary..."
                />
            </div>

            {/* Favorite Activities */}
            <div>
                <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Favorite Activities & Games
                </label>
                <input
                    type="text"
                    name="favoriteActivities"
                    value={formData.favoriteActivities}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Fetch, swimming, hiking, cuddling, specific games they love..."
                />
            </div>

            {/* Unique Traits & Quirks */}
            <div>
                <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Unique Traits & Funny Habits
                </label>
                <textarea
                    name="uniqueTraits"
                    rows={2}
                    value={formData.uniqueTraits}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Funny noises they make, strange sleeping positions, quirky behaviors, little rituals..."
                />
                <p className="text-xs text-text-muted mt-1">
                    These special details make your dog's story truly one-of-a-kind
                </p>
            </div>
        </>
    );
}