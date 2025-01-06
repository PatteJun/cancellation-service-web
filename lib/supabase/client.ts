import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://ftkmkmjmisjutrmlbrrj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0a21rbWptaXNqdXRybWxicnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMDIyMTAsImV4cCI6MjA1MTU3ODIxMH0.VGPW4l9ImJVdjvUVZxG2EKky8AoBT4piVbRJn3VvUOM';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});