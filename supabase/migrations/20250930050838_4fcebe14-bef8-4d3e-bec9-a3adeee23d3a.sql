-- Create table for karaoke email signups
CREATE TABLE public.karaoke_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.karaoke_emails ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no authentication required)
CREATE POLICY "Anyone can insert karaoke emails" 
ON public.karaoke_emails 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view karaoke emails" 
ON public.karaoke_emails 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_karaoke_emails_updated_at
BEFORE UPDATE ON public.karaoke_emails
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();