import { createClient } from '@supabase/supabase-js';

const URL =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://gcmczxaknboyhutvabyh.supabase.co';
const API_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'sb_publishable_r-R0WxhbQZfS5_IhLcx3uw_5nYWsCpY';

export const CREWMATES_TABLE = import.meta.env.VITE_SUPABASE_TABLE ?? 'Crewmates';
export const supabase = createClient(URL, API_KEY);
