import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    role: 'Front-End Developer',
    org: 'Techlogix',
    type: 'Internship',
    typeColor: 'bg-emerald-900/60 text-emerald-300 border-emerald-700',
    period: 'Jul – Aug 2025',
    bullets: [
      'Landed a competitive summer internship after completing only first year',
      'Designed and built the front-end for a Student Information System — login/auth, dashboards, React-Router navigation, and a mock JSON backend for testing',
    ],
  },
  {
    role: 'Research Developer',
    org: 'BeamerPlus · Prof. Chandra Gummaluru',
    type: 'Research',
    typeColor: 'bg-violet-900/60 text-violet-300 border-violet-700',
    period: 'Dec 2025 – Present',
    bullets: [
      'Designing a next-generation slideshow tool to redefine academic and educational presentations',
      'Built-in graphical tools, coding console, AI-summarized Q&A, split-view multi-slide display, and video recording',
    ],
  },
  {
    role: 'Co-Author & Developer',
    org: 'Lua eBook · Prof. Rutwa Engineer',
    type: 'Research',
    typeColor: 'bg-violet-900/60 text-violet-300 border-violet-700',
    period: 'Jan – May 2025',
    bullets: [
      'Co-authored a 16,000-word eBook with 34 exercises on game development via Roblox Studio',
      'Published via PressBooks as an active-learning course for high school students',
    ],
  },
]

function TimelineEntry({ exp, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <div ref={ref} className="relative flex gap-8">
      {/* Left: dot + line */}
      <div className="relative flex flex-col items-center w-4 shrink-0 mt-1">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-3.5 h-3.5 rounded-full border-2 border-apple-blue bg-apple-bg"
        >
          {/* Glow pulse on the active dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: [0, 0.5, 0] , scale: [0.6, 2, 2.4] } : {}}
            transition={{ duration: 0.9, delay: index * 0.12 + 0.1 }}
            className="absolute inset-0 rounded-full bg-apple-blue"
          />
        </motion.div>

        {/* Connecting line below dot (hidden for last entry) */}
        {!isLast && (
          <div className="relative flex-1 w-px bg-apple-border/40 mt-1.5">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.7, delay: index * 0.12 + 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="absolute inset-0 bg-apple-blue/50"
            />
          </div>
        )}
      </div>

      {/* Right: card */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 pb-8"
      >
        <div className="p-7 bg-apple-light/60 border border-apple-border rounded-2xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-black text-apple-dark tracking-tight">
                  {exp.role}
                </h3>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${exp.typeColor}`}>
                  {exp.type}
                </span>
              </div>
              <p className="text-sm font-medium text-apple-blue">{exp.org}</p>
            </div>
            <span className="text-sm text-apple-gray whitespace-nowrap">{exp.period}</span>
          </div>

          <ul className="space-y-2">
            {exp.bullets.map((bullet, j) => (
              <li key={j} className="flex gap-3 text-sm text-apple-gray leading-relaxed">
                <span className="text-apple-blue mt-0.5 shrink-0">—</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-apple-blue tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-apple-dark">Where I've </span>
            <span className="text-apple-blue">Worked</span>
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <TimelineEntry
              key={exp.org}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
