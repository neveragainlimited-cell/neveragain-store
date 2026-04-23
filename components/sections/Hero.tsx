'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCart, PRODUCTS } from '@/components/providers/CartProvider'

export default function Hero() {
  const { addItem } = useCart()
  const bundle = PRODUCTS.find(p => p.id === 'bundle')!

  return (
    <section className="relative min-h-screen bg-dark flex items-center overflow-hidden">
      {/* Animated checkerboard background — blue + olive, matches product lid */}
      <div className="absolute inset-0 checker-bg opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/40 to-dark" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 w-full">

        {/*
          Layout:
          MOBILE  — logo → products → text/CTA (stacked, DOM order)
          DESKTOP — logo top-left | products right (full height) | text bottom-left
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-6 lg:gap-12">

          {/* ── BLOCK 1: Logo (mobile: first, desktop: top-left) ── */}
          <div className="lg:col-start-1 lg:row-start-1">
            <motion.p
              className="font-poppins font-semibold text-yellow text-sm uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              The pre/post drinking protocol
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            >
              <div
                className="relative w-full h-[min(280px,48vw)] lg:h-[min(340px,28vw)]"
                style={{ animation: 'logoDrip 8s ease-in-out infinite' }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    WebkitMaskImage: 'url(/images/logo.png)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'left center',
                    maskImage: 'url(/images/logo.png)',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'left center',
                    animation: 'logoCycle 6s ease-in-out infinite',
                    backgroundColor: '#e02180',
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* ── BLOCK 2: Products (mobile: second = first thing below logo, desktop: right column full-height) ── */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex items-center justify-center gap-6 lg:gap-8 py-2 lg:py-0">
            {/* Shield */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40, rotate: -8 }}
              animate={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              whileHover={{ rotate: 0, scale: 1.05, transition: { duration: 0.3 } }}
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 relative drop-shadow-2xl">
                <Image
                  src="/images/shield.png"
                  alt="Never Again Shield — pre-party protection"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue text-white font-poppins font-bold text-xs px-3 py-1 rounded-full whitespace-nowrap">
                Before 🛡️
              </div>
            </motion.div>

            {/* Plus */}
            <motion.span
              className="font-bebas text-3xl md:text-4xl text-yellow/60 shrink-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >+</motion.span>

            {/* Rescue */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: 8 }}
              transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
              whileHover={{ rotate: 0, scale: 1.05, transition: { duration: 0.3 } }}
              style={{ animation: 'float 6s ease-in-out 3s infinite' }}
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 relative drop-shadow-2xl">
                <Image
                  src="/images/rescue.png"
                  alt="Never Again Rescue — post-party recovery"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-magenta text-white font-poppins font-bold text-xs px-3 py-1 rounded-full whitespace-nowrap">
                After 🚑
              </div>
            </motion.div>
          </div>

          {/* ── BLOCK 3: Text + CTA (mobile: third, desktop: bottom-left) ── */}
          <div className="lg:col-start-1 lg:row-start-2 lg:self-end pb-4">
            <motion.p
              className="font-poppins text-white/70 text-lg md:text-xl leading-relaxed mb-4 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              You said it. We made it possible.
              <br />
              <span className="text-white/50 text-base">Shield before. Rescue after. Zero write-offs.</span>
            </motion.p>

            {/* Star rating */}
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow text-lg leading-none">★</span>
                ))}
              </div>
              <span className="font-poppins font-bold text-white text-sm">4.7</span>
              <span className="font-poppins text-white/40 text-sm">· 200+ verified reviews</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                onClick={() => addItem(bundle)}
                className="btn-magenta text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-lg shadow-magenta/30"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Get the Bundle — £29.99
              </motion.button>

              <motion.a
                href="#how-it-works"
                className="btn-outline-white text-base md:text-lg px-6 md:px-8 py-4 md:py-5 rounded-2xl"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                How It Works
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {['🌱 Vegan', '🌾 Gluten-Free', '💊 20 Servings', '🚚 Free delivery over £20'].map(badge => (
                <span key={badge} className="font-poppins text-white/50 text-sm">{badge}</span>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="font-poppins text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
