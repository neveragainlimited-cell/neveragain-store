import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const { items, email, coupon } = await req.json()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Build line items for Stripe
    const lineItems = items.map((item: { stripePriceId: string; quantity: number }) => ({
      price: item.stripePriceId,
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
