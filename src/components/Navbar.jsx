import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About','Projects','Skills','Journey','Research','Community','Poems','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
        <button
          onClick={() => scrollTo('hero')}
          className="font-serif text-lg text-terracotta tracking-wide"
        >
          Adesoye.
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-7">
          {links.map(l => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className="text-muted text-xs tracking-widest uppercase hover:text-ink transition-colors duration-200"
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <a href="mailto:adesoyeoyeyiola44@gmail.com" className="hidden md:block btn-primary text-xs py-2 px-5">
          Hire me
        </a>

        {/* Burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="block w-6 h-px bg-ink origin-center transition-all" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="block w-6 h-px bg-ink" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="block w-6 h-px bg-ink origin-center transition-all" />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((l, i) => (
              <motion.button
                key={l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(l)}
                className="font-serif text-3xl text-ink hover:text-terracotta transition-colors"
              >
                {l}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
