import { useEffect } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero    from './sections/Hero'
import About   from './sections/About'
import Projects from './sections/Projects'
import Skills  from './sections/Skills'
import Journey from './sections/Journey'
import { Research, Community, Poems, Contact } from './sections/OtherSections'
import { useRevealAll } from './hooks/useReveal'

export default function App() {
  useRevealAll()

  useEffect(() => {
    // Lenis smooth scroll
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration: 1.3, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
      return () => lenis.destroy()
    })
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Research />
        <Community />
        <Poems />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
