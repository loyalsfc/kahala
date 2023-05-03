import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cazztwpzenjsgsddjnsb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhenp0d3B6ZW5qc2dzZGRqbnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzNzI4OTcsImV4cCI6MTk5Nzk0ODg5N30.sIitEAswga39hyNeDCKtqpCJ1YHEydKSVE4r1iaG25E";
export const supabase = createClient(supabaseUrl, supabaseKey);