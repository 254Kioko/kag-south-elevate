-- Create mpesa_transactions table to log all M-Pesa transactions
CREATE TABLE public.mpesa_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- STK Push request data
  merchant_request_id TEXT,
  checkout_request_id TEXT NOT NULL UNIQUE,
  
  -- Transaction details
  phone_number TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  category TEXT,
  
  -- M-Pesa callback response
  result_code INTEGER,
  result_desc TEXT,
  mpesa_receipt_number TEXT,
  transaction_date BIGINT,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
  
  -- Raw callback data for debugging
  callback_data JSONB
);

-- Enable Row Level Security
ALTER TABLE public.mpesa_transactions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (from edge function)
CREATE POLICY "Allow edge function to insert transactions"
ON public.mpesa_transactions
FOR INSERT
WITH CHECK (true);

-- Allow public reads for admin dashboard
CREATE POLICY "Allow anonymous reads for admin dashboard"
ON public.mpesa_transactions
FOR SELECT
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_mpesa_transactions_checkout_request_id ON public.mpesa_transactions(checkout_request_id);
CREATE INDEX idx_mpesa_transactions_phone_number ON public.mpesa_transactions(phone_number);
CREATE INDEX idx_mpesa_transactions_status ON public.mpesa_transactions(status);
CREATE INDEX idx_mpesa_transactions_created_at ON public.mpesa_transactions(created_at DESC);