import type { Metadata } from 'next'
import { Bebas_Neue, Poppins } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/providers/CartProvider'
import Navbar from '@/components/layout/Navbar'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Never Again — The Complete Hangover System',
  description: 'Shield before. Rescue after. Science-backed hangover support that actually works. Free UK delivery on orders over £20.',
  openGraph: {
    title: 'Never Again — The Complete Hangover System',
    description: 'Shield before. Rescue after. Science-backed hangover support that actually works.',
    url: 'https://neveragainstore.co.uk',
    siteName: 'Never Again',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${poppins.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
