'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const shieldIngredients = [
  { name: 'N-Acetyl-L-Cysteine (NAC)', amount: '600mg', role: 'The big one. Precursor to glutathione — your liver\'s master antioxidant. Supports the breakdown of acetaldehyde before it does damage.' },
  { name: 'Milk Thistle Extract (80% silymarin)', amount: '150mg', role: 'Liver-protective herb used for centuries. Silymarin supports liver cell regeneration and helps neutralise free radicals.' },
  { name: 'Alpha Lipoic Acid', amount: '200mg', role: 'Powerful antioxidant that works in both fat and water — unusually versatile. Supports energy metabolism and recycles other antioxidants.' },
  { name: 'L-Cysteine', amount: '200mg', role: 'Works alongside NAC to boost glutathione production. The dynamic duo of liver support.' },
  { name: 'Potassium Citrate', amount: '100mg', role: 'Key electrolyte lost during drinking. Supports muscle function and hydration.' },
  { name: 'Sodium', amount: '50mg', role: 'Electrolyte replenishment begins before the night ends.' },
  { name: 'Vitamin B6', amount: '10mg', role: 'Alcohol depletes B vitamins fast. B6 supports energy metabolism and nervous system function.' },
  { name: 'Vitamin B12', amount: '0.5mg (500mcg)', role: 'Supports red blood cell formation and neurological function. Alcohol is brutal on B12 levels.' },
]

const rescueIngredients = [
  { name: 'Magnesium Citrate', amount: '300mg', role: 'Alcohol is a magnesium thief. This replenishes it — supporting muscle relaxation, energy production, and reducing inflammation.' },
  { name: 'Potassium Citrate', amount: '300mg', role: 'Electrolyte replenishment for proper hydration and muscle function. You lost it dancing. Here it is back.' },
  { name: 'Sodium (Citrate or Chloride)', amount: '300mg', role: 'Core electrolyte. Works with potassium to restore fluid balance.' },
  { name: 'Ginger Extract (10:1)', amount: '200mg', role: 'Anti-nausea, anti-inflammatory, pro-getting-out-of-bed. Used for thousands of years for a reason.' },
  { name: 'Prickly Pear Extract', amount: '200mg', role: 'Clinical research shows it reduces hangover severity — nausea, dry mouth, and appetite loss. Underrated.' },
  { name: 'L-Theanine', amount: '150mg', role: 'Promotes calm focus without drowsiness. Takes the edge off the anxiety that often follows a night out.' },
  { name: 'Vitamin B6 (Pyridoxine HCl)', amount: '10mg', role: 'Replenishes what alcohol depleted. Supports neurotransmitter production so your brain starts working again.' },
  { name: 'Vitamin C (Ascorbic Acid)', amount: '100mg', role: 'Antioxidant to mop up oxidative stress. Supports immune function when your body is under pressure.' },
  { name: 'Black Pepper Extract (95% Piperine)', amount: '5mg', role: 'Makes everything else work better. Piperine enhances bioavailability — your body actually absorbs what you just took.' },
]

export default function Ingredients() {
  const [active, setActive] = useState<'shield' | 'rescue'>('shield')
  const ingredients = active === 'shield' ? shieldIngredients : rescueIngredients

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-poppins text-magenta font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Nothing hidden
          </p>
          <h2 className="font-bebas text-[clamp(3rem,8vw,5.5rem)] text-dark leading-none">
            FULL INGREDIENTS
          </h2>
          <p className="font-poppins text-dark/50 mt-4">
            Every ingredient. Every dose. No pixie-dusting.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-dark/5 rounded-2xl p-1 flex gap-1">
            <button
              onClick={() => setActive('shield')}
              className={`px-6 py-3 rounded-xl font-poppins font-bold text-sm transition-all duration-200 ${
                active === 'shield' ? 'bg-blue text-white shadow-md' : 'text-dark/50 hover:text-dark'
              }`}
            >
              🛡️ Shield (Before)
            </button>
            <button
              onClick={() => setActive('rescue')}
              className={`px-6 py-3 rounded-xl font-poppins font-bold text-sm transition-all duration-200 ${
                active === 'rescue' ? 'bg-magenta text-white shadow-md' : 'text-dark/50 hover:text-dark'
              }`}
            >
              🚑 Rescue (After)
            </button>
          </div>
        </div>

        {/* Ingredients list */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              className="flex gap-4 p-5 rounded-2xl bg-dark/3 hover:bg-dark/5 transition-colors group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex-shrink-0 w-28 text-right">
                <span
                  className="font-poppins font-bold text-sm"
                  style={{ color: active === 'shield' ? '#2570b3' : '#e02180' }}
                >
                  {ing.amount}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-poppins font-semibold text-dark text-sm">{ing.name}</p>
                <p className="font-poppins text-dark/50 text-sm leading-relaxed mt-1">{ing.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center font-poppins text-dark/30 text-xs mt-8">
          1 serving = 2 capsules · 20 servings per tub · Vegan capsule shell · Gluten-free
        </p>
      </div>
    </section>
  )
}
