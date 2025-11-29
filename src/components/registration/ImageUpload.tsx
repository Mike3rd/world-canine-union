"use client";

import { useState } from "react";
import Image from "next/image";
import ImageCropModal from "./ImageCropModal";

interface ImageUploadProps {
    selectedImage: File | null;
    onImageChange: (file: File | null) => void;
}

export default function ImageUpload({ selectedImage, onImageChange }: ImageUploadProps) {
    const [imagePreview, setImagePreview] = useState<string>("");
    const [showCropModal, setShowCropModal] = useState(false);
    const [originalImage, setOriginalImage] = useState<string>("");

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setOriginalImage(imageUrl);
            setShowCropModal(true);
        }
    };

    const handleCropComplete = (croppedImage: File) => {
        onImageChange(croppedImage);
        const previewUrl = URL.createObjectURL(croppedImage);
        setImagePreview(previewUrl);
        setShowCropModal(false);
        // Clean up original image URL
        if (originalImage) {
            URL.revokeObjectURL(originalImage);
        }
    };

    const handleCloseCrop = () => {
        setShowCropModal(false);
        // Clean up original image URL
        if (originalImage) {
            URL.revokeObjectURL(originalImage);
        }
    };

    const handleRemoveImage = () => {
        onImageChange(null);
        setImagePreview("");
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    };

    return (
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
                            height={256} // 3:4 aspect ratio
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
                        required
                    />
                </label>
                <p className="text-xs text-text-muted text-center">
                    Recommended: Clear, well-lit photo showing your dog&apos;s face.
                    You&apos;ll be able to crop it to fit the ID card format.
                </p>
            </div>

            {showCropModal && originalImage && (
                <ImageCropModal
                    image={originalImage}
                    onCropComplete={handleCropComplete}
                    onClose={handleCloseCrop}
                />
            )}
        </div>
    );
}