import { useEffect, useRef, useState } from 'react'
import { skills } from '../data'

const catColors = {
  lang:      { bg: 'rgba(181,96,58,0.10)',  border: 'rgba(181,96,58,0.30)',  text: '#7a3010', label: 'Languages' },
  framework: { bg: 'rgba(107,140,114,0.10)', border: 'rgba(107,140,114,0.30)', text: '#2f5a38', label: 'Frameworks' },
  db:        { bg: 'rgba(200,130,79,0.10)',  border: 'rgba(200,130,79,0.30)',  text: '#6a3a10', label: 'Databases' },
  infra:     { bg: 'rgba(100,100,140,0.08)', border: 'rgba(100,100,140,0.25)', text: '#3a3a6a', label: 'Infra & Tools' },
}

const H = 520

export default function Skills() {
  const containerRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const hoveredRef = useRef(null)

  // Each bubble gets a DOM ref and physics state stored in a ref (not state) to avoid re-renders
  const bubblesRef = useRef(null)  // array of { el, x, y, vx, vy, r, skill }
  const rafRef = useRef(null)

  const sorted = [...skills].sort((a, b) => b.size - a.size)

  // One stable ref per bubble element
  const elRefs = useRef(sorted.map(() => ({ current: null })))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const W = container.offsetWidth

    // Initialise bubbles tightly around center
    const cx = W / 2
    const cy = H / 2
    const nodes = sorted.map((skill, i) => {
      const r = skill.size / 2
      const angle = (i / sorted.length) * Math.PI * 2
      const dist = 20 + i * 8
      return {
        skill,
        r,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }
    })
    bubblesRef.current = nodes

    // Apply initial positions
    nodes.forEach((n, i) => {
      const el = elRefs.current[i]?.current
      if (el) {
        el.style.left = (n.x - n.r) + 'px'
        el.style.top  = (n.y - n.r) + 'px'
      }
    })

    const DAMPING     = 0.985
    const CENTER_PULL = 0.004  // gentle attraction to center
    const DRIFT       = 0.015  // random nudge each frame

    function tick() {
      const W2 = container.offsetWidth
      const nodes = bubblesRef.current
      if (!nodes) return

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (hoveredRef.current === i) continue  // freeze hovered bubble

        // Gentle center attraction
        a.vx += (W2 / 2 - a.x) * CENTER_PULL
        a.vy += (H   / 2 - a.y) * CENTER_PULL

        // Tiny random drift for organic feel
        a.vx += (Math.random() - 0.5) * DRIFT
        a.vy += (Math.random() - 0.5) * DRIFT

        // Collision with other bubbles
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.01
          const minDist = a.r + b.r + 2  // 2px gap so they just touch
          if (dist < minDist) {
            const overlap = (minDist - dist) / 2
            const nx = dx / dist
            const ny = dy / dist
            a.x -= nx * overlap
            a.y -= ny * overlap
            b.x += nx * overlap
            b.y += ny * overlap
            // exchange velocity component along collision normal
            const relV = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny
            if (relV > 0) {
              a.vx -= relV * nx * 0.5
              a.vy -= relV * ny * 0.5
              b.vx += relV * nx * 0.5
              b.vy += relV * ny * 0.5
            }
          }
        }

        // Integrate
        a.vx *= DAMPING
        a.vy *= DAMPING
        a.x  += a.vx
        a.y  += a.vy

        // Wall bounce (keep inside canvas)
        if (a.x - a.r < 0)    { a.x = a.r;    a.vx = Math.abs(a.vx) }
        if (a.x + a.r > W2)   { a.x = W2-a.r; a.vx = -Math.abs(a.vx) }
        if (a.y - a.r < 0)    { a.y = a.r;    a.vy = Math.abs(a.vy) }
        if (a.y + a.r > H)    { a.y = H-a.r;  a.vy = -Math.abs(a.vy) }

        // Write to DOM directly — no React state
        const el = elRefs.current[i]?.current
        if (el) {
          el.style.left = (a.x - a.r) + 'px'
          el.style.top  = (a.y - a.r) + 'px'
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="skills" className="py-28 px-8 md:px-16 bg-bg2">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-4">
          <p className="section-label">Skills</p>
          <h2 className="section-title">How I <em>think.</em></h2>
          <div className="section-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="reveal-l md:col-span-1">
            <p className="text-muted text-sm leading-relaxed mb-6">
              Bubble size = proficiency. Bigger means deeper. Hover any bubble to see which projects it powered.
            </p>
            <div className="space-y-3 mb-6">
              {Object.entries(catColors).map(([key, c]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border shrink-0" style={{ background: c.bg, borderColor: c.border }} />
                  <span className="text-xs text-muted">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop bubble canvas */}
          <div className="md:col-span-2 reveal-r">
            <div ref={containerRef} className="skills-bubble-canvas relative w-full rounded-sm border border-black/[0.07] bg-bg overflow-hidden" style={{ height: H }}>
              {sorted.map((skill, i) => {
                const c = catColors[skill.cat]
                const r = skill.size / 2
                const fontSize = skill.size > 70 ? 13 : skill.size > 52 ? 11 : 10
                return (
                  <div
                    key={skill.name}
                    ref={el => { if (!elRefs.current[i]) elRefs.current[i] = { current: null }; elRefs.current[i].current = el }}
                    className="bubble"
                    style={{
                      position: 'absolute',
                      width: skill.size,
                      height: skill.size,
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                      transition: 'box-shadow 0.2s',
                    }}
                    onMouseEnter={() => {
                      hoveredRef.current = i
                      const node = bubblesRef.current?.[i]
                      if (!node) return
                      const W = containerRef.current?.offsetWidth || 500
                      let tx = node.x + r + 10
                      if (tx + 240 > W) tx = node.x - r - 250
                      setTooltip({ skill, x: Math.max(8, tx), y: Math.max(8, node.y - 20) })
                    }}
                    onMouseLeave={() => {
                      hoveredRef.current = null
                      setTooltip(null)
                    }}
                  >
                    <span style={{ fontSize, color: c.text, fontWeight: 500, textAlign: 'center', padding: 4, lineHeight: 1.2 }}>{skill.name}</span>
                  </div>
                )
              })}

              {tooltip && (
                <div className="absolute z-20 bg-white border border-black/15 rounded-sm p-4 shadow-lg pointer-events-none"
                  style={{ left: tooltip.x, top: tooltip.y, minWidth: 200, maxWidth: 240 }}>
                  <div className="font-serif text-base text-ink mb-0.5">{tooltip.skill.name}</div>
                  <div className="text-[10px] text-terracotta tracking-widest uppercase mb-3">{tooltip.skill.level}</div>
                  <div className="space-y-1">
                    {tooltip.skill.projects.map(p => (
                      <div key={p} className="flex gap-2 text-xs text-muted">
                        <span className="text-terracotta mt-0.5 shrink-0">◆</span><span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile fallback grid */}
            <div className="skills-mobile-grid">
              {skills.map(skill => {
                const c = catColors[skill.cat]
                return (
                  <div key={skill.name} className="rounded-sm border p-3 text-center"
                    style={{ background: c.bg, borderColor: c.border }}>
                    <div className="text-xs font-medium" style={{ color: c.text }}>{skill.name}</div>
                    <div className="text-[10px] text-muted mt-0.5">{skill.level}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
