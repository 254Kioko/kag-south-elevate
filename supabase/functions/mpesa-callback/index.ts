import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const callbackData = await req.json();
    
    console.log('M-Pesa callback received:', JSON.stringify(callbackData, null, 2));

    // M-Pesa sends callback data in this format:
    // {
    //   Body: {
    //     stkCallback: {
    //       MerchantRequestID: string,
    //       CheckoutRequestID: string,
    //       ResultCode: number,
    //       ResultDesc: string,
    //       CallbackMetadata?: {
    //         Item: [
    //           { Name: 'Amount', Value: number },
    //           { Name: 'MpesaReceiptNumber', Value: string },
    //           { Name: 'TransactionDate', Value: number },
    //           { Name: 'PhoneNumber', Value: number }
    //         ]
    //       }
    //     }
    //   }
    // }

    const stkCallback = callbackData?.Body?.stkCallback;

    if (stkCallback) {
      if (stkCallback.ResultCode === 0) {
        console.log('Transaction successful:', {
          merchantRequestId: stkCallback.MerchantRequestID,
          checkoutRequestId: stkCallback.CheckoutRequestID,
          resultDesc: stkCallback.ResultDesc,
          metadata: stkCallback.CallbackMetadata,
        });

        // You can store this in your database here
        // For now, just logging it
      } else {
        console.log('Transaction failed:', {
          merchantRequestId: stkCallback.MerchantRequestID,
          checkoutRequestId: stkCallback.CheckoutRequestID,
          resultCode: stkCallback.ResultCode,
          resultDesc: stkCallback.ResultDesc,
        });
      }
    }

    // Always return 200 OK to M-Pesa
    return new Response(
      JSON.stringify({ ResultCode: 0, ResultDesc: 'Success' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in mpesa-callback function:', error);
    
    // Still return 200 to M-Pesa so they don't retry
    return new Response(
      JSON.stringify({ ResultCode: 0, ResultDesc: 'Success' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
