import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side Supabase client with service role key
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Database Types (shared with client)
export interface User {
  id: string;
  email: string;
  name: string;
  plan: "free" | "pro" | "enterprise";
  created_at: string;
  updated_at: string;
}

export interface Keyword {
  id: string;
  user_id: string;
  keyword: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Mention {
  id: string;
  user_id: string;
  keyword_id: string;
  platform: "twitter" | "reddit" | "linkedin" | "youtube";
  text: string;
  url: string;
  author: string;
  published_at: string;
  is_read: boolean;
  sentiment?: "positive" | "negative" | "neutral";
  created_at: string;
}
