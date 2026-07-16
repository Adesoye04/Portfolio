import { motion } from 'framer-motion'

const marqueeItems = ['Python · ','Java · ','FastAPI · ','PostgreSQL · ','React · ','TypeScript · ','Docker · ','SQLAlchemy · ','Git · ','Minimax AI · ','Argon2 · ','REST APIs · ']

export default function About() {
  return (
    <section id="about" className="py-28 px-8 md:px-16 bg-bg2">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="section-label">About Me</p>
          <h2 className="section-title">More than a <em>developer.</em></h2>
          <div className="section-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start mb-16">
          <div className="reveal-l space-y-4 text-muted text-sm leading-relaxed">
            <p>
              Third-year CS student at UNBC, graduating May 2028. I focus on backend engineering and applied AI —
              REST APIs, database design, RAG pipelines, auth systems. I like problems with real constraints and
              care about correctness over cleverness.
            </p>
            <p>
              Currently Team Lead on the Teaching Experience Analytics Platform at CTLT — FastAPI backend,
              PostgreSQL, deployed on Railway. Also a volunteer at the HRI Lab building on the Blossom
              robot platform, which led to a co-first-authored paper accepted at{' '}
              <span className="text-terracotta font-medium">ACM IDC 2026</span>.
            </p>
            <p>
              Previously: Data Engineer at Muzedata (Python ETL pipelines, crypto market data),
              Product Manager at Wakanow (Lagos). GPA 4.14/4.33, Dean's List.
            </p>
          </div>

          <div className="reveal-r grid grid-cols-2 gap-4">
            {[
              ['4.14', 'GPA / 4.33'],
              ['Dean\'s List', 'Winter 2026'],
              ['IDC 2026', 'R&D Finalist · 2nd'],
              ['141', 'Teens Trained'],
              ['500+', 'Bottles Distributed'],
              ['1550', 'SAT Score'],
            ].map(([n, l]) => (
              <motion.div
                key={l}
                whileHover={{ y: -3 }}
                className="bg-white border border-black/[0.07] p-5 rounded-sm hover:border-black/20 transition-all duration-300"
              >
                <div className="font-serif text-2xl text-terracotta mb-0.5">{n}</div>
                <div className="text-xs text-muted">{l}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden border-y border-black/[0.06] py-4 -mx-8 md:-mx-16">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-muted2 text-sm mx-2 whitespace-nowrap font-medium tracking-wide">{item}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
