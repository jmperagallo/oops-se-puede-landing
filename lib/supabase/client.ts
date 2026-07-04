// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

console.log("🔧 Inicializando Supabase client...");
console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Anon Key (primeros 10 chars):", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente con permisos de administrador
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);