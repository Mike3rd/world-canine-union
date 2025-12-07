"use client";

import { useState, useEffect } from "react"; // ADD useEffect import
import Image from "next/image";

interface ImageUploadProps {
    selectedImage: File | null;
    onImageChange: (file: File | null) => void;
    onCropRequest: (imageUrl: string) => void;
}

export default function ImageUpload({ selectedImage, onImageChange, onCropRequest }: ImageUploadProps) {
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            onCropRequest(imageUrl);
        }
    };

    const handleRemoveImage = () => {
        onImageChange(null);
        setImagePreview("");
        // Clear file input
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            (input as HTMLInputElement).value = '';
        });
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    // FIX THIS - change useState to useEffect
    useEffect(() => {
        if (selectedImage) {
            const previewUrl = URL.createObjectURL(selectedImage);
            setImagePreview(previewUrl);

            // Cleanup function
            return () => {
                URL.revokeObjectURL(previewUrl);
            };
        } else {
            setImagePreview("");
        }
    }, [selectedImage]);

    return (
        <div>
            <label className="block text-sm font-body2 font-medium text-text mb-4">
                Dog&apos;s Photo <span className="text-accent font-bold">*</span>
            </label>
            <div className="flex flex-col items-center space-y-4">
                {imagePreview ? (
                    <div className="relative">
                        <Image
                            src={imagePreview}
                            alt="Dog preview"
                            width={192}
                            height={256}
                            className="w-48 h-64 object-cover rounded-2xl border-2 border-border"
                            unoptimized
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 bg-error text-surface w-6 h-6 rounded-full text-xs"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div className="w-48 h-64 border-2 border-dashed border-border rounded-2xl flex items-center justify-center bg-background">
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
                        formNoValidate
                    />
                </label>
                <p className="text-xs text-text-muted text-center">
                    Recommended: Clear, well-lit photo showing your dog&apos;s face.
                    You&apos;ll be able to crop it to fit the ID card format.
                </p>
            </div>
        </div>
    );
}