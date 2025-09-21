// Does your file look EXACTLY like this?

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log("Supabase URL from server:", supabaseUrl);
console.log("Supabase Key from server:", supabaseKey ? "Key Found" : "Key NOT Found");

export const supabase = createClient(supabaseUrl, supabaseKey);