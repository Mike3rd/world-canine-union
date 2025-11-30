"use client";

import { useState } from "react";
import ImageUpload from "./registration/ImageUpload";
import DogInfoSection from "./registration/DogInfoSection";
import ShelterInfoSection from "./registration/ShelterInfoSection";
import OwnerInfoSection from "./registration/OwnerInfoSection";
import SubmitButton from "./registration/SubmitButton";
import { submitRegistration } from "../lib/registration-actions";
import ImageCropModal from "./registration/ImageCropModal";

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
    const [showCropModal, setShowCropModal] = useState(false);
    const [cropImage, setCropImage] = useState<string>("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleCropRequest = (imageUrl: string) => {
        setCropImage(imageUrl);
        setShowCropModal(true);
    };

    const handleCropComplete = (croppedImage: File) => {
        setSelectedImage(croppedImage);
        setShowCropModal(false);
        if (cropImage) {
            URL.revokeObjectURL(cropImage);
        }
    };

    const handleCloseCrop = () => {
        setShowCropModal(false);
        if (cropImage) {
            URL.revokeObjectURL(cropImage);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldErrors({});

        // Field validation
        const errors: Record<string, string> = {};
        if (!formData.dogName) errors.dogName = "Dog name is required";
        if (!formData.gender) errors.gender = "Gender is required";
        if (!formData.gotchaDay) errors.gotchaDay = "Gotcha day is required";
        if (!formData.primaryBreed) errors.primaryBreed = "Primary breed is required";
        if (!formData.ownerName) errors.ownerName = "Owner name is required";
        if (!formData.ownerEmail) errors.ownerEmail = "Email is required";

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            alert("Please fix the highlighted fields");
            return;
        }

        if (!selectedImage) {
            alert('Please upload a photo of your dog.');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await submitRegistration(formData, selectedImage);

            if (result.success) {
                alert(result.message);
                setFormData({
                    dogName: "", gender: "", birthDate: "", gotchaDay: "",
                    primaryBreed: "", secondaryBreed: "", tertiaryBreed: "",
                    dogDescription: "", specialAttributes: "", favoriteActivities: "", uniqueTraits: "",
                    dogStory: "", shelterName: "", shelterCity: "", shelterState: "", shelterWebsite: "",
                    rescueLocation: "", ownerName: "", ownerEmail: "",
                });
                setSelectedImage(null);
                window.location.reload();
            } else {
                alert(result.error);
            }
        } catch (error) {
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

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <ImageUpload
                    selectedImage={selectedImage}
                    onImageChange={setSelectedImage}
                    onCropRequest={handleCropRequest}
                />

                <DogInfoSection
                    formData={formData}
                    onInputChange={handleInputChange}
                    fieldErrors={fieldErrors}
                />

                <ShelterInfoSection
                    formData={formData}
                    onInputChange={handleInputChange}
                />

                <OwnerInfoSection
                    formData={formData}
                    onInputChange={handleInputChange}
                    fieldErrors={fieldErrors}
                />

                <SubmitButton isSubmitting={isSubmitting} />
            </form>

            {showCropModal && (
                <ImageCropModal
                    image={cropImage}
                    onCropComplete={handleCropComplete}
                    onClose={handleCloseCrop}
                />
            )}
        </div>
    );
}