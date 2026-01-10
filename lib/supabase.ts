import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isMockMode = !supabaseUrl || !supabaseAnonKey;

if (isMockMode) {
    console.warn("Supabase credentials not found. Utilizing mock mode (some features will be disabled).");
}

export const supabase = isMockMode
    ? null
    : createClient(supabaseUrl!, supabaseAnonKey!);
