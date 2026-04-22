'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCart, PRODUCTS } from '@/components/providers/CartProvider'
import { useState } from 'react'

const productDetails = {
  shield: {
    tagline: 'Big night planned? No worries.',
    description: 'Pre-party protection. Shield arms your liver with NAC and antioxidants so your body is ready for whatever the night throws at it.',
    keyIngredients: ['NAC 600mg', 'Milk Thistle 150mg', 'Alpha Lipoic Acid 200mg', 'B12 + B6', 'Electrolytes'],
    dosage: 'Take 2 capsules before or during drinking',
    color: '#2570b3',
    accentColor: '#c7d670',
    textColor: 'text-blue',
    bgColor: 'bg-blue',
    borderColor: 'border-blue',
    badgeBg: 'bg-blue/10 border-blue/30',
  },
  rescue: {
    tagline: 'One too many last night?',
    description: 'Post-party recovery. Rescue replenishes your electrolytes, repairs your gut, and calms the inflammation. Back online in no time.',
    keyIngredients: ['Magnesium Citrate 300mg', 'L-Glutamine 300mg', 'Ginger Extract 200mg', 'Prickly Pear 200mg', 'Electrolytes'],
    dosage: 'Take 2 capsules post-party (or 3 if you\'re seriously rough)',
    color: '#e02180',
    accentColor: '#e4e238',
    textColor: 'text-magenta',
    bgColor: 'bg-magenta',
    borderColor: 'border-magenta',
    badgeBg: 'bg-magenta/10 border-magenta/30',
  },
}

export default function Products() {
  const { addItem } = useCart()
  const [added, setAdded] = useState<string | null>(null)

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    addItem(product)
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <section id="products" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-poppins text-magenta font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            The Products
          </p>
          <h2 className="font-bebas text-[clamp(3rem,8vw,5.5rem)] text-dark leading-none">
            PICK YOUR WEAPON
          </h2>
          <p className="font-poppins text-dark/50 mt-4 max-w-md mx-auto">
            Or better yet — grab both. That's kind of the whole point.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.filter(p => p.id !== 'bundle').map((product, i) => {
            const details = productDetails[product.id as keyof typeof productDetails]
            const isAdded = added === product.id

            return (
              <motion.div
                key={product.id}
                className={`rounded-3xl border-2 ${details.borderColor} overflow-hidden bg-white`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
              >
                {/* Product image area */}
                <div
                  className="relative h-64 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: `${details.color}15` }}
                >
                  {/* Tagline */}
                  <p
                    className="absolute top-6 left-0 right-0 text-center font-poppins font-bold text-sm"
                    style={{ color: details.color }}
                  >
                    {details.tagline}
                  </p>

                  <motion.div
                    className="relative w-44 h-44"
                    whileHover={{ scale: 1.08, rotate: 3, transition: { duration: 0.3 } }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className={`font-poppins font-semibold text-xs uppercase tracking-wider ${details.textColor} mb-1`}>
                        {product.id === 'shield' ? 'Before the night' : 'After the night'}
                      </p>
                      <h3 className="font-bebas text-3xl text-dark tracking-wide">{product.name.toUpperCase()}</h3>
                    </div>
                    <span className="font-bebas text-3xl text-dark">£{product.price.toFixed(2)}</span>
                  </div>

                  <p className="font-poppins text-dark/60 text-sm leading-relaxed mb-6">
                    {details.description}
                  </p>

                  {/* Key ingredients */}
                  <div className="mb-6">
                    <p className="font-poppins font-semibold text-xs text-dark/40 uppercase tracking-wider mb-3">Key Ingredients</p>
                    <div className="flex flex-wrap gap-2">
                      {details.keyIngredients.map(ing => (
                        <span
                          key={ing}
                          className={`font-poppins text-xs font-semibold px-3 py-1 rounded-full border ${details.badgeBg}`}
                          style={{ color: details.color }}
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dosage */}
                  <p className="font-poppins text-dark/40 text-xs italic mb-6">{details.dosage}</p>

                  {/* Add to cart */}
                  <motion.button
                    onClick={() => handleAdd(product)}
                    className="w-full py-4 rounded-2xl font-poppins font-bold text-white text-base transition-all duration-200"
                    style={{ backgroundColor: isAdded ? '#22c55e' : details.color }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isAdded ? '✓ Added to cart' : `Add to Cart — £${product.price.toFixed(2)}`}
                  </motion.button>

                  <p className="text-center font-poppins text-dark/30 text-xs mt-3">
                    + £2.99 delivery · Free over £20
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
