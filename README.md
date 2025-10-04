# KAG South C Church Website

A modern, responsive church website built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 📧 Contact form with email integration
- 💰 M-Pesa online giving integration
- 📊 Admin dashboard for submissions
- 🔒 Secure backend with Supabase

## M-Pesa Integration

This site includes full M-Pesa STK Push integration using Safaricom's Daraja API.

### Setup M-Pesa (Sandbox Testing)

1. **Get Daraja API Credentials:**
   - Visit [Safaricom Daraja Portal](https://developer.safaricom.co.ke/)
   - Create an app to get Consumer Key and Consumer Secret
   - Use sandbox credentials for testing

2. **Configure Supabase Secrets:**
   Navigate to your Supabase project → Settings → Edge Functions → Secrets and add:
   ```
   MPESA_CONSUMER_KEY=your-sandbox-consumer-key
   MPESA_CONSUMER_SECRET=your-sandbox-consumer-secret
   MPESA_SHORTCODE=174379
   MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
   MPESA_ENV=sandbox
   CALLBACK_URL=https://your-project.supabase.co/functions/v1/mpesa-callback
   ```

3. **Test with Sandbox:**
   - Use the test phone number: `254708374149`
   - Test amount: Any amount (e.g., 1, 10, 100)
   - PIN: `174379` (sandbox PIN)

### Production Setup

1. **Get Production Credentials:**
   - Go to Daraja Portal → My Apps → Select your production app
   - Copy your production Consumer Key and Consumer Secret
   - Get your production passkey from the portal

2. **Update Supabase Secrets:**
   ```
   MPESA_CONSUMER_KEY=your-production-consumer-key
   MPESA_CONSUMER_SECRET=your-production-consumer-secret
   MPESA_SHORTCODE=803777
   MPESA_PASSKEY=your-production-passkey
   MPESA_ENV=production
   CALLBACK_URL=https://your-domain.com/functions/v1/mpesa-callback
   ```

3. **Register Your Callback URL:**
   - In Daraja Portal, register your callback URL
   - Use: `https://your-project.supabase.co/functions/v1/mpesa-callback`

### How M-Pesa Integration Works

1. **User Flow:**
   - User fills donation form (name, phone, amount, category)
   - Clicks "Pay with M-Pesa"
   - Receives STK push notification on their phone
   - Enters M-Pesa PIN to complete payment
   - Sees success/failure message

2. **Technical Flow:**
   - Frontend calls `mpesa-stkpush` edge function
   - Edge function authenticates with Daraja API
   - Sends STK push request to user's phone
   - Stores pending transaction in `mpesa_transactions` table
   - M-Pesa sends callback to `mpesa-callback` function
   - Callback updates transaction status in database

3. **Database:**
   - All transactions logged in `mpesa_transactions` table
   - Includes status, receipt numbers, timestamps
   - Viewable in admin dashboard

### Troubleshooting M-Pesa

**"Invalid Access Token":**
- Check your Consumer Key and Secret are correct
- Ensure they match the environment (sandbox/production)

**"The service request has failed":**
- Verify your shortcode matches the environment
- Check passkey is correct for your shortcode

**"Merchant does not exist":**
- You're using production shortcode in sandbox or vice versa
- Set `MPESA_ENV` correctly

**STK push not received:**
- Ensure phone number is in correct format (254XXXXXXXXX)
- Check phone has M-Pesa registered
- Verify network connectivity

**View Logs:**
- Check edge function logs in Supabase dashboard
- Navigate to: Functions → mpesa-stkpush/mpesa-callback → Logs

## Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd kag-south-c
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials

4. **Run development server:**
   ```bash
   npm run dev
   ```

## Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard (only Supabase vars needed)
4. Deploy!

**Important:** M-Pesa credentials should be set in Supabase Edge Function Secrets, NOT in Netlify environment variables.

### Deploy Edge Functions

Edge functions are automatically deployed with your Supabase project. Just push your code!

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Edge Functions)
- **Payment:** M-Pesa Daraja API
- **Hosting:** Netlify
- **Build Tool:** Vite

## Project Structure

```
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── integrations/   # Supabase integration
│   └── hooks/          # Custom React hooks
├── supabase/
│   ├── functions/      # Edge functions
│   │   ├── mpesa-stkpush/    # STK push handler
│   │   └── mpesa-callback/   # Payment callback handler
│   └── migrations/     # Database migrations
└── public/             # Static assets
```

## Database Schema

### Tables

**contact_submissions**
- Stores contact form submissions
- Fields: name, email, phone, message

**donation_submissions**
- Stores donation pledges
- Fields: name, phone, amount, category

**mpesa_transactions**
- Logs all M-Pesa transactions
- Fields: checkout_request_id, phone_number, amount, status, mpesa_receipt_number, etc.

**newsletter_subscriptions**
- Stores newsletter email signups

## Environment Variables

### Frontend (.env)
```bash
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_SUPABASE_URL=https://your-project-id.supabase.co
```

### Supabase Edge Function Secrets
Set these in Supabase Dashboard → Settings → Edge Functions → Secrets:
```bash
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_SHORTCODE=803777  # Your Till Number
MPESA_PASSKEY=your-passkey
MPESA_ENV=sandbox  # or "production"
CALLBACK_URL=https://your-project.supabase.co/functions/v1/mpesa-callback
```

## Testing M-Pesa

### Sandbox Testing
1. Set `MPESA_ENV=sandbox`
2. Use `MPESA_SHORTCODE=174379`
3. Test phone: `254708374149`
4. Test PIN: `174379`

### Production Testing
1. Set `MPESA_ENV=production`
2. Use your actual Till Number (e.g., `803777`)
3. Use real phone numbers
4. Enter actual M-Pesa PIN

## Support

For issues or questions:
- Check the edge function logs in Supabase
- Review the troubleshooting section above
- Contact the development team

## License

This project is licensed under the MIT License.

---

## How can I edit this code?

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/952fa479-d65f-4dbc-a7e2-736e717fac7e) and start prompting.

**Use your preferred IDE**

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```
