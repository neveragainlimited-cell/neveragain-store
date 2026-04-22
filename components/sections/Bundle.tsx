'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCart, PRODUCTS } from '@/components/providers/CartProvider'
import { useState } from 'react'

export default function Bundle() {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const bundle = PRODUCTS.find(p => p.id === 'bundle')!

  const handleAdd = () => {
    addItem(bundle)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <section id="bundle" className="bg-dark py-24 px-6 overflow-hidden relative">
      {/* Yellow checkerboard background */}
      <div className="absolute inset-0 checker-bg-yellow opacity-100" />
      <div className="absolute inset-0 bg-dark/85" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-magenta/20 via-dark to-blue/20 border border-white/10 overflow-hidden p-8 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Products visual */}
            <motion.div
              className="flex items-end justify-center gap-6 lg:gap-10"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="relative"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              >
                <div className="w-36 h-36 md:w-48 md:h-48 relative drop-shadow-2xl">
                  <Image src="/images/shield.png" alt="Never Again Shield" fill className="object-contain" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue text-white font-poppins font-bold text-xs px-3 py-1 rounded-full whitespace-nowrap">
                  Shield 🛡️
                </div>
              </motion.div>

              <motion.div
                className="relative"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 2.5 }}
              >
                <div className="w-36 h-36 md:w-48 md:h-48 relative drop-shadow-2xl">
                  <Image src="/images/rescue.png" alt="Never Again Rescue" fill className="object-contain" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-magenta text-white font-poppins font-bold text-xs px-3 py-1 rounded-full whitespace-nowrap">
                  Rescue 🚑
                </div>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow text-dark font-poppins font-bold text-sm px-4 py-2 rounded-full mb-6">
                <span>⚡</span> Most popular
              </div>

              <h2 className="font-bebas text-[clamp(3rem,7vw,5.5rem)] text-white leading-none mb-4">
                THE COMPLETE<br />
                <span className="text-magenta">SYSTEM</span>
              </h2>

              <p className="font-poppins text-white/60 text-lg leading-relaxed mb-8">
                Shield before. Rescue after. Full night covered.
                One bundle, two products, zero regrets — or your money back.
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-bebas text-6xl text-white">£29.99</span>
                <div>
                  <p className="font-poppins text-white/40 line-through text-lg">£39.98</p>
                  <p className="font-poppins font-bold text-yellow text-sm">Save £9.98</p>
                </div>
              </div>

              {/* What's included */}
              <div className="space-y-3 mb-8">
                {[
                  { label: 'Never Again Shield', sub: '20 servings, 40 capsules' },
                  { label: 'Never Again Rescue', sub: '20 servings, 40 capsules' },
                  { label: 'Free UK delivery', sub: 'Because you deserve it' },
                  { label: '100% money-back guarantee', sub: 'If it doesn\'t work, we don\'t want your money' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-yellow mt-0.5">✓</span>
                    <div>
                      <p className="font-poppins font-semibold text-white text-sm">{item.label}</p>
                      <p className="font-poppins text-white/40 text-xs">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={handleAdd}
                className="w-full py-5 rounded-2xl font-poppins font-bold text-white text-lg transition-all duration-200 shadow-lg shadow-magenta/30"
                style={{ backgroundColor: added ? '#22c55e' : '#e02180' }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(224,33,128,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                {added ? '✓ Added to cart!' : 'Get the Bundle — £29.99'}
              </motion.button>

              <p className="text-center font-poppins text-white/30 text-xs mt-4">
                Vegan · Gluten-Free · Ships in 1–2 business days
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
