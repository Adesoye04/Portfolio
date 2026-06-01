import { useEffect, useState, createContext, useContext } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero    from './sections/Hero'
import About   from './sections/About'
import Projects from './sections/Projects'
import Skills  from './sections/Skills'
import Journey from './sections/Journey'
import WorldMap from './components/WorldMap'
import { Research, Community, Poems, Contact } from './sections/OtherSections'
import { useRevealAll } from './hooks/useReveal'

export const DarkContext = createContext({ dark: false, toggle: () => {} })
export const useDark = () => useContext(DarkContext)

export default function App() {
  useRevealAll()
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  const toggle = () => setDark(d => {
    const next = !d
    localStorage.setItem('theme', next ? 'dark' : 'light')
    return next
  })

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration: 1.3, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })
  }, [])

  return (
    <DarkContext.Provider value={{ dark, toggle }}>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <WorldMap />
        <Research />
        <Community />
        <Poems />
        <Contact />
      </main>
      <Footer />
    </DarkContext.Provider>
  )
}
