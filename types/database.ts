export interface Registration {
  id: string;
  registration_number: string;
  dog_name: string;
  owner_name: string;
  owner_email: string; // Keep in type but won't display
  birth_date: string | null;
  location: string | null;
  breed_description: string | null;
  rescue_story: string | null;
  photo_url: string | null;
  status: string;
  pdf_url: string | null;
  created_at: string;
  dog_description: string | null;
  special_attributes: string | null;
  favorite_activities: string | null;
  unique_traits: string | null;
  gotcha_date: string | null;
  shelter_name: string | null;
  shelter_city: string | null;
  shelter_state: string | null;
  shelter_website: string | null;
  certificate_generated_at: string | null;
  dog_color: string | null;
  gender: string | null;
  is_memorial?: boolean;
  memorial_date?: string | null;
}
