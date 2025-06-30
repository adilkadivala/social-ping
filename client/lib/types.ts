// Shared types between client and server
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
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
  keyword?: { keyword: string };
  platform: 'twitter' | 'reddit' | 'linkedin' | 'youtube';
  text: string;
  url: string;
  author: string;
  published_at: string;
  is_read: boolean;
  sentiment?: 'positive' | 'negative' | 'neutral';
  created_at: string;
}