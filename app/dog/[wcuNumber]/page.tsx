// app/dog/[wcuNumber]/page.tsx - SIMPLIFIED VERSION
import { supabase } from "@/lib/supabase"
import { notFound } from 'next/navigation'
import LivingProfile from './components/living/LivingProfile'
import { Registration } from '../../../types/database'
import '../dog-profile.css'

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
      created_at
    `)
        .eq('registration_number', searchNumber)
        .single()

    if (error || !registration) {
        notFound()
    }

    // For now, always show living profile
    // Later we'll check: if (registration.is_memorial) return <MemorialProfile />

    return <LivingProfile registration={registration as Registration} />
}