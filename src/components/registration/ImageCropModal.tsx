"use client";

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

interface Point {
    x: number;
    y: number;
}

interface Area {
    width: number;
    height: number;
    x: number;
    y: number;
}

interface ImageCropModalProps {
    image: string;
    onCropComplete: (croppedImage: File) => void;
    onClose: () => void;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.src = url;
    });

const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area
): Promise<File> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('No 2d context');
    }

    // RESIZE to max 500px for smaller files
    const maxDimension = 550; // REDUCED FROM 600
    let { width, height } = pixelCrop;

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

    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        width,
        height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], 'cropped-dog-photo.webp', {
                    type: 'image/webp',
                });
                resolve(file);
            }
        }, 'image/webp', 0.6); // REDUCED FROM 0.6 to 0.5
    });
};

export default function ImageCropModal({ image, onCropComplete, onClose }: ImageCropModalProps) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const onCropChange = (crop: Point) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const handleCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSaveCrop = async () => {
        if (croppedAreaPixels) {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            onCropComplete(croppedImage);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Crop Dog Photo</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={3 / 4} // Passport/ID card ratio
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={handleCropComplete}
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zoom
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div className="mt-6 flex gap-3 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer" // ADD cursor-pointer
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveCrop}
                        disabled={isSaving || !croppedAreaPixels}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer" // ADD cursor-pointer HERE
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Cropped Photo'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}