import { createClient } from '@supabase/supabase-js';

// url and anon key
const supabaseUrl = 'https://wffxkpgqylvbiblqlmhe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZnhrcGdxeWx2YmlibHFsbWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwOTA1OTIsImV4cCI6MjA5NTY2NjU5Mn0.lFkfskgSNSdvisU3qEY07Bqr3g46QrFdZpVcOkWrAz8';

// Client initialized
export const supabase = createClient(supabaseUrl, supabaseKey);