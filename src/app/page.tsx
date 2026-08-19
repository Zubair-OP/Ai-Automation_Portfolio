import { Navbar } from '@/components/Navbar'
import { Ticker } from '@/components/Ticker'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Automation } from '@/components/sections/Automation'
import { Skills } from '@/components/sections/Skills'
import { Journey } from '@/components/sections/Journey'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Projects />
        <Automation />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}