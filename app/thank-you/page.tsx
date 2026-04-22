'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '@/components/providers/CartProvider'

export default function ThankYouPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        {/* Animated success */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="text-8xl mb-8 inline-block"
        >
          🎉
        </motion.div>

        <motion.h1
          className="font-bebas text-[clamp(3rem,10vw,6rem)] text-white leading-none mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          ORDER<br />
          <span className="text-magenta">CONFIRMED</span>
        </motion.h1>

        <motion.p
          className="font-poppins text-white/60 text-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          You&apos;re officially prepared. Confirmation email on its way.
        </motion.p>

        <motion.p
          className="font-poppins font-bold text-yellow text-sm mb-10 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          &ldquo;You probably won&apos;t remember this — but well done.&rdquo;
        </motion.p>

        {/* What to do next */}
        <motion.div
          className="bg-white/5 rounded-3xl p-8 mb-8 text-left space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-poppins font-bold text-white">What happens next:</h3>
          {[
            { step: '1', text: 'Check your email for your order confirmation' },
            { step: '2', text: 'We pack and ship within 1–2 business days' },
            { step: '3', text: 'Shield arrives. Take before your next night out' },
            { step: '4', text: 'Rescue arrives too. Wake up human again' },
          ].map(item => (
            <div key={item.step} className="flex gap-4 items-start">
              <span className="font-bebas text-xl text-magenta w-5 flex-shrink-0">{item.step}</span>
              <p className="font-poppins text-white/60 text-sm">{item.text}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <Link
            href="/"
            className="btn-magenta inline-block px-10 py-4 rounded-2xl text-base"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
