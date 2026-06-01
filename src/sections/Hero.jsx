import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const words = ['Software Engineer','Researcher','Builder','Team Lead','Community Founder']

export default function Hero() {
  const wordRef = useRef(null)
  const idxRef  = useRef(0)

  useEffect(() => {
    const el = wordRef.current
    if (!el) return
    const cycle = () => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(12px)'
      setTimeout(() => {
        idxRef.current = (idxRef.current + 1) % words.length
        el.textContent = words[idxRef.current]
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 400)
    }
    const iv = setInterval(cycle, 2600)
    return () => clearInterval(iv)
  }, [])

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] } } }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-28 pb-16 overflow-hidden">

      {/* Background texture dots */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[...Array(18)].map((_,i) => (
          <div key={i} className="absolute rounded-full bg-terracotta/5"
            style={{ width: 3+Math.random()*6+'px', height: 3+Math.random()*6+'px', left: Math.random()*100+'%', top: Math.random()*100+'%', animationDelay: Math.random()*4+'s', animation:`floatY ${5+Math.random()*4}s ease-in-out infinite` }} />
        ))}
      </div>

      {/* Big decorative number */}
      <div className="absolute right-0 bottom-0 font-serif text-[22vw] leading-none text-terracotta/[0.03] select-none pointer-events-none translate-x-8">
        AO
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl">

        <motion.p variants={item} className="section-label mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-terracotta/50" />
          Prince George, BC · Open to Internships
        </motion.p>

        <motion.h1 variants={item} className="font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.95] mb-6 text-ink">
          Adesoye<br />
          <span className="hero-clip italic">Oyeyiola.</span>
        </motion.h1>

        {/* Cycling word */}
        <motion.div variants={item} className="flex items-center gap-4 mb-6">
          <div className="text-xl md:text-2xl text-muted font-light">I am a</div>
          <div
            ref={wordRef}
            className="text-xl md:text-2xl font-medium text-terracotta transition-all duration-400"
            style={{ transition: 'opacity 0.35s ease, transform 0.35s ease' }}
          >
            {words[0]}
          </div>
        </motion.div>

        <motion.p variants={item} className="text-muted text-base md:text-lg leading-relaxed max-w-[520px] mb-8">
          I build purposeful software, conduct HCI research, and believe the most powerful
          code is the kind that reaches people. CS student at UNBC · ACM IDC 2026 Finalist.
        </motion.p>

        {/* Poem line */}
        <motion.blockquote variants={item} className="border-l-2 border-warm/60 pl-5 mb-10 max-w-sm">
          <p className="font-serif italic text-muted2 text-sm leading-relaxed">
            "What thou lovest well remains, the rest is dross."
          </p>
          <cite className="text-xs text-muted2/60 not-italic tracking-wide">— Ezra Pound, Canto LXXXI</cite>
        </motion.blockquote>

        <motion.div variants={item} className="flex flex-wrap gap-4">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact"  className="btn-ghost">Get in Touch</a>
          <a
            href="/Adesoye_Oyeyiola_SWE_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex items-center gap-2"
          >
            <span>Resume</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-8 md:left-16 flex items-center gap-3 text-muted2 text-xs tracking-widest uppercase"
      >
        <div className="w-8 h-px bg-muted2" />
        Scroll
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-6 bg-muted2/40 ml-1"
        />
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute bottom-10 right-8 md:right-16 hidden md:flex gap-8"
      >
        {[['4.14','GPA / 4.33'],['2026','Dean\'s List'],['IDC','R&D Finalist'],['141','Teens Trained']].map(([n,l]) => (
          <div key={l} className="text-right">
            <div className="font-serif text-2xl text-terracotta">{n}</div>
            <div className="text-xs text-muted uppercase tracking-wide">{l}</div>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
