// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

// 🔥 HARDCODEADO TEMPORALMENTE PARA AVANZAR
const supabaseUrl = 'https://ysgnioqdjedudakgreuc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzZ25pb3FkamVkdWRha2dyZXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMzY2NjEsImV4cCI6MjA5ODYxMjY2MX0.VTl83IHllu_QHityCc28s7ornTzgAMs8Aqf6h93KAoI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzZ25pb3FkamVkdWRha2dyZXVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzAzNjY2MSwiZXhwIjoyMDk4NjEyNjYxfQ.6oFUfZ6ydEk_QwJzvZ6e-SpEFOyKSY_w9q4j_gfTr8E'
);

// ✅ Exportar la URL para usarla en otros archivos
export { supabaseUrl };