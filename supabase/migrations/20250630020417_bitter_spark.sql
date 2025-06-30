/*
  # Initial Schema for SocialPing

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - matches Supabase Auth user ID
      - `email` (text, unique)
      - `name` (text)
      - `plan` (text) - free, pro, enterprise
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `keywords`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `keyword` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `mentions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `keyword_id` (uuid, foreign key to keywords)
      - `platform` (text) - twitter, reddit, linkedin, youtube
      - `text` (text)
      - `url` (text, unique)
      - `author` (text)
      - `published_at` (timestamp)
      - `is_read` (boolean)
      - `sentiment` (text) - positive, negative, neutral
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  plan text NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create keywords table
CREATE TABLE IF NOT EXISTS keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  keyword text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, keyword)
);

-- Create mentions table
CREATE TABLE IF NOT EXISTS mentions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  keyword_id uuid NOT NULL REFERENCES keywords(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('twitter', 'reddit', 'linkedin', 'youtube')),
  text text NOT NULL,
  url text UNIQUE NOT NULL,
  author text NOT NULL,
  published_at timestamptz NOT NULL,
  is_read boolean DEFAULT false,
  sentiment text DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_keywords_user_id ON keywords(user_id);
CREATE INDEX IF NOT EXISTS idx_keywords_active ON keywords(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_mentions_user_id ON mentions(user_id);
CREATE INDEX IF NOT EXISTS idx_mentions_created_at ON mentions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentions_unread ON mentions(user_id, is_read);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create RLS policies for keywords table
CREATE POLICY "Users can read own keywords"
  ON keywords
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own keywords"
  ON keywords
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own keywords"
  ON keywords
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own keywords"
  ON keywords
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for mentions table
CREATE POLICY "Users can read own mentions"
  ON mentions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own mentions"
  ON mentions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_keywords_updated_at
  BEFORE UPDATE ON keywords
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();