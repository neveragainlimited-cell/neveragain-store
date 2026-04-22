'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [code, setCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setCode(data.code)
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <section className="py-24 px-6 checker-bg-yellow" style={{ backgroundColor: '#e4e238' }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-bebas text-[clamp(3rem,8vw,6rem)] text-dark leading-none mb-4">
            WANT 10% OFF?
          </h2>
          <p className="font-poppins text-dark/60 text-lg mb-10">
            Drop your email. Get 10% off your first order. We'll remind you before the next big night.
            <br />
            <span className="text-dark/40 text-sm">No spam. Pre-night reminders. The occasional banger offer.</span>
          </p>

          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                exit={{ opacity: 0, y: -10 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-4 rounded-2xl font-poppins text-dark bg-white border-2 border-transparent focus:border-magenta focus:outline-none transition-colors placeholder:text-dark/30 text-base"
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn bg-dark text-white font-poppins font-bold px-8 py-4 rounded-2xl hover:bg-dark/80 active:scale-95 disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {status === 'loading' ? '...' : 'Get 10% Off'}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-dark rounded-3xl p-8 text-center"
              >
                <p className="text-4xl mb-3">🎉</p>
                <h3 className="font-bebas text-3xl text-white mb-2">HERE&apos;S YOUR CODE</h3>
                <p className="font-poppins text-white/50 text-sm mb-6">
                  Use this at checkout for 10% off your first order
                </p>
                <motion.button
                  onClick={copyCode}
                  className="bg-yellow text-dark font-bebas text-3xl px-8 py-4 rounded-2xl tracking-widest hover:brightness-105 transition-all"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {code}
                </motion.button>
                <p className="font-poppins text-white/30 text-xs mt-4">Click to copy</p>
              </motion.div>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <p className="font-poppins text-magenta text-sm mt-3">
              Something went wrong. Try again or email us directly.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
