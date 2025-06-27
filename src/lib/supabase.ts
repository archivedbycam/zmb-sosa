import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbgzksdlklskdhweigub.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZ3prc2Rsa2xza2Rod2VpZ3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NDE2NjAsImV4cCI6MjA2NjUxNzY2MH0.gaddUZgCVpYUHQBVFIx-PpNpgwBRSJQzl_l-udyDNvs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 