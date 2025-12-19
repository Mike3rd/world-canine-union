// /app/update-form/UpdateForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import SuccessState from './components/SuccessState';
import FormHeader from './components/FormHeader';
import OwnerInfoSection from './components/OwnerInfoSection';
import DogInfoSection from './components/DogInfoSection';
import MemorialSection from './components/MemorialSection';
import SubmitSection from './components/SubmitSection';
import ShelterInfoSection from './components/ShelterInfoSection';

interface UpdateFormProps {
    token?: string | null;
}

export default function UpdateForm({ token }: UpdateFormProps) {
    const router = useRouter();


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dogData, setDogData] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [reportPassing, setReportPassing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('No update token provided. Please use the link from your email.');
            setLoading(false);
            return;
        }
        validateTokenAndLoadData();
    }, [token]);

    const validateTokenAndLoadData = async () => {
        try {
            // 1. Validate token - FIRST check if token exists
            // 1. Validate token
            const { data: tokenData, error: tokenError } = await supabase
                .from('update_tokens')
                .select('*')
                .eq('token', token)
                .eq('used', false)
                .single();

            if (tokenError) {
                console.error('Token validation error:', tokenError);

                if (tokenError.code === 'PGRST116') {
                    setError('Update link not found or already used. Please request a new update link.');
                } else {
                    setError('Invalid update link. Please try again or request a new link.');
                }

                setLoading(false);
                return;
            }

            // Check expiration
            const expiresAt = new Date(tokenData.expires_at);
            const now = new Date();
            if (expiresAt <= now) {
                setError('This update link has expired. Please request a new update link.');
                setLoading(false);
                return;
            }

            // 2. Load dog data
            const { data: dog, error: dogError } = await supabase
                .from('registrations')
                .select('*')
                .eq('registration_number', tokenData.registration_number)
                .single();

            if (dogError || !dog) {
                setError('Dog record not found.');
                setLoading(false);
                return;
            }

            setDogData(dog);

            // 3. Initialize form data with current values
            // Helper function to split breed description
            const splitBreedDescription = (breedDesc: string) => {
                if (!breedDesc) return { primaryBreed: '', secondaryBreed: '', tertiaryBreed: '' };

                const breeds = breedDesc.split(' + ').map(breed => breed.trim());
                return {
                    primaryBreed: breeds[0] || '',
                    secondaryBreed: breeds[1] || '',
                    tertiaryBreed: breeds[2] || ''
                };
            };

            const breedFields = splitBreedDescription(dog.breed_description || '');


            const initialFormData = {
                // Owner fields
                ownerName: dog.owner_name || '',
                owner_email: dog.owner_email || '',

                // Dog basic info - EXACT COLUMN NAMES
                dogName: dog.dog_name || '',
                gender: dog.gender || '',
                birthDate: dog.birth_date ? dog.birth_date.split('T')[0] : '',
                gotchaDay: dog.gotcha_date ? dog.gotcha_date.split('T')[0] : '', // Note: gotcha_date, not gotcha_day

                // Breed fields (split)
                primaryBreed: breedFields.primaryBreed,
                secondaryBreed: breedFields.secondaryBreed,
                tertiaryBreed: breedFields.tertiaryBreed,

                // Physical description
                dogColor: dog.dog_color || '',
                dogDescription: dog.dog_description || '',

                // Story fields - EXACT COLUMN NAMES
                dogStory: dog.rescue_story || '',
                specialAttributes: dog.special_attributes || '', // Note: special_attributes, not special_qualities
                favoriteActivities: dog.favorite_activities || '',
                uniqueTraits: dog.unique_traits || '',

                // Memorial fields
                memorial_date: dog.memorial_date ? dog.memorial_date.split('T')[0] : '',
                memorial_message: dog.memorial_message || '',
                memorial_favorite_memories: dog.memorial_favorite_memories || '',
                // Shelter fields
                shelterName: dog.shelter_name || '',
                shelterCity: dog.shelter_city || '',
                shelterState: dog.shelter_state || '',
                shelterWebsite: dog.shelter_website || '',
                rescueLocation: dog.location || '', // Note: 'location' column in DB
            };

            setFormData(initialFormData);
            setReportPassing(dog.is_memorial || false);
            setLoading(false);

        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load dog information. Please try again.');
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Combine breed fields back for database
            const breedDescription = [
                formData.primaryBreed?.trim(),
                formData.secondaryBreed?.trim(),
                formData.tertiaryBreed?.trim()
            ]
                .filter(breed => breed && breed.length > 0)
                .join(' + ');


            const updateData = {
                // Owner updates
                owner_name: formData.ownerName || null,
                owner_email: formData.owner_email || null,

                // Dog basic info
                dog_name: formData.dogName || null,
                gender: formData.gender || null,
                birth_date: formData.birthDate || null,
                gotcha_date: formData.gotchaDay || null, // Map to gotcha_date

                // Breed (combined)
                breed_description: breedDescription || null,

                // Physical description
                dog_color: formData.dogColor || null,
                dog_description: formData.dogDescription || null,

                // Story fields
                rescue_story: formData.dogStory || null,
                special_attributes: formData.specialAttributes || null, // Map to special_attributes
                favorite_activities: formData.favoriteActivities || null,
                unique_traits: formData.uniqueTraits || null,

                // Memorial updates
                is_memorial: reportPassing,
                memorial_date: reportPassing ? formData.memorial_date : null,
                memorial_message: reportPassing ? formData.memorial_message : null,
                memorial_favorite_memories: reportPassing ? formData.memorial_favorite_memories : null,
                // Shelter fields
                shelter_name: formData.shelterName || null,
                shelter_city: formData.shelterCity || null,
                shelter_state: formData.shelterState || null,
                shelter_website: formData.shelterWebsite || null,
                location: formData.rescueLocation || null, // Map to 'location' column
            };

            const { error: insertError } = await supabase
                .from('update_requests')
                .insert({
                    wcu_number: dogData.registration_number,
                    update_type: reportPassing ? 'memorial' : 'general', // FIXED: 'memorial' or 'general'
                    requested_data: updateData,
                    status: 'pending'
                });

            if (insertError) throw insertError;

            await supabase
                .from('update_tokens')
                .update({
                    used: true,
                    accessed_at: new Date().toISOString()
                })
                .eq('token', token);

            setSuccess(true);

        } catch (err) {
            console.error('Submission error:', err);
            setError('Failed to submit update request. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <LoadingState dogName={dogData?.dog_name} />;
    if (error) return <ErrorState error={error} router={router} />;
    if (success) return <SuccessState dogData={dogData} router={router} />;

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-8">
                <FormHeader dogData={dogData} />
                <OwnerInfoSection formData={formData} handleChange={handleChange} />
                <DogInfoSection formData={formData} handleChange={handleChange} />
                <ShelterInfoSection
                    formData={formData}
                    handleChange={handleChange}
                />
                <MemorialSection
                    reportPassing={reportPassing}
                    setReportPassing={setReportPassing}
                    formData={formData}
                    handleChange={handleChange}
                />
                <SubmitSection submitting={submitting} />
            </form>
        </div>
    );
}