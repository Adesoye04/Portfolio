import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data'

const statusBadge = {
  live:       { label: 'Live',        color: 'bg-green-100 text-green-700 border-green-200' },
  complete:   { label: 'Complete',    color: 'bg-bg3 text-muted border-black/10' },
  inprogress: { label: 'In Progress', color: 'bg-amber-50 text-amber-700 border-amber-200' },
}

// Per-project modal data: images and extended write-up
// Drop photos into public/images/ and reference them here
const projectDetails = {
  'U-Course Advisor': {
    images: [], // add paths like '/images/ucourse-1.jpg' when ready
    writeup: `Built to solve a real problem — UNBC's advising process is opaque and hard to navigate, especially for students trying to plan across multiple degree requirements.\n\nThe prerequisite engine models AND/OR dependency trees with minimum grade thresholds (C-) enforced per course, across 400+ courses in 16 departments and two degree programs. A course scoring algorithm ranks eligible courses by requirement urgency, prerequisite-unlocking value, and credit weight.\n\nThe RAG chat layer uses Voyage AI embeddings stored in pgvector (cosine similarity ranking) for semantic queries, and falls back to the degree-progress engine for planning questions. Three guardrail layers sit in front of Claude: a keyword filter, an intent classifier, and a strict system prompt grounded in the student's actual transcript data.\n\nInfrastructure: Auth0 JWT, async SQLAlchemy, Celery for background tasks (transcript ingestion, embedding refresh), Sentry, Railway with isolated prod/dev environments. Private repo — available on request.`,
  },
}

function ProjectModal({ p, onClose }) {
  const details = projectDetails[p.name]
  const [imgIdx, setImgIdx] = useState(0)
  const images = details?.images ?? []
  const writeup = details?.writeup ?? p.desc

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
        {/* Image gallery */}
        {images.length > 0 && (
          <div className="relative w-full bg-bg3 overflow-hidden" style={{ height: 280 }}>
            <img
              src={images[imgIdx]}
              alt={`${p.name} screenshot ${imgIdx + 1}`}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === imgIdx ? 'bg-terracotta' : 'bg-white/60'}`}
                  />
                ))}
              </div>
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-sm bg-white/80 flex items-center justify-center text-ink hover:bg-white transition-colors"
                >‹</button>
                <button
                  onClick={() => setImgIdx(i => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-sm bg-white/80 flex items-center justify-center text-ink hover:bg-white transition-colors"
                >›</button>
              </>
            )}
          </div>
        )}

        <div className="p-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`text-[10px] px-2 py-0.5 border rounded-sm font-medium ${p.tagStyle}`}>{p.tag}</span>
                <span className={`text-[10px] px-2 py-0.5 border rounded-full font-medium ${statusBadge[p.status].color}`}>{statusBadge[p.status].label}</span>
              </div>
              <h3 className="font-serif text-2xl text-ink leading-tight">{p.name}</h3>
              <p className="text-xs text-muted mt-1 tracking-wide">{p.year} · {p.role}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-sm border border-black/10 flex items-center justify-center text-muted hover:text-ink hover:border-black/30 transition-colors shrink-0 mt-1"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Write-up */}
          <div className="text-sm text-muted leading-relaxed mb-6 space-y-3">
            {writeup.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {p.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 items-center">
            {p.privateRepo ? (
              <span className="text-xs text-muted italic">Private repo — available on request</span>
            ) : p.github ? (
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted hover:text-terracotta transition-colors border border-black/10 hover:border-terracotta/40 rounded-sm px-3 py-1.5">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                GitHub
              </a>
            ) : null}
            {p.live && p.live !== '#' && (
              <a href={p.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted hover:text-terracotta transition-colors border border-black/10 hover:border-terracotta/40 rounded-sm px-3 py-1.5">
                Live
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ p, i, onOpen }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10
    setTilt({ x, y })
    cardRef.current.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%')
    cardRef.current.style.setProperty('--my', ((e.clientY - rect.top)  / rect.height * 100) + '%')
  }
  const onMouseLeave = () => setTilt({ x: 0, y: 0 })

  const badge = statusBadge[p.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      className={`project-glow relative bg-white border border-black/[0.07] p-7 transition-all duration-300 hover:border-black/20 hover:shadow-lg rounded-sm cursor-pointer ${p.featured ? 'md:col-span-2' : ''}`}
      onClick={() => onOpen(p)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] px-2 py-0.5 border rounded-sm font-medium ${p.tagStyle}`}>{p.tag}</span>
            <span className={`text-[10px] px-2 py-0.5 border rounded-full font-medium ${badge.color}`}>{badge.label}</span>
          </div>
          <h3 className="font-serif text-xl text-ink leading-tight">{p.name}</h3>
          <p className="text-xs text-muted mt-1 tracking-wide">{p.year} · {p.role}</p>
        </div>
        <div className="flex gap-2 shrink-0 mt-1" onClick={e => e.stopPropagation()}>
          {p.privateRepo ? (
            <span className="text-[10px] text-muted italic self-center">Private repo</span>
          ) : p.github ? (
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-sm border border-black/10 flex items-center justify-center text-muted hover:text-terracotta hover:border-terracotta/40 transition-colors">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
          ) : null}
          {p.live && p.live !== '#' && (
            <a href={p.live} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-sm border border-black/10 flex items-center justify-center text-muted hover:text-terracotta hover:border-terracotta/40 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
          )}
        </div>
      </div>

      <p className="text-sm text-muted leading-relaxed mb-5 line-clamp-4">{p.desc}</p>

      <div className="flex flex-wrap gap-1.5 mb-2">
        {p.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
      </div>

      <p className="text-[10px] text-muted/50 mt-3">Click to expand →</p>

      {/* Corner number */}
      <div className="absolute bottom-4 right-5 font-serif text-5xl text-terracotta/[0.05] leading-none select-none">
        {String(p.id).padStart(2,'0')}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="py-28 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">

        <div className="reveal mb-14">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've <em>built.</em></h2>
          <div className="section-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} onOpen={setActiveProject} />
          ))}
        </div>

      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal p={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
