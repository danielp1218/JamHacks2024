import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase-types';

export const supabase = createClient<Database>(process.env.SECRET_SUPABASE_PROJECT_URL!, process.env.SECRET_SUPABASE_ANON_KEY!);