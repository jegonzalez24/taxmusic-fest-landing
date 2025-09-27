-- Drop existing restrictive RLS policies
DROP POLICY IF EXISTS "Users can view their own photos" ON public.photos;
DROP POLICY IF EXISTS "Users can insert their own photos" ON public.photos;
DROP POLICY IF EXISTS "Users can update their own photos" ON public.photos;
DROP POLICY IF EXISTS "Users can delete their own photos" ON public.photos;
DROP POLICY IF EXISTS "Users can view their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own photos" ON storage.objects;

-- Create public access policies for photos table
CREATE POLICY "Anyone can view photos" 
ON public.photos 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert photos" 
ON public.photos 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update photos" 
ON public.photos 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete photos" 
ON public.photos 
FOR DELETE 
USING (true);

-- Create public access policies for storage
CREATE POLICY "Anyone can view photos in storage" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'photos');

CREATE POLICY "Anyone can upload photos to storage" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Anyone can update photos in storage" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'photos');

CREATE POLICY "Anyone can delete photos from storage" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'photos');