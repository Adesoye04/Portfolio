import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { initiatives, poems } from '../data'

// ── RESEARCH ──────────────────────────────────────────────────────
export function Research() {
  return (
    <section id="research" className="py-28 px-8 md:px-16 bg-bg2">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="section-label">Publications & Research</p>
          <h2 className="section-title">What I've <em>discovered.</em></h2>
          <div className="section-rule" />
        </div>

        <div className="reveal bg-white border border-black/[0.07] rounded-sm p-8 md:p-12 hover:border-black/20 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-[120px_1px_1fr] gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="font-serif text-5xl text-terracotta leading-none">2026</div>
              <div className="text-xs text-muted tracking-widest uppercase mt-2">ACM IDC</div>
            </div>
            <div className="hidden md:block w-px h-20 bg-warm/40 self-center" />
            <div>
              <p className="text-xs text-sage tracking-widest uppercase mb-3 font-medium">
                Interaction Design and Children · Brighton, UK · R&D Challenge Finalist
              </p>
              <h3 className="font-serif text-2xl text-ink mb-3 leading-snug">Guardians of the Planet</h3>
              <p className="text-sm text-muted leading-relaxed mb-5">
                We built a sustainability education system for children — a Scratch game, an AR layer, and a
                physical robot (Blossom) that tied it all together as a single character. Real kids, ethics-approved
                study, and somehow it actually worked. Accepted at ACM IDC 2026 and I'm presenting it in Brighton.
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-xs px-3 py-1.5 border border-sage/30 text-sage rounded-sm bg-sage/5 font-medium">
                  Co-First Author · Presenting Finalist
                </span>
                <span className="text-xs px-3 py-1.5 border border-black/10 text-muted rounded-sm">
                  Social Robotics · HRI · Child-Centred Design · AR
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── COMMUNITY ─────────────────────────────────────────────────────
const initiativeDetails = {
  'Techvantage': {
    images: ['/images/techvantage-1.jpg'],
    writeup: `I started Techvantage because I grew up in Lagos knowing that tech was something you could do, but nobody around me was teaching it. Nigerian secondary schools mostly don't touch programming or digital skills at all — so we decided to.\n\nWhat started as one workshop turned into a full curriculum. We ran sessions across multiple schools, trained 141 teenagers, and raised $2,200 CAD to cover devices, venue, and printed materials. The best part was watching students go from never opening a laptop to actually building things and getting curious about what else was possible.\n\nIt's also what made me want to study CS seriously.`,
  },
  'Stop the Spread': {
    images: ['/images/spread-1.jpg', '/images/spread-2.jpg', '/images/spread-3.jpg', '/images/spread-4.jpg'],
    writeup: `2020. COVID-19 was spreading fast in Lagos and hand sanitizer had basically disappeared from shelves — or was priced so high that most families couldn't touch it.\n\nWe got access to the University of Lagos Chemistry Department, learned how to produce sanitizer properly, and made over 500 bottles ourselves. The Nigerian Red Cross helped us figure out distribution — schools, community centers, low-income households.\n\nThis was before I knew anything about software or systems design. But looking back, it was the same instinct: you see a problem, you figure out what resources you have, and you move. That lesson has stayed with me.`,
  },
}

function InitiativeModal({ item, onClose }) {
  const details = initiativeDetails[item.name]
  const images = details?.images ?? []
  const writeup = details?.writeup ?? item.desc
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(30,20,12,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-sm border border-black/10 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {images.length > 0 && (
          <div className="relative w-full bg-bg3 overflow-hidden" style={{ height: 280 }}>
            <img src={images[imgIdx]} alt={`${item.name} ${imgIdx + 1}`} className="w-full h-full object-cover" />
            {images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === imgIdx ? 'bg-terracotta' : 'bg-white/60'}`} />
                ))}
              </div>
            )}
            {images.length > 1 && (
              <>
                <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-sm bg-white/80 flex items-center justify-center text-ink hover:bg-white transition-colors">‹</button>
                <button onClick={() => setImgIdx(i => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-sm bg-white/80 flex items-center justify-center text-ink hover:bg-white transition-colors">›</button>
              </>
            )}
          </div>
        )}
        <div className="p-7">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className={`inline-block text-[10px] px-2 py-1 border rounded-sm mb-3 font-medium ${item.color === 'sage' ? 'border-sage/30 text-sage' : 'border-clay/30 text-clay'}`}>{item.tag}</div>
              <h3 className="font-serif text-2xl text-ink">{item.name}</h3>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-sm border border-black/10 flex items-center justify-center text-muted hover:text-ink hover:border-black/30 transition-colors shrink-0 mt-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div className="text-sm text-muted leading-relaxed mb-6 space-y-3">
            {writeup.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <div className="flex gap-8">
            {item.stats.map(s => (
              <div key={s.label}>
                <div className="font-serif text-3xl text-terracotta">{s.num}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Community() {
  const [activeItem, setActiveItem] = useState(null)
  return (
    <section id="community" className="py-28 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="section-label">Community & Leadership</p>
          <h2 className="section-title">What I've <em>started.</em></h2>
          <div className="section-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`md:col-span-${i === 0 ? 2 : 1} bg-white border border-black/[0.07] p-8 rounded-sm relative overflow-hidden hover:border-black/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
              onClick={() => setActiveItem(item)}
            >
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${item.color === 'sage' ? 'bg-sage' : 'bg-clay'}`} />
              <div className={`inline-block text-[10px] px-2 py-1 border rounded-sm mb-4 font-medium ${item.color === 'sage' ? 'border-sage/30 text-sage' : 'border-clay/30 text-clay'}`}>
                {item.tag}
              </div>
              <h3 className="font-serif text-2xl text-ink mb-3">{item.name}</h3>
              <p className="text-sm text-muted leading-relaxed mb-6">{item.desc}</p>
              <div className="flex gap-8">
                {item.stats.map(s => (
                  <div key={s.label}>
                    <div className="font-serif text-3xl text-terracotta">{s.num}</div>
                    <div className="text-xs text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Leadership card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="bg-white border border-black/[0.07] p-8 rounded-sm hover:border-black/20 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-muted2" />
            <div className="text-[10px] px-2 py-1 border border-black/10 text-muted rounded-sm mb-4 font-medium inline-block">Media & AV · Church</div>
            <h3 className="font-serif text-2xl text-ink mb-3">RCCG Faith Chapel</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Assistant Head of Media Department — leading multimedia production and technical operations
              for weekly services since December 2024.
            </p>
            <div className="text-xs text-muted flex items-center gap-1.5">
              <span className="text-terracotta">·</span> AV Equipment · Team Coordination · Live Production
            </div>
          </motion.div>
        </div>

      </div>

      <AnimatePresence>
        {activeItem && <InitiativeModal item={activeItem} onClose={() => setActiveItem(null)} />}
      </AnimatePresence>
    </section>
  )
}

// ── POEMS ─────────────────────────────────────────────────────────
export function Poems() {
  const [active, setActive] = useState(0)
  const [displayed, setDisplayed] = useState(poems[0])
  const linesRef = useRef([])

  const switchPoem = (idx) => {
    if (idx === active) return
    setActive(idx)
    setTimeout(() => {
      setDisplayed(poems[idx])
    }, 200)
  }

  useEffect(() => {
    const lines = document.querySelectorAll('.poem-ln')
    lines.forEach((l, i) => {
      l.classList.remove('show')
      setTimeout(() => l.classList.add('show'), 80 + i * 80)
    })
  }, [displayed])

  return (
    <section id="poems" className="py-28 px-8 md:px-16 bg-bg2">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="section-label">Beyond the Code</p>
          <h2 className="section-title">Words that <em>stay.</em></h2>
          <div className="section-rule" />
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {poems.map((p, i) => (
            <button
              key={p.title}
              onClick={() => switchPoem(i)}
              className={`px-4 py-2 text-xs border rounded-sm transition-all duration-200 ${active === i ? 'border-terracotta text-terracotta bg-terracotta/5' : 'border-black/10 text-muted hover:border-terracotta/40'}`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          >
            <div className="font-serif italic text-muted text-lg leading-[2.2]">
              {displayed.lines.map((line, i) =>
                line === '' ? <span key={i} className="poem-ln block h-5" /> :
                <span key={i} className="poem-ln block">{line}</span>
              )}
            </div>
            <div>
              <h3 className="font-serif text-2xl text-ink mb-1">{displayed.title}</h3>
              <p className="text-xs text-muted tracking-widest uppercase mb-6">{displayed.author}</p>
              <p className="text-sm text-muted leading-relaxed border-l-2 border-warm/60 pl-5">
                {displayed.note}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ── CONTACT ───────────────────────────────────────────────────────
export function Contact() {
  const links = [
    { label: 'Email', value: 'adesoyeoyeyiola44@gmail.com', href: 'mailto:adesoyeoyeyiola44@gmail.com', icon: '✉' },
    { label: 'GitHub', value: 'github.com/Adesoye04', href: 'https://github.com/Adesoye04', icon: '⌥' },
    { label: 'LinkedIn', value: 'linkedin.com/in/adesoye-oyeyiola', href: 'https://linkedin.com/in/adesoye-oyeyiola', icon: '↗' },
    { label: 'Phone', value: '778-675-8216', href: 'tel:7786758216', icon: '◎' },
  ]

  return (
    <section id="contact" className="py-28 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's <em>connect.</em></h2>
          <div className="section-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="reveal-l">
            <p className="text-muted text-sm leading-relaxed mb-4">
              Looking for software engineering internships and co-op roles for 2026. If you have something
              interesting — a role, a project, or just want to talk — I'm around.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Available remotely and open to relocation.
            </p>
            <blockquote className="font-serif italic text-muted2 text-sm leading-relaxed border-l-2 border-warm/50 pl-5">
              "Pull down thy vanity, it is not man<br />
              Made courage, or made order, or made grace."<br />
              <cite className="text-xs text-muted2/50 not-italic">— Pound, Canto LXXXI</cite>
            </blockquote>
          </div>

          <div className="reveal-r space-y-3">
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-center gap-4 p-5 bg-white border border-black/[0.07] rounded-sm hover:border-black/20 hover:translate-x-1.5 transition-all duration-300 group"
              >
                <span className="text-terracotta w-5 text-center shrink-0">{l.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-muted uppercase tracking-widest mb-0.5">{l.label}</div>
                  <div className="text-sm text-ink truncate">{l.value}</div>
                </div>
                <svg className="text-muted group-hover:text-terracotta transition-colors shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
