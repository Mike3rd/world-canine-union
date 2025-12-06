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
    dogColor: string;
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
        primaryBreed: "", secondaryBreed: "", tertiaryBreed: "", dogColor: "",
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
        // Clear the file input so user can select same file again
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            (input as HTMLInputElement).value = '';
        });
        // ADD URL cleanup to prevent memory leaks
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


        // DEBUG: Check file size
        if (selectedImage) {
            console.log('📁 File being submitted:', {
                name: selectedImage.name,
                size: selectedImage.size,
                sizeMB: (selectedImage.size / 1024 / 1024).toFixed(2) + ' MB',
                type: selectedImage.type
            });
        }

        // AUTO-FIX WEBSITE URL
        const submissionData = { ...formData };
        if (submissionData.shelterWebsite && !submissionData.shelterWebsite.startsWith('http')) {
            submissionData.shelterWebsite = `https://${submissionData.shelterWebsite}`;
        }

        // Combined validation
        const errors: Record<string, string> = {};

        // Combine breeds exactly like Supabase does
        const combinedBreeds = `${formData.primaryBreed} ${formData.secondaryBreed ? `+ ${formData.secondaryBreed}` : ""
            } ${formData.tertiaryBreed ? `+ ${formData.tertiaryBreed}` : ""
            }`.trim();


        // Required field validation
        if (!formData.dogName) errors.dogName = "Dog name is required";
        if (!formData.gender) errors.gender = "Gender is required";
        if (!formData.gotchaDay) errors.gotchaDay = "Gotcha day is required";
        if (!formData.primaryBreed) errors.primaryBreed = "Primary breed is required";
        if (!formData.dogColor) errors.dogColor = "Dog color is required";
        if (!formData.ownerName) errors.ownerName = "Owner name is required";
        if (!formData.ownerEmail) errors.ownerEmail = "Email is required";
        // Email format validation
        if (formData.ownerEmail && !isValidEmail(formData.ownerEmail)) {
            errors.ownerEmail = "Please enter a valid email address";
        }

        // Character limit validation
        // Check combined length (100 characters max for 2 PDF lines)
        if (combinedBreeds.length > 100) {
            errors.primaryBreed = `Total breed description is ${combinedBreeds.length} characters. Maximum is 100 characters for the PDF certificate.`;
        }

        // ===== COLOR CHARACTER LIMIT =====
        if (formData.dogColor.length > 50) {
            errors.dogColor = `Color description is ${formData.dogColor.length} characters. Maximum is 50 characters for the PDF certificate.`;
        }
        // ===== DOG NAME CHARACTER LIMIT =====
        if (formData.dogName && formData.dogName.length > 30) {
            errors.dogName = `Dog name is ${formData.dogName.length} characters. Maximum is 30 characters for the PDF certificate.`;
        }

        if (formData.dogStory.length > 500) errors.dogStory = "Dog's story must be 500 characters or less";
        if (formData.dogDescription.length > 150) errors.dogDescription = "Physical description must be 150 characters or less";
        if (formData.specialAttributes.length > 500) errors.specialAttributes = "Special qualities must be 500 characters or less";
        if (formData.favoriteActivities.length > 300) errors.favoriteActivities = "Favorite activities must be 300 characters or less";
        if (formData.uniqueTraits.length > 500) errors.uniqueTraits = "Unique traits must be 500 characters or less";

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
            const result = await submitRegistration(submissionData, selectedImage);

            if (result.success) {
                // Show success message with WCU number
                alert(result.message);

                // Check if we have a Stripe checkout URL
                if (result.checkoutUrl) {
                    // Clear form (optional - but good UX)
                    setFormData({
                        dogName: "", gender: "", birthDate: "", gotchaDay: "",
                        primaryBreed: "", secondaryBreed: "", tertiaryBreed: "",
                        dogDescription: "", specialAttributes: "", favoriteActivities: "", uniqueTraits: "", dogColor: "",
                        dogStory: "", shelterName: "", shelterCity: "", shelterState: "", shelterWebsite: "",
                        rescueLocation: "", ownerName: "", ownerEmail: "",
                    });
                    setSelectedImage(null);

                    // Redirect to Stripe checkout (immediately after alert)
                    window.location.href = result.checkoutUrl;
                } else {
                    // No payment required (fallback or free registration)
                    // Clear form and reload as before
                    setFormData({
                        dogName: "", gender: "", birthDate: "", gotchaDay: "",
                        primaryBreed: "", secondaryBreed: "", tertiaryBreed: "",
                        dogDescription: "", specialAttributes: "", favoriteActivities: "", uniqueTraits: "", dogColor: "",
                        dogStory: "", shelterName: "", shelterCity: "", shelterState: "", shelterWebsite: "",
                        rescueLocation: "", ownerName: "", ownerEmail: "",
                    });
                    setSelectedImage(null);
                    window.location.reload();
                }
            } else {
                alert(result.error);
            }
        } catch (error) {
            alert('Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Add email validation helper function
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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