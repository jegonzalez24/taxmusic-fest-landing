-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photos', 'photos', true);

-- Create table for photo metadata
CREATE TABLE public.photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for photos table
CREATE POLICY "Users can view their own photos" 
ON public.photos 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own photos" 
ON public.photos 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos" 
ON public.photos 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photos" 
ON public.photos 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for storage
CREATE POLICY "Users can view their own photos in storage" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own photos in storage" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own photos in storage" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to automatically update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_photos_updated_at
BEFORE UPDATE ON public.photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();