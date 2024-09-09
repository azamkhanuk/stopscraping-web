# stopscraping.me

## Protect Your Website from AI Scrapers

stopscraping.me is a service that provides an always-updated list of AI scrapers' IPs to block, helping you protect your website from unwanted scraping by AI companies like OpenAI and others.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/UI - components
- Clerk (Authentication)
- Stripe (Payments)
- Supabase (Database)
- Vercel (Hosting and Serverless Functions)

### Services & Infra

- Node.js (v14 or later)
- npm
- Clerk (Authentication  - Test and Prod)
- Stripe (Test and Prod)
- Supabase - PostgresSQL (Database)
- Vercel
  - Serverless Functions
  - Cron Job - `/api/check-subscription-status`

### Environment Setup
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_BASIC_PRICE_ID=your_stripe_basic_plan_price_id
   ```


## API Endpoints

- `/api/create-checkout-session`: Creates a Stripe checkout session for subscription
- `/api/verify-payment`: Verifies a completed Stripe payment
- `/api/get-subscription`: Retrieves subscription details for a user
- `/api/cancel-subscription`: Cancels a user's subscription
- `/api/check-subscription-status`: Checks and updates a user's subscription status (cron job)