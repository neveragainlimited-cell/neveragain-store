'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCart } from '@/components/providers/CartProvider'
import { useRouter } from 'next/navigation'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, freeShipping, totalItems } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-dark z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-bebas text-2xl text-white tracking-wide">YOUR CART</h2>
              <button onClick={closeCart} className="text-white/60 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Free shipping banner */}
            <div className={`px-6 py-3 text-sm font-semibold text-center transition-colors ${freeShipping ? 'bg-olive text-dark' : 'bg-white/5 text-white/70'}`}>
              {freeShipping
                ? '🎉 You\'ve got free UK delivery!'
                : `Add £${(20 - subtotal).toFixed(2)} more for free delivery`}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/40 gap-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <p className="font-poppins">Your cart is empty.<br />Go fix that.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 bg-white/5 rounded-2xl p-4"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-poppins font-semibold text-white text-sm truncate">{item.name}</p>
                        <p className="font-poppins font-bold text-magenta">£{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold transition-colors"
                          >−</button>
                          <span className="font-poppins font-semibold text-white min-w-[1.5rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold transition-colors"
                          >+</button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-white/30 hover:text-red-400 transition-colors text-xs font-poppins"
                          >Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between font-poppins">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white font-bold">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-poppins">
                  <span className="text-white/60">Delivery</span>
                  <span className={freeShipping ? 'text-olive font-bold' : 'text-white/60'}>
                    {freeShipping ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <motion.button
                  onClick={handleCheckout}
                  className="w-full btn-magenta text-lg py-4 rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout — £{subtotal.toFixed(2)}
                </motion.button>
                <p className="text-center text-white/30 text-xs font-poppins">
                  Secure checkout via Stripe. 100% money-back guarantee.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
