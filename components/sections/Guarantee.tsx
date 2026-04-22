'use client'

import { motion } from 'framer-motion'

const trustBadges = [
  { icon: '🌱', label: 'Vegan' },
  { icon: '🌾', label: 'Gluten-Free' },
  { icon: '🔬', label: 'Science-Backed' },
  { icon: '🇬🇧', label: 'UK Brand' },
  { icon: '♻️', label: 'Widely Recycled' },
]

export default function Guarantee() {
  return (
    <section className="bg-dark py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Big guarantee icon */}
          <motion.div
            className="text-8xl mb-8 inline-block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            🛡️
          </motion.div>

          <p className="font-poppins text-yellow font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Zero Risk
          </p>

          <h2 className="font-bebas text-[clamp(3rem,8vw,6rem)] text-white leading-none mb-6">
            IF IT DOESN&apos;T WORK,<br />
            <span className="text-magenta">YOU DON&apos;T PAY.</span>
          </h2>

          <p className="font-poppins text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            We know these work. You will too. But if you try them and disagree — full refund, no questions, no faff.
          </p>

          <p className="font-poppins text-white/40 text-sm mb-12">
            Email <a href="mailto:info@neveragainstore.co.uk" className="text-yellow hover:text-white transition-colors">info@neveragainstore.co.uk</a> and we&apos;ll sort it.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)' }}
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="font-poppins font-semibold text-white/70 text-sm">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
