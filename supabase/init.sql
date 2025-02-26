-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create dishes table
CREATE TABLE IF NOT EXISTS public.dishes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT,
    category TEXT,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
    id INTEGER PRIMARY KEY,
    primary_color TEXT,
    secondary_color TEXT,
    font_family TEXT,
    title_size TEXT,
    text_size TEXT,
    logo TEXT,
    background_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('dishes', 'dishes', true),
    ('settings', 'settings', true)
ON CONFLICT DO NOTHING;

-- Enable row level security but allow all operations
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies for dishes
CREATE POLICY "Allow public read access"
    ON public.dishes FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated insert"
    ON public.dishes FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
    ON public.dishes FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated delete"
    ON public.dishes FOR DELETE
    TO authenticated
    USING (true);

-- Create policies for settings
CREATE POLICY "Allow public read access"
    ON public.settings FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated insert"
    ON public.settings FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
    ON public.settings FOR UPDATE
    TO authenticated
    USING (true);

-- Create policies for storage
CREATE POLICY "Allow public read access"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id IN ('dishes', 'settings'));

CREATE POLICY "Allow authenticated insert"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id IN ('dishes', 'settings'));

CREATE POLICY "Allow authenticated update"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id IN ('dishes', 'settings'));

CREATE POLICY "Allow authenticated delete"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id IN ('dishes', 'settings'));