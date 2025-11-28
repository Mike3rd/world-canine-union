"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from '@/lib/supabase';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    dogName: "",
    gender: "",
    birthDate: "",
    gotchaDay: "",
    primaryBreed: "",
    secondaryBreed: "",
    tertiaryBreed: "",
    dogDescription: "",
    specialAttributes: "",
    favoriteActivities: "",
    uniqueTraits: "",
    dogStory: "",
    shelterName: "",
    shelterCity: "",
    shelterState: "",
    shelterWebsite: "",
    ownerName: "",
    ownerEmail: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  console.log('Environment check:', {
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseClient: !!supabase
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. First create the registration to get the sequential number
      console.log('Creating registration...');
      const { data: registrationData, error: registrationError } = await supabase
        .from('registrations')
        .insert([
          {
            dog_name: formData.dogName,
            owner_name: formData.ownerName,
            owner_email: formData.ownerEmail,
            birth_date: formData.birthDate || null,
            gotcha_date: formData.gotchaDay || null,
            location: '',
            breed_description: `${formData.primaryBreed} ${formData.secondaryBreed ? `+ ${formData.secondaryBreed}` : ''} ${formData.tertiaryBreed ? `+ ${formData.tertiaryBreed}` : ''}`.trim(),
            rescue_story: formData.dogStory,
            // ADD THE 4 NEW FIELDS:
            dog_description: formData.dogDescription || null,
            special_attributes: formData.specialAttributes || null,
            favorite_activities: formData.favoriteActivities || null,
            unique_traits: formData.uniqueTraits || null,
            shelter_name: formData.shelterName || null,
            shelter_city: formData.shelterCity || null,
            shelter_state: formData.shelterState || null,
            shelter_website: formData.shelterWebsite || null,
            status: 'pending'
          }
        ])
        .select();

      if (registrationError) throw registrationError;

      const registration = registrationData[0];
      const registrationNumber = registration.registration_number;
      console.log('Registration created:', registrationNumber);

      // 2. Upload image with registration number in filename
      let photoUrl = '';
      if (selectedImage) {
        console.log('Uploading image linked to:', registrationNumber);
        const fileExt = selectedImage.name.split('.').pop();
        // Critical: Include registration number in filename
        const fileName = `${registrationNumber}-photo.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('wcu-dogs')
          .upload(`dog-photos/${fileName}`, selectedImage);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('wcu-dogs')
          .getPublicUrl(`dog-photos/${fileName}`);

        photoUrl = publicUrlData.publicUrl;
        console.log('Image uploaded with link:', photoUrl);

        // 3. Update registration with the photo URL
        const { error: updateError } = await supabase
          .from('registrations')
          .update({ photo_url: photoUrl })
          .eq('id', registration.id);

        if (updateError) throw updateError;
      }

      // SUCCESS!
      alert(`🎉 Registration Successful! Your official WCU number: ${registrationNumber}`);

      // Clear form - in your handleSubmit
      setFormData({
        dogName: "", gender: "", birthDate: "", gotchaDay: "",
        primaryBreed: "", secondaryBreed: "", tertiaryBreed: "",
        dogStory: "",
        // ALL 4 NEW FIELDS:
        dogDescription: "",
        specialAttributes: "",
        favoriteActivities: "",
        uniqueTraits: "",
        shelterName: "", shelterCity: "", shelterState: "", shelterWebsite: "",
        ownerName: "", ownerEmail: "",
      });
      setSelectedImage(null);
      setImagePreview("");

    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Register Your Dog
          </h1>
          <p className="text-xl text-text-muted font-body2">
            Join the World Canine Union and get official certification for your
            one-of-a-kind companion
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-surface rounded-2xl p-8 shadow-lg border border-border">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
            Dog Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-body2 font-medium text-text mb-4">
                Dog&apos;s Photo *
              </label>
              <div className="flex flex-col items-center space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Dog preview"
                      width={192}
                      height={192}
                      className="w-48 h-48 object-cover rounded-2xl border-2 border-border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview("");
                      }}
                      className="absolute -top-2 -right-2 bg-error text-surface w-6 h-6 rounded-full text-xs"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-48 h-48 border-2 border-dashed border-border rounded-2xl flex items-center justify-center bg-background">
                    <span className="text-text-muted text-sm text-center px-4">
                      Upload your dog&apos;s photo
                    </span>
                  </div>
                )}
                <label className="bg-buttons text-surface px-6 py-3 rounded-xl font-heading font-semibold hover:opacity-90 transition-all cursor-pointer">
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
                <p className="text-xs text-text-muted text-center">
                  Recommended: Clear, well-lit photo showing your dog&apos;s
                  face
                </p>
              </div>
            </div>

            {/* Dog Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-body2 font-medium text-text mb-2">
                  Dog&apos;s Name *
                </label>
                <input
                  type="text"
                  name="dogName"
                  required
                  value={formData.dogName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                  placeholder="Enter your dog's name"
                />
              </div>
              <div>
                <label className="block text-sm font-body2 font-medium text-text mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                />
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
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                  placeholder="Primary breed (e.g., Labrador)"
                />
                <input
                  type="text"
                  name="secondaryBreed"
                  value={formData.secondaryBreed}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                  placeholder="Secondary breed (optional)"
                />
                <input
                  type="text"
                  name="tertiaryBreed"
                  value={formData.tertiaryBreed}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                  placeholder="Tertiary breed (optional)"
                />
              </div>
              <p className="text-xs text-text-muted mt-2">
                Your best guess is perfect! This helps us celebrate your
                dog&apos;s unique heritage.
              </p>
            </div>

            {/* Dog's Story */}
            <div>
              <label className="block text-sm font-body2 font-medium text-text mb-2">
                Your Dog&apos;s Story
              </label>
              <textarea
                name="dogStory"
                rows={4}
                value={formData.dogStory}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                placeholder="Tell us about your dog's personality, how you met, or what makes them special..."
              />
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                placeholder="Funny noises they make, strange sleeping positions, quirky behaviors, little rituals..."
              />
              <p className="text-xs text-text-muted mt-1">
                These special details make your dog's story truly one-of-a-kind
              </p>
            </div>

            {/* Shelter Information */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-xl font-heading font-semibold text-primary mb-6">
                Rescue/Shelter Information
              </h3>
              <p className="text-text-muted mb-4 text-sm">
                Help us recognize the amazing organizations that save dogs! This information will be used to build our national shelter directory.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Shelter/Rescue Name
                  </label>
                  <input
                    type="text"
                    name="shelterName"
                    value={formData.shelterName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="e.g., Happy Tails Rescue"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body2 font-medium text-text mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="shelterCity"
                      value={formData.shelterCity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body2 font-medium text-text mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="shelterState"
                      value={formData.shelterState}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Shelter Website (optional)
                  </label>
                  <input
                    type="url"
                    name="shelterWebsite"
                    value={formData.shelterWebsite}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="https://www.example.org"
                  />
                </div>
              </div>
            </div>

            {/* Owner Information */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-xl font-heading font-semibold text-primary mb-6">
                Owner Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    required
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body2 font-medium text-text mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="ownerEmail"
                    required
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-buttons text-surface py-4 rounded-xl font-heading font-semibold text-lg hover:opacity-90 transition-all shadow-lg cursor-pointer"
              >
                Continue to Payment - $25
              </button>
              <p className="text-center text-text-muted text-sm mt-4">
                A portion of every registration supports animal rescue
                organizations
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
