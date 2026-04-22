# Never Again Store — Setup Guide

## Step 1: Install Node.js
Download and install from nodejs.org (the LTS version). This is the engine that runs the site.

## Step 2: Install dependencies
Open Terminal, navigate to this folder, and run:
```
npm install
```

## Step 3: Add your product images
Put these files inside the `public/images/` folder:
- `shield.png` — your Shield product photo (use the Amazon images)
- `rescue.png` — your Rescue product photo
- `bundle.png` — both products together

## Step 4: Set up your environment variables
1. Copy `.env.example` to a new file called `.env.local`
2. Fill in the values (see Stripe setup below)

## Step 5: Set up Stripe
1. Go to stripe.com and create an account
2. From your dashboard, get your API keys (Publishable key + Secret key)
3. Create 3 products in Stripe:
   - Never Again Shield — price: £19.99
   - Never Again Rescue — price: £19.99
   - The Never Again System (Bundle) — price: £29.99
4. Copy each product's Price ID into your `.env.local`
5. Create a coupon code called `FIRST10` for 10% off (one-time use)

## Step 6: Run locally (test it)
```
npm run dev
```
Open http://localhost:3000 in your browser.

## Step 7: Deploy to Vercel
1. Go to vercel.com and create a free account
2. Connect your GitHub account (or drag-drop the folder)
3. Add your environment variables in Vercel's dashboard
4. Deploy — Vercel gives you a live URL instantly

## Step 8: Connect your domain
1. Buy `neveragainstore.co.uk` from Namecheap or GoDaddy (~£10/year)
2. In Vercel, go to Settings → Domains → Add your domain
3. Follow Vercel's instructions to update your DNS settings
4. Done — your site is live at neveragainstore.co.uk

---

## Questions?
Email Mike or ask Claude to help with any step.
