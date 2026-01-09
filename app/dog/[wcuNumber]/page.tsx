// app/dog/[wcuNumber]/page.tsx
import { Metadata } from 'next';
import { supabase } from "@/lib/supabase"
import { notFound } from 'next/navigation'
import LivingProfile from './components/living/LivingProfile'
import MemorialProfile from './components/memorial/MemorialProfile'
import { Registration } from '../../../types/database'
import '../dog-profile.css'
import '../memorial-profile.css'
import { cache } from 'react' // Add this import

// SHARED, CACHED FETCH FUNCTION
const getDogRegistration = cache(async (wcuNumber: string) => {
    const searchNumber = wcuNumber.toUpperCase();

    const { data, error } = await supabase
        .from('registrations')
        .select(`
            id,
            registration_number,
            owner_name,
            dog_name,
            birth_date,
            location,
            breed_description,
            rescue_story,
            photo_url,
            pdf_url,
            dog_description,
            special_attributes,
            favorite_activities,
            unique_traits,
            gotcha_date,
            shelter_name,
            shelter_city,
            shelter_state,
            shelter_website,
            dog_color,
            gender,
            created_at,
            is_memorial,
            memorial_date,
            memorial_message,
            memorial_favorite_memories,
            is_spotlight,
            spotlight_reason,
            spotlight_expires_at
        `)
        .eq('registration_number', searchNumber)
        .single();

    return { data, error };
});

// Metadata generation
export async function generateMetadata({
    params
}: {
    params: Promise<{ wcuNumber: string }>
}): Promise<Metadata> {
    const { wcuNumber } = await params;

    const { data: registration } = await getDogRegistration(wcuNumber);

    if (!registration) {
        return {
            title: 'Dog Profile - World Canine Union',
            description: 'View this dog\'s profile on the World Canine Union registry.',
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://worldcanineunion.org';

    // Handle photo_url - ensure it's absolute
    let dogImageUrl: string;

    if (registration.photo_url) {
        // If it's already an absolute URL, use it
        if (registration.photo_url.startsWith('http')) {
            dogImageUrl = registration.photo_url;
        } else {
            // If it's a relative path, prepend baseUrl
            dogImageUrl = `${baseUrl}${registration.photo_url.startsWith('/') ? '' : '/'}${registration.photo_url}`;
        }
    } else {
        // Fallback image
        dogImageUrl = `${baseUrl}/images/default-dog-share.jpg`;
    }

    const dogPageUrl = `${baseUrl}/dog/${wcuNumber}`;

    return {
        title: `${registration.dog_name}'s WCU Profile`,
        description: `Meet ${registration.dog_name}${registration.breed_description ? `, a ${registration.breed_description}` : ''} registered with the World Canine Union.`,

        openGraph: {
            title: `${registration.dog_name}'s WCU Profile`,
            description: `Meet ${registration.dog_name}, a unique dog registered with the World Canine Union.`,
            images: [
                {
                    url: dogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: `Photo of ${registration.dog_name}`,
                },
            ],
            url: dogPageUrl,
            type: 'website',
        },

        twitter: {
            card: 'summary_large_image',
            title: `${registration.dog_name}'s WCU Profile`,
            description: `Meet ${registration.dog_name}, registered with the World Canine Union.`,
            images: [dogImageUrl],
        },

        alternates: {
            canonical: dogPageUrl,
        },
    };
}

// Page component
export default async function DogProfilePage({
    params,
}: {
    params: Promise<{ wcuNumber: string }>
}) {
    const { wcuNumber } = await params;

    const { data: registration, error } = await getDogRegistration(wcuNumber);

    if (error || !registration) {
        notFound();
    }

    if (registration.is_memorial) {
        return <MemorialProfile registration={registration as Registration} wcuNumber={wcuNumber} />
    }

    return <LivingProfile registration={registration as Registration} wcuNumber={wcuNumber} />
}