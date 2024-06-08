// @ts-ignore
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.SECRET_SUPABASE_PROJECT_URL, process.env.SECRET_SUPABASE_ANON_KEY);