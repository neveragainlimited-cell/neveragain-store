import { NextRequest, NextResponse } from 'next/server'

const DISCOUNT_CODE = process.env.NEXT_PUBLIC_DISCOUNT_CODE || 'FIRST10'
const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'info@neveragainstore.com'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Send notification email to Mike so no subscriber is ever lost
    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Never Again <noreply@neveragainstore.com>',
          to: [NOTIFY_EMAIL],
          subject: `New subscriber: ${email}`,
          html: `
            <p><strong>New email signup on neveragainstore.com</strong></p>
            <p>Email: <strong>${email}</strong></p>
            <p>Discount code sent: <strong>${DISCOUNT_CODE}</strong></p>
            <p>Time: ${new Date().toISOString()}</p>
            <hr/>
            <p style="color:#888;font-size:12px;">Add this email to your Klaviyo list manually, or connect the Klaviyo API (see dtc-strategy.md).</p>
          `,
        }),
      })
    } else {
      // Fallback: log to console so it shows in Vercel logs
      console.log(`[SUBSCRIBER] ${new Date().toISOString()} — ${email}`)
    }

    return NextResponse.json({
      success: true,
      code: DISCOUNT_CODE,
      message: `Subscribed ${email}. Here's your discount code.`,
    })
  } catch (err: any) {
    console.error('Subscribe error:', err.message)
    // Still return success to user — don't punish them for our infra issues
    return NextResponse.json({
      success: true,
      code: DISCOUNT_CODE,
    })
  }
}
