"use client";

import { useState } from "react";
import ImageUpload from "./registration/ImageUpload";
import DogInfoSection from "./registration/DogInfoSection";
import ShelterInfoSection from "./registration/ShelterInfoSection";
import OwnerInfoSection from "./registration/OwnerInfoSection";
import SubmitButton from "./registration/SubmitButton";
import { submitRegistration } from "../lib/registration-actions";

interface FormData {
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
    shelterName: string;
    shelterCity: string;
    shelterState: string;
    shelterWebsite: string;
    rescueLocation: string;
    ownerName: string;
    ownerEmail: string;
}

export default function RegistrationForm() {
    const [formData, setFormData] = useState<FormData>({
        dogName: "", gender: "", birthDate: "", gotchaDay: "",
        primaryBreed: "", secondaryBreed: "", tertiaryBreed: "",
        dogDescription: "", specialAttributes: "", favoriteActivities: "", uniqueTraits: "",
        dogStory: "", shelterName: "", shelterCity: "", shelterState: "", shelterWebsite: "",
        rescueLocation: "", ownerName: "", ownerEmail: "",
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const result = await submitRegistration(formData, selectedImage);

            if (result.success) {
                alert(result.message);
                // Reset form on success
                setFormData({
                    dogName: "", gender: "", birthDate: "", gotchaDay: "",
                    primaryBreed: "", secondaryBreed: "", tertiaryBreed: "",
                    dogDescription: "", specialAttributes: "", favoriteActivities: "", uniqueTraits: "",
                    dogStory: "", shelterName: "", shelterCity: "", shelterState: "", shelterWebsite: "",
                    rescueLocation: "", ownerName: "", ownerEmail: "",
                });
                setSelectedImage(null);
                // Also clear the image preview by refreshing the page or using a ref
                window.location.reload(); // Simple fix - refreshes the form completely
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
                Dog Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <ImageUpload
                    selectedImage={selectedImage}
                    onImageChange={setSelectedImage}
                />

                <DogInfoSection
                    formData={formData}
                    onInputChange={handleInputChange}
                />

                <ShelterInfoSection
                    formData={formData}
                    onInputChange={handleInputChange}
                />

                <OwnerInfoSection
                    formData={formData}
                    onInputChange={handleInputChange}
                />

                <SubmitButton isSubmitting={isSubmitting} />
            </form>
        </div>
    );
}