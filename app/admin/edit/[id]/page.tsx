'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, FileText } from 'lucide-react';

export default function EditDogPage() {
    const [dog, setDog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const params = useParams();
    const router = useRouter();
    const dogId = params.id as string;

    useEffect(() => {
        loadDogData();
    }, [dogId]);

    const loadDogData = async () => {
        try {
            const { supabase } = await import('@/lib/supabase');
            const { data, error } = await supabase
                .from('registrations')
                .select('*')
                .eq('id', dogId)
                .single();

            if (error) throw error;

            setDog(data);
            setFormData(data);
        } catch (error) {
            console.error('Error loading dog:', error);
            alert('Error loading dog data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const { supabase } = await import('@/lib/supabase');
            const { error } = await supabase
                .from('registrations')
                .update(formData)
                .eq('id', dogId);

            if (error) throw error;

            alert('✅ Dog record updated successfully!');
            setDog(formData);
        } catch (error) {
            console.error('Error saving:', error);
            alert('Error saving changes: ' + (error as Error).message);
        } finally {
            setSaving(false);
        }
    };

    const handleRegeneratePDF = async () => {
        if (!dog || !confirm(`Regenerate PDF for ${dog.dog_name}?`)) return;

        try {
            const { regenerateCertificate } = await import('@/lib/pdf-regeneration');
            const result = await regenerateCertificate(dog.registration_number);

            if (result.success) {
                alert(`✅ PDF regenerated for ${dog.registration_number}`);
            } else {
                alert(`❌ Failed: ${result.error}`);
            }
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                <p className="mt-2 text-gray-600">Loading dog data...</p>
            </div>
        );
    }

    if (!dog) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Dog not found</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 text-amber-600 hover:text-amber-800"
                >
                    ← Back to dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6  ">
            {/* Header */}
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 px-6 md:px-8">
                <div>
                    <button
                        onClick={() => router.push('/admin/dashboard')}
                        className="flex items-center text-gray-600 hover:text-gray-800 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Dashboard
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Edit: {dog.dog_name} ({dog.registration_number})
                    </h1>
                    <p className="text-gray-600">Owner: {dog.owner_name} • {dog.owner_email}</p>
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={handleRegeneratePDF}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Regenerate PDF
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Basic Info Card */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dog Name
                        </label>
                        <input
                            type="text"
                            value={formData.dog_name || ''}
                            onChange={(e) => setFormData({ ...formData, dog_name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Breed Description
                        </label>
                        <input
                            type="text"
                            value={formData.breed_description || ''}
                            onChange={(e) => setFormData({ ...formData, breed_description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Gender Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                        </label>
                        <select
                            value={formData.gender || ''}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* Gotcha Day Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gotcha Day
                        </label>
                        <input
                            type="date"
                            value={formData.gotcha_date || ''}
                            onChange={(e) => setFormData({ ...formData, gotcha_date: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Birth Date Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Birth Date
                        </label>
                        <input
                            type="date"
                            value={formData.birth_date || ''}
                            onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Dog Color Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Color
                        </label>
                        <input
                            type="text"
                            value={formData.dog_color || ''}
                            onChange={(e) => setFormData({ ...formData, dog_color: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="e.g., Black & White, Brown, Golden"
                        />
                    </div>

                    {/* Markings/Description Field */}
                    <div className="col-span-2"> {/* Makes this field wider */}
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Markings & Physical Description
                        </label>
                        <textarea
                            value={formData.dog_description || ''}
                            onChange={(e) => setFormData({ ...formData, dog_description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="White paws, brown spot on back, floppy ears..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Owner Name
                        </label>
                        <input
                            type="text"
                            value={formData.owner_name || ''}
                            onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Owner Email
                        </label>
                        <input
                            type="email"
                            value={formData.owner_email || ''}
                            onChange={(e) => setFormData({ ...formData, owner_email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>

            {/* Rescue Story */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Rescue Story</h2>
                <textarea
                    value={formData.rescue_story || ''}
                    onChange={(e) => setFormData({ ...formData, rescue_story: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Current PDF Info */}
            {dog.pdf_url && (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 ">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Current PDF Certificate</h3>
                    <p className="text-blue-700 mb-2">
                        <a
                            href={dog.pdf_url}
                            target="_blank"
                            className="underline hover:text-blue-900"
                        >
                            View current PDF ↗
                        </a>
                    </p>
                    <p className="text-sm text-blue-600">
                        Last updated: {dog.certificate_sent_at ?
                            new Date(dog.certificate_sent_at).toLocaleString() : 'Never'}
                    </p>
                </div>
            )}
        </div>
    );
}