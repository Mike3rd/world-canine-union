"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
    selectedImage: File | null;
    onImageChange: (file: File | null) => void;
}

const optimizeImageForWeb = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
        const img = new window.Image(); // Add 'window.' to fix the constructor
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDimension = 800;

            let { width, height } = img;

            if (width > height) {
                if (width > maxDimension) {
                    height = (height * maxDimension) / width;
                    width = maxDimension;
                }
            } else {
                if (height > maxDimension) {
                    width = (width * maxDimension) / height;
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                if (blob) {
                    const optimizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                        type: 'image/webp',
                        lastModified: Date.now(),
                    });
                    resolve(optimizedFile);
                } else {
                    resolve(file);
                }
            }, 'image/webp', 0.8);
        };
        img.src = URL.createObjectURL(file);
    });
};

export default function ImageUpload({ selectedImage, onImageChange }: ImageUploadProps) {
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const optimizedFile = await optimizeImageForWeb(file);
            onImageChange(optimizedFile);
            const previewUrl = URL.createObjectURL(optimizedFile);
            setImagePreview(previewUrl);
        }
    };

    const handleRemoveImage = () => {
        onImageChange(null);
        setImagePreview("");
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
                            height={192}
                            className="w-48 h-48 object-contain rounded-2xl border-2 border-border"
                            unoptimized // Add this for blob URLs
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
                    Recommended: Clear, well-lit photo showing your dog&apos;s face
                </p>
            </div>
        </div>
    );
}