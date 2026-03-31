import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://xumlcfkmrlbwarbarpha.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1bWxjZmttcmxid2FyYmFycGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NzYzMjQsImV4cCI6MjA5MDU1MjMyNH0.wMmmgFAyn6wyT7eypco_utOvY9MzFBT7MQlBaf4oB9o";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
