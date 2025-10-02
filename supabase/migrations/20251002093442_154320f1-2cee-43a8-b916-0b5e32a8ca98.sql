-- Add category column to donation_submissions table
ALTER TABLE public.donation_submissions 
ADD COLUMN IF NOT EXISTS category text;

-- Add comment to document the categories
COMMENT ON COLUMN public.donation_submissions.category IS 'Donation category: missions, mf, wwk, youth, teens, children, or change';