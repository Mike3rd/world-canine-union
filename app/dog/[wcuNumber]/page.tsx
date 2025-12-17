// app/dog/[wcuNumber]/page.tsx - SIMPLIFIED VERSION
import { supabase } from "@/lib/supabase"
import { notFound } from 'next/navigation'
import LivingProfile from './components/living/LivingProfile'
import MemorialProfile from './components/memorial/MemorialProfile'
import { Registration } from '../../../types/database'
import '../dog-profile.css'
import '../memorial-profile.css'

export default async function DogProfilePage({
    params,
}: {
    params: Promise<{ wcuNumber: string }>
}) {
    const { wcuNumber } = await params

    const searchNumber = wcuNumber.toUpperCase()

    // Fetch all registration data
    const { data: registration, error } = await supabase
        .from('registrations')
        .select(`
      id,
      registration_number,
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
      memorial_date
    `)
        .eq('registration_number', searchNumber)
        .single()

    if (error || !registration) {
        notFound()
    }

    // TEMPORARY DEBUG - Add this line
    console.log('DEBUG:', {
        wcuNumber: registration.registration_number,
        name: registration.dog_name,
        isMemorial: registration.is_memorial,
        memorialDate: registration.memorial_date
    })

    if (registration.is_memorial) {
        // You'll need to import MemorialProfile
        // import MemorialProfile from './components/memorial/MemorialProfile'
        return <MemorialProfile registration={registration as Registration} />
    }

    return <LivingProfile registration={registration as Registration} />
}