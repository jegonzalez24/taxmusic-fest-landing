-- Make photos bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'photos';

-- Drop existing RLS policies that require authentication
DROP POLICY IF EXISTS "Users can view their own photos" ON public.photos;
DROP POLICY IF EXISTS "Users can insert their own photos" ON public.photos;
DROP POLICY IF EXISTS "Users can update their own photos" ON public.photos;
DROP POLICY IF EXISTS "Users can delete their own photos" ON public.photos;

DROP POLICY IF EXISTS "Users can view their own photos in storage" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own photos in storage" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own photos in storage" ON storage.objects;

-- Create public policies for photos table
CREATE POLICY "Anyone can view photos" 
ON public.photos 
FOR SELECT 
TO public
USING (true);

CREATE POLICY "Anyone can insert photos" 
ON public.photos 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update photos" 
ON public.photos 
FOR UPDATE 
TO public
USING (true);

CREATE POLICY "Anyone can delete photos" 
ON public.photos 
FOR DELETE 
TO public
USING (true);

-- Create public policies for storage
CREATE POLICY "Anyone can view photos in storage" 
ON storage.objects 
FOR SELECT 
TO public
USING (bucket_id = 'photos');

CREATE POLICY "Anyone can upload photos" 
ON storage.objects 
FOR INSERT 
TO public
WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Anyone can update photos in storage" 
ON storage.objects 
FOR UPDATE 
TO public
USING (bucket_id = 'photos');

CREATE POLICY "Anyone can delete photos in storage" 
ON storage.objects 
FOR DELETE 
TO public
USING (bucket_id = 'photos');

-- Make user_id nullable since we don't require authentication anymore
ALTER TABLE public.photos ALTER COLUMN user_id DROP NOT NULL;