import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Tagline bar */}
      <div className="bg-magenta py-4">
        <p className="font-bebas text-2xl text-center tracking-widest">
          YOU&apos;RE ALIVE — LET&apos;S BUILD FROM THERE.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-bebas text-3xl text-white tracking-wide mb-3">NEVER AGAIN</h3>
            <p className="font-poppins text-white/50 text-sm leading-relaxed">
              Science-backed hangover support. Shield before. Rescue after. Full night covered.
            </p>
            <p className="font-poppins text-white/30 text-xs mt-4">
              Never Again Ltd. · UK Supplements Brand
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-poppins font-bold text-white/80 text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2">
              <FooterLink href="#products">Never Again Shield</FooterLink>
              <FooterLink href="#products">Never Again Rescue</FooterLink>
              <FooterLink href="#bundle">The Bundle (Save £9.98)</FooterLink>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-poppins font-bold text-white/80 text-sm uppercase tracking-wider mb-4">Info</h4>
            <ul className="space-y-2">
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="/shipping">Shipping & Returns</FooterLink>
              <FooterLink href="/money-back">Money-Back Guarantee</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <li>
                <a href="mailto:info@neveragainstore.co.uk" className="font-poppins text-white/50 hover:text-white text-sm transition-colors">
                  info@neveragainstore.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-poppins text-white/30 text-xs text-center">
            © {new Date().getFullYear()} Never Again Ltd. All rights reserved. Food Supplement — not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <p className="font-poppins text-white/20 text-xs">
            Vegan · Gluten-Free · UK Made
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="font-poppins text-white/50 hover:text-white text-sm transition-colors duration-200">
        {children}
      </a>
    </li>
  )
}
