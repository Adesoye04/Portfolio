import { motion } from 'framer-motion'

const statusBadge = {
  live:       { label: 'Live',        color: 'bg-green-100 text-green-700 border-green-200' },
  complete:   { label: 'Complete',    color: 'bg-bg3 text-muted border-black/10' },
  inprogress: { label: 'In Progress', color: 'bg-amber-50 text-amber-700 border-amber-200' },
}

export default function ProjectModal({ project: p, onClose }) {
  const hero = p.images?.hero ?? null
  const thumbnails = p.images?.thumbnails ?? []
  const badge = statusBadge[p.status]

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
        className="relative bg-white rounded-sm border border-black/10 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-sm border border-black/10 bg-white flex items-center justify-center text-muted hover:text-ink hover:border-black/30 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Hero image slot */}
        <div className="relative w-full bg-bg3 overflow-hidden flex items-center justify-center" style={{ height: 280 }}>
          {hero ? (
            <img src={hero} alt={`${p.name} preview`} className="w-full h-full object-cover" />
          ) : (
            <span className="font-serif text-2xl text-muted/40 px-6 text-center">{p.name}</span>
          )}
        </div>

        {/* Thumbnail row */}
        {thumbnails.length > 0 && (
          <div className="flex gap-2 p-2 bg-bg2">
            {thumbnails.slice(0, 2).map((src, i) => (
              <div key={i} className="flex-1 rounded-sm overflow-hidden bg-bg3" style={{ height: 120 }}>
                <img src={src} alt={`${p.name} detail ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        <div className="p-7">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] px-2 py-0.5 border rounded-sm font-medium ${p.tagStyle}`}>{p.tag}</span>
              <span className={`text-[10px] px-2 py-0.5 border rounded-full font-medium ${badge.color}`}>{badge.label}</span>
            </div>
            <h3 className="font-serif text-2xl text-ink leading-tight">{p.name}</h3>
            <p className="text-xs text-muted mt-1 tracking-wide">{p.year} · {p.role}</p>
          </div>

          {/* Full description */}
          <p className="text-sm text-muted leading-relaxed mb-6">{p.desc}</p>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {p.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 items-center">
            {p.privateRepo ? (
              <span className="text-xs text-muted italic">Private repo · available on request</span>
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
