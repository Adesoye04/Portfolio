import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDark } from '../App'

const links = ['About','Projects','Skills','Journey','Research','Community','Poems','Contact']

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}
function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { dark, toggle }        = useDark()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500 ${
          scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-black/[0.06] shadow-sm' : ''
        }`}
      >
        <button onClick={() => scrollTo('hero')} className="font-serif text-lg text-terracotta tracking-wide">
          Adesoye.
        </button>

        <ul className="hidden md:flex gap-6">
          {links.map(l => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} className="text-muted text-xs tracking-widest uppercase hover:text-terracotta transition-colors duration-200">
                {l}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="dark-toggle flex items-center"
            aria-label="Toggle dark mode"
            style={{ background: dark ? 'rgba(181,96,58,0.15)' : 'transparent' }}
          >
            <div className="dark-toggle-thumb" style={{ transform: dark ? 'translateX(20px)' : 'translateX(0)' }} />
          </button>
          <span className="text-muted" style={{ fontSize: 13 }}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </span>
          <a href="mailto:adesoyeoyeyiola44@gmail.com" className="btn-primary text-xs py-2 px-5 ml-2">
            Hire me
          </a>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="block w-6 h-px bg-ink origin-center" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="block w-6 h-px bg-ink" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="block w-6 h-px bg-ink origin-center" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button onClick={toggle} className="text-muted flex items-center gap-2 text-sm mb-2">
              {dark ? <SunIcon /> : <MoonIcon />}
              <span>{dark ? 'Light mode' : 'Dark mode'}</span>
            </button>
            {links.map((l, i) => (
              <motion.button key={l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(l)} className="font-serif text-3xl text-ink hover:text-terracotta transition-colors">
                {l}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
