import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const words = ['Software Engineer','Backend Developer','AI/ML Engineer','HCI Researcher','Systems Programmer']

// Currently building ticker items
const building = [
  'Course Advisor App',
  'adesoye.dev',
  'Blossom HRI Research',
  'Teaching Analytics Platform',
  'UNBC Campus Pathfinder',
]

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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-28 pb-24 overflow-hidden">

      {/* Background dots */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[...Array(18)].map((_,i) => (
          <div key={i} className="absolute rounded-full bg-terracotta/5"
            style={{ width: 3+Math.random()*6+'px', height: 3+Math.random()*6+'px', left: Math.random()*100+'%', top: Math.random()*100+'%', animation:`floatY ${5+Math.random()*4}s ease-in-out infinite`, animationDelay: Math.random()*4+'s' }} />
        ))}
      </div>

      {/* Decorative AO */}
      <div className="absolute right-0 bottom-0 font-serif text-[22vw] leading-none text-terracotta/[0.03] select-none pointer-events-none translate-x-8">AO</div>

      {/* Decorative wave layers, sit behind the "currently building" ticker */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none" aria-hidden>
        <svg className="relative block w-full h-[140px] md:h-[200px]" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#c8824f" fillOpacity="0.05" />
          <path d="M0,96L60,117.3C120,139,240,181,360,181.3C480,181,600,139,720,144C840,149,960,203,1080,202.7C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" fill="#c8824f" fillOpacity="0.08" />
          <path d="M0,256L80,229.3C160,203,320,149,480,149.3C640,149,800,203,960,208C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" fill="#c8824f" fillOpacity="0.12" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center max-w-6xl w-full">
        <motion.div variants={container} initial="hidden" animate="show">

          <motion.p variants={item} className="section-label mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-terracotta/50" />
            Open to Internships
          </motion.p>

          <motion.h1 variants={item} className="font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] mb-6 text-ink">
            Adesoye<br />
            <span className="hero-clip italic">Oyeyiola.</span>
          </motion.h1>

          <motion.div variants={item} className="flex items-center gap-4 mb-6">
            <div className="text-xl text-muted font-light">I am a</div>
            <div ref={wordRef} className="text-xl font-medium text-terracotta" style={{ transition: 'opacity 0.35s ease, transform 0.35s ease' }}>
              {words[0]}
            </div>
          </motion.div>

          <motion.p variants={item} className="text-muted text-base md:text-lg leading-relaxed max-w-[500px] mb-8">
            I develop backend infrastructure and AI-driven applications such as Retrieval-Augmented
            Generation pipelines, vector search, and RESTful APIs. Additionally, I conduct HCI research
            on social robotics and child-oriented design.
          </motion.p>

          <motion.blockquote variants={item} className="border-l-2 border-warm/60 pl-5 mb-10 max-w-sm">
            <p className="font-serif italic text-muted2 text-sm leading-relaxed">
              "What thou lovest well remains, the rest is dross."
            </p>
            <cite className="text-xs text-muted2/60 not-italic tracking-wide">— Ezra Pound, Canto LXXXI</cite>
          </motion.blockquote>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact"  className="btn-ghost">Get in Touch</a>
            <a href="/Adesoye's Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost flex items-center gap-2">
              <span>Resume</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22,1,0.36,1] }}
          className="hidden md:block"
        >
          <div className="hero-photo w-72 h-96 border border-black/10 bg-bg3 rounded-sm overflow-hidden shadow-xl">
            <img src="/1000145872.jpg" alt="Adesoye Oyeyiola" className="w-full h-full object-cover object-top" />
          </div>
        </motion.div>
      </div>

      {/* Currently building ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-0 left-0 right-0 border-t border-black/[0.06] py-2.5 overflow-hidden bg-bg2/60 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-0.5 px-8">
          <span className="text-[10px] text-terracotta font-medium tracking-widest uppercase shrink-0">Currently building</span>
          <div className="w-px h-3 bg-warm/50" />
        </div>
        <div className="ticker-track px-8">
          {[...building, ...building].map((item, i) => (
            <span key={i} className="text-xs text-muted mx-8 whitespace-nowrap">{item}</span>
          ))}
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute bottom-16 right-8 md:right-16 hidden md:flex gap-8"
      >
        {[['4.14','GPA / 4.33'],['2026',"Dean's List"],['IDC','R&D Finalist · 2nd'],['141','Teens Trained']].map(([n,l]) => (
          <div key={l} className="text-right">
            <div className="font-serif text-2xl text-terracotta">{n}</div>
            <div className="text-xs text-muted uppercase tracking-wide">{l}</div>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
