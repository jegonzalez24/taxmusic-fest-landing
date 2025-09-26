import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://gjppyeolnfekjbkvcbim.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcHB5ZW9sbmZla2pia3ZjYmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDg0OTcsImV4cCI6MjA3NDQ4NDQ5N30.VuwWVdpirac7J0rSgw4zoDn4jiD3dP6MLWsUxkniSrg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});