-- Create newsletter subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for newsletter subscriptions
CREATE POLICY "Admin can read newsletter_subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public inserts on newsletter_subscriptions" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);