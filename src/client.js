import { createClient } from "@supabase/supabase-js";
const supabaseurl = 'https://aigrlgsdtaxhicbspfqs.supabase.co'
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZ3JsZ3NkdGF4aGljYnNwZnFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMTc4NjksImV4cCI6MjAzMjc5Mzg2OX0.9JfpozFSgXpu5_uMN06oK5-Oq6uD2NYclcluDtJFvL8'
export const supabase = createClient(supabaseurl,supabasekey)