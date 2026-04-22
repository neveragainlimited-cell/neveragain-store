'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCart, PRODUCTS } from '@/components/providers/CartProvider'

const paths = [
  {
    id: 'tonight',
    emoji: '🌙',
    question: 'GOING OUT TONIGHT?',
    subline: 'Take Shield before you drink.',
    product: 'shield',
    accentColor: '#2570b3',
    borderClass: 'border-blue/40',
    bgClass: 'bg-blue/8',
    activeBg: 'bg-blue/15',
    activeBorder: 'border-blue',
    tagColor: 'bg-blue text-white',
    details: {
      headline: 'Shield arms your liver before the night starts.',
      body: 'NAC 600mg gives your body the building blocks to neutralise acetaldehyde — the toxic byproduct of alcohol — before it builds up. Take 2 capsules before or during drinking.',
      ingredients: ['NAC 600mg', 'Milk Thistle 150mg', 'Alpha Lipoic Acid 200mg', 'B12 + B6', 'Electrolytes'],
      dosage: '2 capsules before or during drinking',
    },
  },
  {
    id: 'rescue',
    emoji: '☀️',
    question: 'ROUGH MORNING AFTER?',
    subline: 'Take Rescue and get back online.',
    product: 'rescue',
    accentColor: '#e02180',
    borderClass: 'border-magenta/40',
    bgClass: 'bg-magenta/8',
    activeBg: 'bg-magenta/15',
    activeBorder: 'border-magenta',
    tagColor: 'bg-magenta text-white',
    details: {
      headline: 'Rescue puts back what the night took.',
      body: 'Magnesium and sodium restore hydration. L-glutamine repairs your gut lining. Ginger calms the inflammation. Black pepper extract makes sure your body actually absorbs all of it.',
      ingredients: ['Magnesium Citrate 300mg', 'L-Glutamine 300mg', 'Ginger Extract 200mg', 'Prickly Pear 200mg', 'Electrolytes'],
      dosage: '2–3 capsules the morning after (3 if you need it)',
    },
  },
]

export default function TonightOrMorning() {
  const [active, setActive] = useState<string | null>(null)
  const { addItem } = useCart()
  const [added, setAdded] = useState<string | null>(null)

  const handleAdd = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId)!
    addItem(product)
    setAdded(productId)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <section className="bg-dark py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-poppins text-yellow font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            The Protocol
          </p>
          <h2 className="font-bebas text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-none">
            WHICH ONE<br />
            <span className="text-magenta">ARE YOU RIGHT NOW?</span>
          </h2>
          <p className="font-poppins text-white/40 mt-4 text-base">
            Tap whichever applies. We've got you covered either way.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {paths.map((path, i) => {
            const isActive = active === path.id
            const product = PRODUCTS.find(p => p.id === path.product)!
            const isAdded = added === path.product

            return (
              <motion.div
                key={path.id}
                className={`rounded-3xl border-2 overflow-hidden cursor-pointer transition-colors duration-300 ${
                  isActive ? `${path.activeBorder} ${path.activeBg}` : `${path.borderClass} ${path.bgClass}`
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                onClick={() => setActive(isActive ? null : path.id)}
                whileHover={!isActive ? { scale: 1.01 } : {}}
              >
                {/* Card header */}
                <div className="p-8 flex items-start justify-between">
                  <div className="flex items-start gap-5">
                    <motion.div
                      className="text-5xl"
                      animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {path.emoji}
                    </motion.div>
                    <div>
                      <h3 className="font-bebas text-[clamp(1.8rem,5vw,2.8rem)] text-white leading-none tracking-wide">
                        {path.question}
                      </h3>
                      <p className="font-poppins text-white/50 text-sm mt-1.5">{path.subline}</p>
                    </div>
                  </div>

                  {/* Expand/collapse chevron */}
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/30 mt-1 shrink-0"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.div>
                </div>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-8 pb-8 border-t border-white/10 pt-6">
                        <div className="flex flex-col sm:flex-row gap-6 items-start">

                          {/* Product image */}
                          <motion.div
                            className="w-28 h-28 sm:w-36 sm:h-36 relative shrink-0 mx-auto sm:mx-0"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain drop-shadow-xl"
                            />
                          </motion.div>

                          {/* Details */}
                          <div className="flex-1">
                            <p className="font-poppins font-bold text-white text-base mb-2">
                              {path.details.headline}
                            </p>
                            <p className="font-poppins text-white/50 text-sm leading-relaxed mb-4">
                              {path.details.body}
                            </p>

                            {/* Ingredients */}
                            <div className="flex flex-wrap gap-2 mb-5">
                              {path.details.ingredients.map(ing => (
                                <span
                                  key={ing}
                                  className="font-poppins text-xs font-semibold px-3 py-1 rounded-full border"
                                  style={{ color: path.accentColor, borderColor: `${path.accentColor}40`, backgroundColor: `${path.accentColor}10` }}
                                >
                                  {ing}
                                </span>
                              ))}
                            </div>

                            <p className="font-poppins text-white/30 text-xs italic mb-5">
                              {path.details.dosage}
                            </p>

                            {/* CTA */}
                            <motion.button
                              onClick={(e) => { e.stopPropagation(); handleAdd(path.product) }}
                              className="w-full py-4 rounded-2xl font-poppins font-bold text-white text-base transition-colors duration-200"
                              style={{ backgroundColor: isAdded ? '#22c55e' : path.accentColor }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              {isAdded ? '✓ Added to cart' : `Add ${path.id === 'tonight' ? 'Shield' : 'Rescue'} — £19.99`}
                            </motion.button>

                            <p className="font-poppins text-white/25 text-xs text-center mt-3">
                              Or grab both in the bundle and save £9.99 →
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Bundle nudge below */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="#bundle"
            className="inline-flex items-center gap-2 font-poppins font-semibold text-yellow hover:text-white text-sm transition-colors"
          >
            <span>Both directions covered</span>
            <span>→</span>
            <span className="text-white/40">Get the Bundle — £29.99</span>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
