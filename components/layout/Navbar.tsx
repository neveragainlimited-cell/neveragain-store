'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/components/providers/CartProvider'
import CartDrawer from '@/components/layout/CartDrawer'

const tickerItems = [
  '★★★★★  200+ five-star reviews',
  '🚚  Free UK delivery over £20',
  '💊  20 servings per product',
  '🛡️  30-day money-back guarantee',
  '✓  Vegan & gluten-free',
  '⚡  The pre/post drinking protocol',
  '🔬  Science-backed formula',
  '🇬🇧  UK brand',
]

export default function Navbar() {
  const { totalItems, toggleCart } = useCart()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Duplicate for seamless loop
  const allItems = [...tickerItems, ...tickerItems]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Ticker strip */}
        <div className="bg-magenta overflow-hidden h-8 flex items-center">
          <div className="flex gap-0 animate-marquee-fast whitespace-nowrap">
            {allItems.map((item, i) => (
              <span key={i} className="font-poppins font-semibold text-white text-xs shrink-0 px-6">
                {item}
                <span className="ml-6 text-white/40">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Main navbar */}
        <motion.nav
          className={`transition-all duration-300 ${
            scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
              <div
                className="relative w-24 h-12"
                style={{
                  WebkitMaskImage: 'url(/images/logo.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskImage: 'url(/images/logo.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                  backgroundColor: '#ffffff',
                }}
              />
            </Link>

            {/* Nav links — desktop */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="#products">Products</NavLink>
              <NavLink href="#bundle">Bundle</NavLink>
            </div>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 text-white hover:text-yellow transition-colors duration-200"
              aria-label="Open cart"
            >
              <CartIcon />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-magenta text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </div>

      <CartDrawer />
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="font-poppins font-semibold text-sm text-white/80 hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  )
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
