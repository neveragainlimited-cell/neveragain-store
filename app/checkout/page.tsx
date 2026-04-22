'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/components/providers/CartProvider'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, subtotal, freeShipping, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [coupon, setCoupon] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (items.length === 0) router.push('/')
  }, [items, router])

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, email, coupon }),
      })
      const data = await res.json()

      if (data.url) {
        // Redirect to Stripe-hosted checkout
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-bebas text-5xl text-white mb-2">CHECKOUT</h1>
          <p className="font-poppins text-white/40 mb-10">Almost there. You&apos;re making great life choices.</p>

          {/* Order summary */}
          <div className="bg-white/5 rounded-3xl p-6 mb-8 space-y-4">
            <h2 className="font-poppins font-bold text-white text-sm uppercase tracking-wider">Order Summary</h2>
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-poppins text-white text-sm font-semibold">{item.name}</p>
                  <p className="font-poppins text-white/40 text-xs">Qty: {item.quantity}</p>
                </div>
                <p className="font-poppins font-bold text-white">£{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-poppins text-white/50 text-sm">Subtotal</span>
                <span className="font-poppins text-white font-semibold">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-poppins text-white/50 text-sm">Delivery</span>
                <span className={`font-poppins font-semibold text-sm ${freeShipping ? 'text-olive' : 'text-white/50'}`}>
                  {freeShipping ? 'FREE' : '£2.99'}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="font-poppins text-white font-bold">Total</span>
                <span className="font-poppins text-white font-bold text-lg">
                  £{(subtotal + (freeShipping ? 0 : 2.99)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout form */}
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="font-poppins text-white/60 text-sm block mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 font-poppins text-white placeholder:text-white/20 focus:outline-none focus:border-magenta transition-colors"
              />
            </div>

            <div>
              <label className="font-poppins text-white/60 text-sm block mb-2">Discount code (optional)</label>
              <input
                type="text"
                value={coupon}
                onChange={e => setCoupon(e.target.value.toUpperCase())}
                placeholder="FIRST10"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 font-poppins text-yellow placeholder:text-white/20 focus:outline-none focus:border-yellow transition-colors uppercase"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-magenta py-5 text-lg rounded-2xl mt-4 disabled:opacity-60"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
            >
              {loading ? 'Redirecting to secure payment...' : `Pay £${(subtotal + (freeShipping ? 0 : 2.99)).toFixed(2)} securely`}
            </motion.button>

            <p className="text-center font-poppins text-white/30 text-xs">
              🔒 Secure checkout via Stripe. We never see your card details.<br />
              100% money-back guarantee if it doesn&apos;t work.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
