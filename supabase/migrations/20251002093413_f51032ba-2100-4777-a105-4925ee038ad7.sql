-- Modify contact_submissions table to support anonymous submissions
-- Make email nullable and add phone field
ALTER TABLE public.contact_submissions 
ALTER COLUMN email DROP NOT NULL,
ALTER COLUMN name DROP NOT NULL;

-- Add phone column (nullable for anonymous submissions)
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS phone text;

-- Add comment to document the change
COMMENT ON TABLE public.contact_submissions IS 'Contact form submissions - supports anonymous prayer requests where only message is required';