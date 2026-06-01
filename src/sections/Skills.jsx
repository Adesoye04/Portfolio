import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '../data'

const catColors = {
  lang:      { bg: 'rgba(181,96,58,0.10)',  border: 'rgba(181,96,58,0.30)',  text: '#7a3010', label: 'Languages' },
  framework: { bg: 'rgba(107,140,114,0.10)', border: 'rgba(107,140,114,0.30)', text: '#2f5a38', label: 'Frameworks' },
  db:        { bg: 'rgba(200,130,79,0.10)',  border: 'rgba(200,130,79,0.30)',  text: '#6a3a10', label: 'Databases' },
  infra:     { bg: 'rgba(100,100,140,0.08)', border: 'rgba(100,100,140,0.25)', text: '#3a3a6a', label: 'Infra & Tools' },
}

export default function Skills() {
  const containerRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [placed, setPlaced] = useState([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const W = container.offsetWidth
    const H = 520
    const positions = []

    const sorted = [...skills].sort((a, b) => b.size - a.size)

    const result = sorted.map(skill => {
      const r = skill.size / 2
      let x, y, tries = 0
      do {
        x = r + 16 + Math.random() * (W - 2 * r - 32)
        y = r + 16 + Math.random() * (H - 2 * r - 32)
        tries++
      } while (
        positions.some(p => {
          const dx = x - p.x, dy = y - p.y
          return Math.sqrt(dx*dx + dy*dy) < r + p.r + 10
        }) && tries < 400
      )
      positions.push({ x, y, r })
      return { ...skill, x, y }
    })

    setPlaced(result)
  }, [])

  return (
    <section id="skills" className="py-28 px-8 md:px-16 bg-bg2">
      <div className="max-w-6xl mx-auto">

        <div className="reveal mb-4">
          <p className="section-label">Skills</p>
          <h2 className="section-title">How I <em>think.</em></h2>
          <div className="section-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Left: intro + legend */}
          <div className="reveal-l md:col-span-1">
            <p className="text-muted text-sm leading-relaxed mb-6">
              Bubble size reflects proficiency — bigger means deeper experience.
              Hover any bubble to see which projects it powered.
            </p>
            <div className="space-y-3">
              {Object.entries(catColors).map(([key, c]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border" style={{ background: c.bg, borderColor: c.border }} />
                  <span className="text-xs text-muted">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bubble canvas */}
          <div className="md:col-span-2 reveal-r">
            <div
              ref={containerRef}
              className="relative w-full rounded-sm border border-black/[0.07] bg-bg overflow-hidden"
              style={{ height: 520 }}
            >
              {placed.map((skill) => {
                const c = catColors[skill.cat]
                const r = skill.size / 2
                const fontSize = skill.size > 70 ? 13 : skill.size > 52 ? 11 : 10
                return (
                  <div
                    key={skill.name}
                    className="bubble"
                    style={{
                      left:   skill.x - r,
                      top:    skill.y - r,
                      width:  skill.size,
                      height: skill.size,
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                    }}
                    onMouseEnter={(e) => {
                      const rect = containerRef.current.getBoundingClientRect()
                      const ex   = skill.x + r + 10
                      const ey   = skill.y - 10
                      setTooltip({ skill, x: ex, y: ey })
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <span style={{ fontSize, color: c.text, fontWeight: 500, textAlign: 'center', padding: 4, lineHeight: 1.2 }}>
                      {skill.name}
                    </span>
                  </div>
                )
              })}

              {/* Tooltip */}
              {tooltip && (
                <div
                  className="absolute z-20 bg-white border border-black/15 rounded-sm p-4 shadow-lg pointer-events-none"
                  style={{ left: Math.min(tooltip.x, containerRef.current?.offsetWidth - 230), top: tooltip.y, minWidth: 200, maxWidth: 240 }}
                >
                  <div className="font-serif text-base text-ink mb-0.5">{tooltip.skill.name}</div>
                  <div className="text-[10px] text-terracotta tracking-widest uppercase mb-3">{tooltip.skill.level}</div>
                  <div className="space-y-1">
                    {tooltip.skill.projects.map(p => (
                      <div key={p} className="flex gap-2 text-xs text-muted">
                        <span className="text-terracotta mt-0.5 shrink-0">◆</span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
