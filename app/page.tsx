import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import Products from '@/components/sections/Products'
import Bundle from '@/components/sections/Bundle'
import Ingredients from '@/components/sections/Ingredients'
import Guarantee from '@/components/sections/Guarantee'
import EmailSignup from '@/components/sections/EmailSignup'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Products />
      <Bundle />
      <Ingredients />
      <Guarantee />
      <EmailSignup />
      <Footer />
    </>
  )
}
