export interface UpdateRequest {
  id: string;
  registration_id: string | null;
  wcu_number: string;
  update_type: "memorial" | "general";
  status: "pending" | "approved" | "rejected";
  requested_data: {
    [key: string]: any;
    // Owner updates
    owner_name?: string | null;
    owner_email?: string | null;

    // Dog basic info
    dog_name?: string | null;
    gender?: string | null;
    birth_date?: string | null;
    gotcha_date?: string | null; // DATABASE COLUMN NAME

    // Breed (combined)
    breed_description?: string | null;

    // Physical description
    dog_color?: string | null;
    dog_description?: string | null;

    // Story fields
    rescue_story?: string | null;
    special_attributes?: string | null; // DATABASE COLUMN NAME
    favorite_activities?: string | null;
    unique_traits?: string | null;

    // Memorial updates
    is_memorial?: boolean;
    memorial_date?: string | null;
    memorial_message?: string | null;
    memorial_favorite_memories?: string | null;

    // Shelter fields
    shelter_name?: string | null;
    shelter_city?: string | null;
    shelter_state?: string | null;
    shelter_website?: string | null;
    location?: string | null;

    // Photo flag
    has_new_photo?: boolean;
  };
  created_at: string;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  admin_notes?: string | null;
  staging_photo_path?: string | null;
}
