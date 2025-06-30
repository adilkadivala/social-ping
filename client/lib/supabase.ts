import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro' | 'enterprise'
  created_at: string
  updated_at: string
}

export interface Keyword {
  id: string
  user_id: string
  keyword: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Mention {
  id: string
  user_id: string
  keyword_id: string
  platform: 'twitter' | 'reddit' | 'linkedin' | 'youtube'
  text: string
  url: string
  author: string
  published_at: string
  is_read: boolean
  sentiment?: 'positive' | 'negative' | 'neutral'
  created_at: string
  keyword?: Keyword
}

export interface MentionStats {
  total: number
  unread: number
  twitter: number
  reddit: number
  linkedin: number
  youtube: number
}