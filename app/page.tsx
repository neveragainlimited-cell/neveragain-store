import Hero from '@/components/sections/Hero'
import TonightOrMorning from '@/components/sections/TonightOrMorning'
import HowItWorks from '@/components/sections/HowItWorks'
import Products from '@/components/sections/Products'
import Reviews from '@/components/sections/Reviews'
import Bundle from '@/components/sections/Bundle'
import Ingredients from '@/components/sections/Ingredients'
import Guarantee from '@/components/sections/Guarantee'
import EmailSignup from '@/components/sections/EmailSignup'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <TonightOrMorning />
      <HowItWorks />
      <Products />
      <Reviews />
      <Bundle />
      <Ingredients />
      <Guarantee />
      <EmailSignup />
      <Footer />
    </>
  )
}
