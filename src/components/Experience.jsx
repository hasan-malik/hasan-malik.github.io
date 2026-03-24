import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Front-End Developer',
    org: 'Techlogix',
    type: 'Internship',
    typeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    period: 'Jul – Aug 2025',
    bullets: [
      'Landed a competitive summer internship after completing only first year',
      'Designed and built the front-end for a Student Information System—login/auth, dashboards, React-Router navigation, and a mock JSON backend for testing',
    ],
  },
  {
    role: 'Research Developer',
    org: 'BeamerPlus · Prof. Chandra Gummaluru',
    type: 'Research',
    typeColor: 'bg-violet-50 text-violet-700 border-violet-200',
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
    typeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    period: 'Jan – May 2025',
    bullets: [
      'Co-authored a 16,000-word eBook with 34 exercises on game development via Roblox Studio',
      'Published via PressBooks as an active-learning course for high school students',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-apple-light">
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
          <h2 className="text-4xl md:text-5xl font-black text-apple-dark tracking-tight">
            Where I've Worked
          </h2>
        </motion.div>

        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-7 bg-white border border-apple-border rounded-2xl"
            >
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
