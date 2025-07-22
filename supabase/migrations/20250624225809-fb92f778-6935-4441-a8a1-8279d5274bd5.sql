
-- Create a public profiles table to store user ranking data
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  display_name TEXT NOT NULL DEFAULT 'Aventureiro',
  level INTEGER NOT NULL DEFAULT 1,
  total_xp INTEGER NOT NULL DEFAULT 0,
  weekly_xp INTEGER NOT NULL DEFAULT 0,
  last_xp_update TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy to allow all users to view all profiles (for ranking)
CREATE POLICY "Allow read access to all user profiles" 
  ON public.user_profiles 
  FOR SELECT 
  USING (true);

-- Policy to allow users to update only their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.user_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" 
  ON public.user_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Function to reset weekly XP every Monday
CREATE OR REPLACE FUNCTION reset_weekly_xp()
RETURNS void AS $$
BEGIN
  UPDATE public.user_profiles 
  SET weekly_xp = 0, 
      updated_at = now()
  WHERE EXTRACT(DOW FROM now()) = 1; -- Monday = 1
END;
$$ LANGUAGE plpgsql;

-- Create index for better performance on ranking queries
CREATE INDEX idx_user_profiles_total_xp ON public.user_profiles(total_xp DESC);
CREATE INDEX idx_user_profiles_weekly_xp ON public.user_profiles(weekly_xp DESC);
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
