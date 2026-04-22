'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    emoji: '😵',
    title: 'The Problem',
    color: '#e02180',
    bg: 'bg-magenta/10',
    border: 'border-magenta/30',
    body: `When you drink, your liver converts alcohol into acetaldehyde — a toxic compound that causes inflammation, nausea, and that particular brand of morning-after regret. On top of that, alcohol depletes your electrolytes, B vitamins, and amino acids. Your body is working against you.`,
  },
  {
    number: '02',
    emoji: '🛡️',
    title: 'Shield — Before',
    color: '#2570b3',
    bg: 'bg-blue/10',
    border: 'border-blue/30',
    body: `Taken before or during drinking, Shield arms your liver with NAC (600mg) — the precursor to glutathione, your body's master antioxidant. Backed by milk thistle, alpha lipoic acid, and electrolytes, it supports your liver's natural detox pathways before toxins build up.`,
    highlight: 'You probably won\'t remember taking it — but well done.',
  },
  {
    number: '03',
    emoji: '🚑',
    title: 'Rescue — After',
    color: '#e4e238',
    bg: 'bg-yellow/10',
    border: 'border-yellow/30',
    body: `Taken the morning after, Rescue replenishes what the night took: magnesium and sodium restore hydration, L-glutamine repairs your gut lining, and ginger calms the inflammation. Black pepper extract makes sure your body actually absorbs all of it.`,
    highlight: 'You\'re alive — let\'s build from there.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-poppins text-yellow font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            The Science
          </p>
          <h2 className="font-bebas text-[clamp(3rem,8vw,6rem)] text-white leading-none">
            WHY HANGOVERS HAPPEN<br />
            <span className="text-magenta">AND HOW WE FIX THEM</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={`relative rounded-3xl border ${step.border} ${step.bg} p-8 flex flex-col gap-4`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              {/* Step number */}
              <div className="flex items-center gap-3">
                <span className="font-bebas text-5xl leading-none" style={{ color: step.color }}>
                  {step.number}
                </span>
                <span className="text-3xl">{step.emoji}</span>
              </div>

              {/* Title */}
              <h3 className="font-bebas text-2xl text-white tracking-wide">{step.title}</h3>

              {/* Body */}
              <p className="font-poppins text-white/60 text-sm leading-relaxed flex-1">{step.body}</p>

              {/* Cheeky highlight */}
              {step.highlight && (
                <p className="font-poppins font-semibold text-sm italic" style={{ color: step.color }}>
                  &ldquo;{step.highlight}&rdquo;
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Connector arrow (desktop only) */}
        <div className="hidden md:flex justify-center mt-8 gap-[calc(33.33%-3rem)]">
          {[0, 1].map(i => (
            <motion.svg
              key={i}
              width="40" height="20" viewBox="0 0 40 20"
              className="text-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <path d="M0 10 L32 10 M24 2 L40 10 L24 18" stroke="currentColor" strokeWidth="2" fill="none" />
            </motion.svg>
          ))}
        </div>
      </div>
    </section>
  )
}
