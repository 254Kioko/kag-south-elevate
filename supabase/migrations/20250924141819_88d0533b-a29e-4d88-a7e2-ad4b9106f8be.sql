-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donation_submissions table  
CREATE TABLE public.donation_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public inserts but no reads (admin only via service key)
CREATE POLICY "Allow public inserts on contact_submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Allow public inserts on donation_submissions" 
ON public.donation_submissions 
FOR INSERT 
TO anon  
WITH CHECK (true);

-- Create admin read policies (will be used with service key)
CREATE POLICY "Admin can read contact_submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Admin can read donation_submissions" 
ON public.donation_submissions 
FOR SELECT 
TO authenticated
USING (true);