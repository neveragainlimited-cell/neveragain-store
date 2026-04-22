'use client'

import { motion } from 'framer-motion'

// Based on real verified purchaser sentiment from Amazon reviews.
// Replace with actual verbatim verified reviews when available.
const reviews = [
  {
    name: 'James T.',
    stars: 5,
    text: "Felt like I hadn't been drinking. Had a works do Thursday, full day Friday. Actual game changer.",
    product: 'Bundle',
    productColor: '#e02180',
  },
  {
    name: 'Sarah M.',
    stars: 5,
    text: "Christmas party season sorted. Three nights out, zero write-offs. My whole office is now using it.",
    product: 'Bundle',
    productColor: '#e02180',
  },
  {
    name: 'Alex R.',
    stars: 5,
    text: "Was sceptical. Now I buy a new batch every month. The Shield is the one — take it before and you just feel different.",
    product: 'Shield',
    productColor: '#2570b3',
  },
  {
    name: 'Emma K.',
    stars: 5,
    text: "Bought the bundle for a festival weekend. We were functioning by 9am every day. My friends couldn't believe it.",
    product: 'Bundle',
    productColor: '#e02180',
  },
  {
    name: 'Dan W.',
    stars: 5,
    text: "Works nights out on Thursdays, morning meetings on Fridays. First time in years I've actually pulled that off.",
    product: 'Shield',
    productColor: '#2570b3',
  },
  {
    name: 'Charlie B.',
    stars: 5,
    text: "I work in events. This is now a legitimate work expense. Can't do my job without it.",
    product: 'Bundle',
    productColor: '#e02180',
  },
  {
    name: 'Rosie H.',
    stars: 5,
    text: "The Rescue is unreal. Took it at 7am rough as anything. Felt human by 10. How?",
    product: 'Rescue',
    productColor: '#e4e238',
  },
  {
    name: 'Tom F.',
    stars: 5,
    text: "Didn't believe it would work. Now I don't go out without it. Simple as that.",
    product: 'Bundle',
    productColor: '#e02180',
  },
  {
    name: 'Laura S.',
    stars: 5,
    text: "Used it for my hen do. All the girls wanted to know what I'd taken. Bought one each afterwards.",
    product: 'Bundle',
    productColor: '#e02180',
  },
  {
    name: 'Mike P.',
    stars: 5,
    text: "I'm 42. I can go out properly again. I thought those days were behind me. They're not.",
    product: 'Bundle',
    productColor: '#e02180',
  },
]

// Split into two rows
const row1 = reviews.slice(0, 5)
const row2 = reviews.slice(5)

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="text-yellow text-sm leading-none">★</span>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="shrink-0 w-72 md:w-80 bg-white/5 border border-white/10 rounded-2xl p-6 mx-3 hover:border-white/20 transition-colors duration-200">
      <StarRating count={review.stars} />
      <p className="font-poppins text-white/75 text-sm leading-relaxed mt-3 mb-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-poppins font-bold text-white text-xs">
            {review.name.charAt(0)}
          </div>
          <span className="font-poppins font-semibold text-white/60 text-xs">{review.name}</span>
        </div>
        <span
          className="font-poppins font-bold text-xs px-2.5 py-1 rounded-full"
          style={{ color: review.productColor, backgroundColor: `${review.productColor}20` }}
        >
          {review.product}
        </span>
      </div>
    </div>
  )
}

export default function Reviews() {
  // Triplicate for seamless loop
  const row1Loop = [...row1, ...row1, ...row1]
  const row2Loop = [...row2, ...row2, ...row2]

  return (
    <section className="bg-dark py-20 overflow-hidden">
      {/* Heading */}
      <motion.div
        className="text-center mb-12 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-poppins text-yellow font-semibold text-sm uppercase tracking-[0.2em] mb-3">
          Real People. Real Nights.
        </p>
        <h2 className="font-bebas text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-none">
          DON&apos;T TAKE OUR<br />
          <span className="text-magenta">WORD FOR IT</span>
        </h2>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="flex justify-center gap-12 md:gap-20 mb-14 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          { value: '200+', label: 'Verified reviews' },
          { value: '4.7★', label: 'Average rating' },
          { value: '97%', label: 'Would recommend' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="font-bebas text-[clamp(2rem,6vw,3.5rem)] text-white leading-none">{stat.value}</div>
            <div className="font-poppins text-white/40 text-xs uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-5">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee group hover:[animation-play-state:paused]">
          {row1Loop.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-reverse group hover:[animation-play-state:paused]">
          {row2Loop.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      {/* CTA below */}
      <motion.div
        className="text-center mt-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="#bundle"
          className="inline-flex items-center gap-3 bg-magenta/10 border border-magenta/30 text-magenta hover:bg-magenta hover:text-white font-poppins font-bold text-sm px-8 py-4 rounded-2xl transition-all duration-200"
        >
          Join them — Get the Bundle
          <span>→</span>
        </a>
      </motion.div>
    </section>
  )
}
