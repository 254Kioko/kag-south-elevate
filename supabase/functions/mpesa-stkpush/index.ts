import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// M-Pesa credentials
const CONSUMER_KEY = Deno.env.get('MPESA_CONSUMER_KEY');
const CONSUMER_SECRET = Deno.env.get('MPESA_CONSUMER_SECRET');
const BUSINESS_SHORT_CODE = '803777';
const PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; // Sandbox passkey
const CALLBACK_URL = 'https://ttsfulgsmhhynxvjtnpr.supabase.co/functions/v1/mpesa-callback';

// Switch between sandbox and production
const IS_SANDBOX = true;
const AUTH_URL = IS_SANDBOX 
  ? 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
  : 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
const STK_PUSH_URL = IS_SANDBOX
  ? 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
  : 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

// Get M-Pesa access token
async function getAccessToken(): Promise<string> {
  const auth = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
  
  const response = await fetch(AUTH_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Error getting access token:', error);
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Format phone number to 2547XXXXXXXX format
function formatPhoneNumber(phone: string): string {
  // Remove any spaces, dashes, or other characters
  phone = phone.replace(/\D/g, '');
  
  // If starts with 0, replace with 254
  if (phone.startsWith('0')) {
    return '254' + phone.substring(1);
  }
  
  // If starts with +254, remove the +
  if (phone.startsWith('+254')) {
    return phone.substring(1);
  }
  
  // If starts with 254, return as is
  if (phone.startsWith('254')) {
    return phone;
  }
  
  // Default: assume it's a local number without prefix
  return '254' + phone;
}

// Generate timestamp in format YYYYMMDDHHmmss
function generateTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// Generate password
function generatePassword(timestamp: string): string {
  const str = `${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`;
  return btoa(str);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, amount, category } = await req.json();

    console.log('STK Push request received:', { phone, amount, category });

    // Validate inputs
    if (!phone || !amount) {
      return new Response(
        JSON.stringify({ error: 'Phone number and amount are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format phone number
    const formattedPhone = formatPhoneNumber(phone);
    console.log('Formatted phone:', formattedPhone);

    // Get access token
    const accessToken = await getAccessToken();
    console.log('Access token obtained');

    // Generate timestamp and password
    const timestamp = generateTimestamp();
    const password = generatePassword(timestamp);

    // Prepare STK Push request
    const stkPushPayload = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount), // M-Pesa accepts whole numbers
      PartyA: formattedPhone,
      PartyB: BUSINESS_SHORT_CODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: category || 'Donation',
      TransactionDesc: `${category || 'Donation'} - KAG South C`,
    };

    console.log('Sending STK Push request:', stkPushPayload);

    // Send STK Push request
    const stkResponse = await fetch(STK_PUSH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPushPayload),
    });

    const stkData = await stkResponse.json();
    console.log('STK Push response:', stkData);

    if (!stkResponse.ok) {
      return new Response(
        JSON.stringify({ 
          error: 'Failed to initiate STK Push',
          details: stkData 
        }),
        { status: stkResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if request was successful
    if (stkData.ResponseCode === '0') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'STK Push sent successfully. Please check your phone.',
          checkoutRequestId: stkData.CheckoutRequestID,
          merchantRequestId: stkData.MerchantRequestID,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: stkData.ResponseDescription || 'Failed to send STK Push',
          details: stkData,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error: any) {
    console.error('Error in mpesa-stkpush function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.toString(),
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
