// /app/update-form/components/DogInfoSection.tsx
interface DogInfoSectionProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    fieldErrors?: Record<string, string>;
}

export default function DogInfoSection({ formData, handleChange }: DogInfoSectionProps) {
    // Calculate breed character count
    const breedCharCount = (
        formData.primaryBreed?.length +
        (formData.secondaryBreed ? formData.secondaryBreed.length + 3 : 0) +
        (formData.tertiaryBreed ? formData.tertiaryBreed.length + 3 : 0)
    );

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-heading font-semibold text-primary border-l-4 border-primary pl-4">
                2. Dog Information Updates
            </h3>

            {/* Dog Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="dogName" className="block text-sm font-body2 font-medium text-text mb-2">
                        Dog&apos;s Name
                        <span className="text-xs text-text-muted ml-2">
                            {formData.dogName?.length || 0}/50
                        </span>
                    </label>
                    <input
                        id="dogName"
                        type="text"
                        name="dogName"
                        value={formData.dogName || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                        placeholder="Enter your dog's name"
                        maxLength={50}
                    />
                </div>
                <div>
                    <label htmlFor="gender" className="block text-sm font-body2 font-medium text-text mb-2">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    >
                        <option value="">Select gender (leave blank to keep current)</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>

            {/* Birth Date */}
            <div>
                <label htmlFor="birthDate" className="block text-sm font-body2 font-medium text-text mb-2">
                    Birth Date
                </label>
                <input
                    id="birthDate"
                    type="date"
                    name="birthDate"
                    value={formData.birthDate || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                />
                <p className="text-xs text-text-muted mt-1">Leave blank to keep current</p>
            </div>

            {/* Breed Mix */}
            <div>
                <div className="mb-2">
                    <label className="block text-sm font-body2 font-medium text-text mb-2">
                        Suspected Breed Mix
                        <span className="text-xs text-text-muted ml-2">
                            {breedCharCount}/125
                        </span>
                    </label>
                    <p className="text-xs text-text-muted mb-2">
                        Total of all breed fields must be 125 characters or less
                    </p>
                </div>
                <div className="space-y-3">
                    <div>
                        <label htmlFor="primaryBreed" className="sr-only">Primary breed</label>
                        <input
                            id="primaryBreed"
                            type="text"
                            name="primaryBreed"
                            value={formData.primaryBreed || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                            placeholder="Primary breed (e.g., Labrador)"
                            maxLength={50}
                        />
                    </div>
                    <div>
                        <label htmlFor="secondaryBreed" className="sr-only">Secondary breed</label>
                        <input
                            id="secondaryBreed"
                            type="text"
                            name="secondaryBreed"
                            value={formData.secondaryBreed || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                            placeholder="Secondary breed (optional)"
                            maxLength={50}
                        />
                    </div>
                    <div>
                        <label htmlFor="tertiaryBreed" className="sr-only">Tertiary breed</label>
                        <input
                            id="tertiaryBreed"
                            type="text"
                            name="tertiaryBreed"
                            value={formData.tertiaryBreed || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                            placeholder="Tertiary breed (optional)"
                            maxLength={50}
                        />
                    </div>
                </div>
                <p className="text-xs text-text-muted mt-2">
                    Your best guess is perfect! Leave blank to keep current.
                </p>
            </div>

            {/* Color */}
            <div>
                <label htmlFor="dogColor" className="block text-sm font-body2 font-medium text-text mb-2">
                    Dog's Color(s)
                    <span className="text-xs text-text-muted ml-2">
                        {formData.dogColor?.length || 0}/50
                    </span>
                </label>
                <input
                    id="dogColor"
                    type="text"
                    name="dogColor"
                    value={formData.dogColor || ''}
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Describe your dog's colors (e.g., black and tan, brindle)"
                />
                <p className="text-xs text-text-muted mt-1">Leave blank to keep current</p>
            </div>

            {/* Physical Description & Markings */}
            <div>
                <label htmlFor="dogDescription" className="block text-sm font-body2 font-medium text-text mb-2">
                    Physical Description & Markings
                    <span className="text-xs text-text-muted ml-2">
                        {formData.dogDescription?.length || 0}/200
                    </span>
                </label>
                <textarea
                    id="dogDescription"
                    name="dogDescription"
                    rows={3}
                    value={formData.dogDescription || ''}
                    onChange={handleChange}
                    maxLength={200}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Distinctive markings, scars, eye color, tail type, ear shape..."
                />
                <p className="text-xs text-text-muted mt-1">Leave blank to keep current</p>
            </div>

            {/* Dog's Story (rescue_story in DB) */}
            <div>
                <label htmlFor="dogStory" className="block text-sm font-body2 font-medium text-text mb-2">
                    Your Dog&apos;s Story
                    <span className="text-xs text-text-muted ml-2">
                        {formData.dogStory?.length || 0}/500
                    </span>
                </label>
                <textarea
                    id="dogStory"
                    name="dogStory"
                    rows={4}
                    value={formData.dogStory || ''}
                    onChange={handleChange}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Tell us about your dog's personality, how you met, or what makes them special..."
                />
                <p className="text-xs text-text-muted mt-1">Leave blank to keep current</p>
            </div>

            {/* Special Attributes (special_qualities in DB) */}
            <div>
                <label htmlFor="specialAttributes" className="block text-sm font-body2 font-medium text-text mb-2">
                    Special Qualities & Personality
                    <span className="text-xs text-text-muted ml-2">
                        {formData.specialAttributes?.length || 0}/500
                    </span>
                </label>
                <textarea
                    id="specialAttributes"
                    name="specialAttributes"
                    rows={2}
                    value={formData.specialAttributes || ''}
                    onChange={handleChange}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Their unique personality, special skills, what makes them extraordinary..."
                />
                <p className="text-xs text-text-muted mt-1">Leave blank to keep current</p>
            </div>

            {/* Favorite Activities (favorite_activities in DB) */}
            <div>
                <label htmlFor="favoriteActivities" className="block text-sm font-body2 font-medium text-text mb-2">
                    Favorite Activities & Games
                    <span className="text-xs text-text-muted ml-2">
                        {formData.favoriteActivities?.length || 0}/300
                    </span>
                </label>
                <input
                    id="favoriteActivities"
                    type="text"
                    name="favoriteActivities"
                    value={formData.favoriteActivities || ''}
                    onChange={handleChange}
                    maxLength={300}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Fetch, swimming, hiking, cuddling, specific games they love..."
                />
                <p className="text-xs text-text-muted mt-1">Leave blank to keep current</p>
            </div>

            {/* Unique Traits (unique_traits in DB) */}
            <div>
                <label htmlFor="uniqueTraits" className="block text-sm font-body2 font-medium text-text mb-2">
                    Unique Traits & Funny Habits
                    <span className="text-xs text-text-muted ml-2">
                        {formData.uniqueTraits?.length || 0}/500
                    </span>
                </label>
                <textarea
                    id="uniqueTraits"
                    name="uniqueTraits"
                    rows={2}
                    value={formData.uniqueTraits || ''}
                    onChange={handleChange}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Funny noises they make, strange sleeping positions, quirky behaviors..."
                />
                <p className="text-xs text-text-muted mt-1">Leave blank to keep current</p>
            </div>
        </div>
    );
}