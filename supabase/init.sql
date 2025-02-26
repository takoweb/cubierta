-- Create dishes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.dishes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price text,
  category text,
  image text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on dishes table
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.dishes;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.dishes;

-- Create policy for anonymous read access
CREATE POLICY "Allow anonymous read access"
  ON public.dishes
  FOR SELECT
  TO anon
  USING (true);

-- Create policy for authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access"
  ON public.dishes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.settings (
  id integer PRIMARY KEY,
  primary_color text,
  secondary_color text,
  font_family text,
  title_size text,
  text_size text,
  logo text,
  background_image text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on settings table
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Drop existing settings policies
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.settings;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.settings;

-- Create policies for settings table
CREATE POLICY "Allow anonymous read access"
  ON public.settings
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated users full access"
  ON public.settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default settings if they don't exist
INSERT INTO public.settings (id, primary_color, secondary_color, font_family, title_size, text_size)
VALUES (1, '#1a1a1a', '#4a4a4a', 'Inter', '24px', '16px')
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for dishes if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('dishes', 'dishes')
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload" ON storage.objects;

CREATE POLICY "Allow public read access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'dishes');

CREATE POLICY "Allow authenticated users to upload"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'dishes');