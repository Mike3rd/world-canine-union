interface DogInfoSectionProps {
    formData: {
        dogName: string;
        gender: string;
        birthDate: string;
        gotchaDay: string;
        primaryBreed: string;
        secondaryBreed: string;
        tertiaryBreed: string;
        dogColor: string;
        dogDescription: string;
        specialAttributes: string;
        favoriteActivities: string;
        uniqueTraits: string;
        dogStory: string;
        rescueLocation: string;
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
                    <label htmlFor="dogName" className="block text-sm font-body2 font-medium text-text mb-2">
                        Dog&apos;s Name <span className="text-accent font-bold">*</span>
                        <span className="text-xs text-text-muted ml-2">
                            {formData.dogName.length}/50
                        </span>
                    </label>
                    <input
                        id="dogName"
                        type="text"
                        name="dogName"
                        value={formData.dogName}
                        onChange={onInputChange}
                        aria-label="Dog's name"
                        aria-required="true"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.dogName ? 'border-red-500' : 'border-border'
                            }`}
                        placeholder="Enter your dog's name"
                        maxLength={50}
                    />
                    {fieldErrors.dogName && (
                        <p id="dogName-error" className="text-red-500 text-xs mt-1">{fieldErrors.dogName}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="gender" className="block text-sm font-body2 font-medium text-text mb-2">
                        Gender <span className="text-accent font-bold">*</span>
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={onInputChange}
                        aria-label="Dog's gender"
                        aria-required="true"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.gender ? 'border-red-500' : 'border-border'
                            }`}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {fieldErrors.gender && (
                        <p id="gender-error" className="text-red-500 text-xs mt-1">{fieldErrors.gender}</p>
                    )}
                </div>
            </div>

            {/* Birth Date & Gotcha Day */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="birthDate" className="block text-sm font-body2 font-medium text-text mb-2">
                        Birth Date
                    </label>
                    <input
                        id="birthDate"
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={onInputChange}
                        aria-label="Dog's birth date"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    />
                    <p className="text-xs text-text-muted mt-1">If known</p>
                </div>
                <div>
                    <label htmlFor="gotchaDay" className="block text-sm font-body2 font-medium text-text mb-2">
                        Gotcha Day <span className="text-accent font-bold">*</span>
                    </label>
                    <input
                        id="gotchaDay"
                        type="date"
                        name="gotchaDay"
                        required
                        value={formData.gotchaDay}
                        onChange={onInputChange}
                        aria-label="Gotcha day - when your dog joined your family"
                        aria-required="true"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.gotchaDay ? 'border-red-500' : 'border-border'
                            }`}
                    />
                    {fieldErrors.gotchaDay && (
                        <p id="gotchaDay-error" className="text-red-500 text-xs mt-1">{fieldErrors.gotchaDay}</p>
                    )}
                    <p className="text-xs text-text-muted mt-1">
                        When your dog joined your family
                    </p>
                </div>
            </div>

            {/* Breed Mix */}

            <div>
                <div className="mb-2">
                    <label className="block text-sm font-body2 font-medium text-text mb-2">
                        Suspected Breed Mix <span className="text-accent font-bold">*</span>
                        <span className="text-xs text-text-muted ml-2">
                            {/* Calculate total length of all breed fields */}
                            {(
                                formData.primaryBreed.length +
                                (formData.secondaryBreed ? formData.secondaryBreed.length + 3 : 0) + // "+ " adds 3 chars
                                (formData.tertiaryBreed ? formData.tertiaryBreed.length + 3 : 0)     // "+ " adds 3 chars
                            )}/125
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
                            required
                            value={formData.primaryBreed}
                            onChange={onInputChange}
                            aria-label="Primary breed"
                            aria-required="true"
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.primaryBreed ? 'border-red-500' : 'border-border'
                                }`}
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
                            value={formData.secondaryBreed}
                            onChange={onInputChange}
                            aria-label="Secondary breed (optional)"
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
                            value={formData.tertiaryBreed}
                            onChange={onInputChange}
                            aria-label="Tertiary breed (optional)"
                            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                            placeholder="Tertiary breed (optional)"
                            maxLength={50}
                        />
                    </div>
                </div>
                {fieldErrors.primaryBreed && (
                    <p id="primaryBreed-error" className="text-red-500 text-xs mt-1">{fieldErrors.primaryBreed}</p>
                )}
                <p className="text-xs text-text-muted mt-2">
                    Your best guess is perfect! This helps us celebrate your
                    dog&apos;s unique heritage.
                </p>
            </div>

            {/* Color */}
            <div>
                <label htmlFor="dogColor" className="block text-sm font-body2 font-medium text-text mb-2">
                    Dog's Color(s) <span className="text-accent font-bold">*</span>
                    <span className="text-xs text-text-muted ml-2">
                        {formData.dogColor.length}/50
                    </span>
                </label>
                <input
                    id="dogColor"
                    type="text"
                    name="dogColor"
                    value={formData.dogColor}
                    onChange={onInputChange}
                    aria-label="Dog's colors"
                    aria-required="true"
                    maxLength={50}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.dogColor ? 'border-red-500' : 'border-border'
                        }`}
                    placeholder="Describe your dog's colors (e.g., black and tan, brindle, white with brown spots)"
                />
                {fieldErrors.dogColor && (
                    <p id="dogColor-error" className="text-red-500 text-xs mt-1">{fieldErrors.dogColor}</p>
                )}
                <p className="text-xs text-text-muted mt-1">
                    Primary colors and patterns
                </p>
            </div>

            <div>
                <label htmlFor="rescueLocation" className="block text-sm font-body2 font-medium text-text mb-2">
                    Where was your dog found/rescued/obtained?
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
                    City, state, or specific location where your dog hails from
                </p>
            </div>

            {/* Physical Description & Markings */}
            <div>
                <label htmlFor="dogDescription" className="block text-sm font-body2 font-medium text-text mb-2">
                    Physical Description & Markings
                    <span className="text-xs text-text-muted ml-2">
                        {formData.dogDescription.length}/200
                    </span>
                </label>
                <textarea
                    id="dogDescription"
                    name="dogDescription"
                    rows={3}
                    value={formData.dogDescription}
                    onChange={onInputChange}
                    aria-label="Physical description and markings"
                    maxLength={200}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.dogDescription ? 'border-red-500' : 'border-border'
                        }`}
                    placeholder="Distinctive markings, scars, eye color, tail type, ear shape, size, weight..."
                />
                {fieldErrors.dogDescription && (
                    <p id="dogDescription-error" className="text-red-500 text-xs mt-1">{fieldErrors.dogDescription}</p>
                )}
                <p className="text-xs text-text-muted mt-1">
                    Help us create a complete visual record of your unique companion
                </p>
            </div>

            {/* Dog's Story */}
            <div>
                <label htmlFor="dogStory" className="block text-sm font-body2 font-medium text-text mb-2">
                    Your Dog&apos;s Story
                    <span className="text-xs text-text-muted ml-2">
                        {formData.dogStory.length}/500
                    </span>
                </label>
                <textarea
                    id="dogStory"
                    name="dogStory"
                    rows={4}
                    value={formData.dogStory}
                    onChange={onInputChange}
                    aria-label="Your dog's story"
                    maxLength={500}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.dogStory ? 'border-red-500' : 'border-border'
                        }`}
                    placeholder="Tell us about your dog's personality, how you met, or what makes them special..."
                />
                {fieldErrors.dogStory && (
                    <p id="dogStory-error" className="text-red-500 text-xs mt-1">{fieldErrors.dogStory}</p>
                )}
            </div>

            {/* Special Attributes */}
            <div>
                <label htmlFor="specialAttributes" className="block text-sm font-body2 font-medium text-text mb-2">
                    Special Qualities & Personality
                    <span className="text-xs text-text-muted ml-2">
                        {formData.specialAttributes.length}/500
                    </span>
                </label>
                <textarea
                    id="specialAttributes"
                    name="specialAttributes"
                    rows={2}
                    value={formData.specialAttributes}
                    onChange={onInputChange}
                    aria-label="Special qualities and personality"
                    maxLength={500}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.specialAttributes ? 'border-red-500' : 'border-border'
                        }`}
                    placeholder="Their unique personality, special skills, what makes them extraordinary..."
                />
                {fieldErrors.specialAttributes && (
                    <p id="specialAttributes-error" className="text-red-500 text-xs mt-1">{fieldErrors.specialAttributes}</p>
                )}
            </div>

            {/* Favorite Activities */}
            <div>
                <label htmlFor="favoriteActivities" className="block text-sm font-body2 font-medium text-text mb-2">
                    Favorite Activities & Games
                    <span className="text-xs text-text-muted ml-2">
                        {formData.favoriteActivities.length}/300
                    </span>
                </label>
                <input
                    id="favoriteActivities"
                    type="text"
                    name="favoriteActivities"
                    value={formData.favoriteActivities}
                    onChange={onInputChange}
                    aria-label="Favorite activities and games"
                    maxLength={300}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.favoriteActivities ? 'border-red-500' : 'border-border'
                        }`}
                    placeholder="Fetch, swimming, hiking, cuddling, specific games they love..."
                />
                {fieldErrors.favoriteActivities && (
                    <p id="favoriteActivities-error" className="text-red-500 text-xs mt-1">{fieldErrors.favoriteActivities}</p>
                )}
            </div>

            {/* Unique Traits & Quirks */}
            <div>
                <label htmlFor="uniqueTraits" className="block text-sm font-body2 font-medium text-text mb-2">
                    Unique Traits & Funny Habits
                    <span className="text-xs text-text-muted ml-2">
                        {formData.uniqueTraits.length}/500
                    </span>
                </label>
                <textarea
                    id="uniqueTraits"
                    name="uniqueTraits"
                    rows={2}
                    value={formData.uniqueTraits}
                    onChange={onInputChange}
                    aria-label="Unique traits and funny habits"
                    maxLength={500}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.uniqueTraits ? 'border-red-500' : 'border-border'
                        }`}
                    placeholder="Funny noises they make, strange sleeping positions, quirky behaviors, little rituals..."
                />
                {fieldErrors.uniqueTraits && (
                    <p id="uniqueTraits-error" className="text-red-500 text-xs mt-1">{fieldErrors.uniqueTraits}</p>
                )}
                <p className="text-xs text-text-muted mt-1">
                    These special details make your dog's story truly one-of-a-kind
                </p>
            </div>
        </>
    );
}