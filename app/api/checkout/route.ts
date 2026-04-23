import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Server-side price ID map — client components can't read non-NEXT_PUBLIC_ env vars
const PRICE_MAP: Record<string, string | undefined> = {
  shield: process.env.STRIPE_SHIELD_PRICE_ID,
  rescue: process.env.STRIPE_RESCUE_PRICE_ID,
  bundle: process.env.STRIPE_BUNDLE_PRICE_ID,
}

export async function POST(req: NextRequest) {
  try {
    const { items, email, coupon } = await req.json()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Build line items — use server-side price map, fall back to client-supplied ID
    const lineItems = items.map((item: { id: string; stripePriceId: string; quantity: number }) => ({
      price: PRICE_MAP[item.id] || item.stripePriceId,
      quantity: item.quantity,
    }))

    // Build session params
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      customer_email: email || undefined,
      success_url: `${siteUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'gbp' },
            display_name: 'Free delivery',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 3 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 299, currency: 'gbp' },
            display_name: 'Standard delivery',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 3 },
            },
          },
        },
      ],
      metadata: {
        source: 'neveragainstore.com',
      },
    }

    // Apply coupon if provided
    if (coupon && coupon.trim()) {
      sessionParams.discounts = [{ coupon: coupon.trim().toUpperCase() }]
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe checkout error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
