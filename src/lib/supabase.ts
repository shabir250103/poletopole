import { createClient } from '@supabase/supabase-js';

// Clean the URL if it contains the "/rest/v1/" suffix
const rawUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "https://wybilkdgddqkxmivmtgy.supabase.co/rest/v1/";
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "");

const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "sb_publishable_0WmqptGJogpV7K5kZ09DUg_IeTq3Y1-";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabasePackage {
  id: string;
  category: 'international' | 'domestic';
  name: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  highlights: string[];
  hotels: string;
  flight_included: boolean;
  meals_included: boolean;
  guides_included: boolean;
  visa_assistance: boolean;
  tags: string[];
}

export interface SupabaseBooking {
  id?: string;
  name: string;
  destination: string;
  budget: string;
  number_of_days: string;
  number_of_persons: string;
  created_at?: string;
}

export interface SupabaseReview {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  text: string;
  date: string;
  verified: boolean;
  created_at?: string;
}
