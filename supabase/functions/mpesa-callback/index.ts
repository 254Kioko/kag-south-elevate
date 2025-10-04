import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
      const checkoutRequestId = stkCallback.CheckoutRequestID;
      
      if (stkCallback.ResultCode === 0) {
        // Transaction successful - extract metadata
        const metadata = stkCallback.CallbackMetadata?.Item || [];
        const amount = metadata.find((item: any) => item.Name === 'Amount')?.Value;
        const mpesaReceiptNumber = metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
        const transactionDate = metadata.find((item: any) => item.Name === 'TransactionDate')?.Value;
        const phoneNumber = metadata.find((item: any) => item.Name === 'PhoneNumber')?.Value;

        console.log('Transaction successful:', {
          merchantRequestId: stkCallback.MerchantRequestID,
          checkoutRequestId,
          mpesaReceiptNumber,
          amount,
          phoneNumber,
          transactionDate,
        });

        // Update transaction in database
        const { error: updateError } = await supabase
          .from('mpesa_transactions')
          .update({
            status: 'success',
            result_code: stkCallback.ResultCode,
            result_desc: stkCallback.ResultDesc,
            mpesa_receipt_number: mpesaReceiptNumber,
            transaction_date: transactionDate,
            callback_data: callbackData
          })
          .eq('checkout_request_id', checkoutRequestId);

        if (updateError) {
          console.error('Failed to update transaction:', updateError);
        } else {
          console.log('Transaction updated successfully in database');
        }
      } else {
        // Transaction failed
        console.log('Transaction failed:', {
          merchantRequestId: stkCallback.MerchantRequestID,
          checkoutRequestId,
          resultCode: stkCallback.ResultCode,
          resultDesc: stkCallback.ResultDesc,
        });

        // Update transaction status to failed
        const { error: updateError } = await supabase
          .from('mpesa_transactions')
          .update({
            status: 'failed',
            result_code: stkCallback.ResultCode,
            result_desc: stkCallback.ResultDesc,
            callback_data: callbackData
          })
          .eq('checkout_request_id', checkoutRequestId);

        if (updateError) {
          console.error('Failed to update failed transaction:', updateError);
        }
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
