-- Update RLS policies to allow anonymous reads for admin dashboard
-- These policies are for admin dashboard functionality

-- Drop existing policies and recreate them with explicit anonymous access
DROP POLICY IF EXISTS "Admin can read contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admin can read donation_submissions" ON donation_submissions;

-- Create new policies that explicitly allow anonymous reads
CREATE POLICY "Allow anonymous reads for admin dashboard" 
ON contact_submissions 
FOR SELECT 
USING (true);

CREATE POLICY "Allow anonymous reads for admin dashboard" 
ON donation_submissions 
FOR SELECT 
USING (true);