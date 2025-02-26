-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create dishes table
CREATE TABLE IF NOT EXISTS public.dishes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price text,
  category text,
  image text,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable RLS
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON public.dishes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated create"
  ON public.dishes FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Settings table
CREATE TABLE IF NOT EXISTS public.settings (
  id integer PRIMARY KEY,
  primary_color text,
  secondary_color text,
  font_family text,
  title_size text,
  text_size text,
  logo text,
  background_image text,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON public.settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated create"
  ON public.settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Storage setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('dishes', 'dishes', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'dishes');

CREATE POLICY "Allow authenticated create"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'dishes');