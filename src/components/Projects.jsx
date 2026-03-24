import { motion } from 'framer-motion'

const projects = [
  {
    name: 'Sparky',
    subtitle: 'Elderly Care Coordinator',
    badge: 'Hackathon Winner',
    badgeColor: 'bg-emerald-900/60 text-emerald-300 border-emerald-700',
    context: 'Solo — Western University Hackathon',
    description:
      "iOS app connecting clinics, hospitals, and drivers to elderly patients in rural North Canada. Features a custom rule-based chatbot built on Apple's Speech API — deliberately not an LLM — so it never gives inaccurate medical advice.",
    tech: ['Swift', 'SwiftUI', 'SFSpeechRecognizer', 'iOS'],
    year: 'Feb 2026',
    gradient: 'from-emerald-900/80 to-teal-900/80',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/hasan-malik' }],
  },
  {
    name: 'StarTooth',
    subtitle: 'Dental X-Ray Visualizer',
    badge: 'Overall 3rd Prize',
    badgeColor: 'bg-amber-900/60 text-amber-300 border-amber-700',
    context: 'SmileHacks Toronto',
    description:
      'Input a 2D dental X-ray and get a fully interactive 3D model. Simulate cavities, extractions, abrasion, and chewing in real time. Includes persistent patient-doctor chat history.',
    tech: ['React.js', 'Three.js', 'PostgreSQL', 'TypeScript'],
    year: 'Feb 2026',
    gradient: 'from-sky-900/80 to-blue-900/80',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/hasan-malik' }],
  },
  {
    name: 'BeamerPlus',
    subtitle: 'Next-Gen Academic Presentations',
    badge: 'Research',
    badgeColor: 'bg-violet-900/60 text-violet-300 border-violet-700',
    context: 'w/ Prof. Chandra Gummaluru · Open Source',
    description:
      'Reimagining how academic knowledge is presented. Built-in graphing tools, a coding console, split-view for multiple slides, AI-summarized Q&A, and video recording. In active development.',
    tech: ['Research', 'Open Source', 'Education'],
    year: 'Dec 2025–Present',
    gradient: 'from-violet-900/80 to-purple-900/80',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/hasan-malik' }],
  },
  {
    name: 'Learn Coding & Animations in Lua',
    subtitle: 'Interactive eBook',
    badge: 'Published',
    badgeColor: 'bg-blue-900/60 text-blue-300 border-blue-700',
    context: 'w/ Prof. Rutwa Engineer · PressBooks',
    description:
      'Co-authored a 16,000-word active-learning eBook with 34 exercises teaching game development through Roblox Studio. Designed for high school students with no prior coding experience.',
    tech: ['Lua', 'Roblox Studio', 'Game Dev', 'Education'],
    year: 'Jan–May 2025',
    gradient: 'from-orange-900/80 to-amber-900/80',
    links: [{ label: 'Read ↗', href: 'https://github.com/hasan-malik' }],
  },
]

export default function Projects() {
  return (
    <section id="work" className="py-28">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-apple-blue tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-apple-dark">Selected </span>
            <span className="text-apple-blue">Work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-apple-light/60 border border-apple-border rounded-2xl hover:border-apple-blue/40 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden backdrop-blur-sm"
            >
              {/* Gradient thumbnail */}
              <div className={`h-24 bg-gradient-to-br ${project.gradient} flex items-end px-7 pb-4`}>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${project.badgeColor}`}>
                  {project.badge}
                </span>
              </div>

              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-black text-apple-dark tracking-tight mb-0.5">
                      {project.name}
                    </h3>
                    <p className="text-sm font-medium text-apple-gray">{project.subtitle}</p>
                    <p className="text-xs text-apple-blue mt-1">{project.context}</p>
                  </div>
                  <span className="text-xs text-apple-gray whitespace-nowrap ml-4">{project.year}</span>
                </div>

                <p className="text-sm text-apple-gray leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium px-2.5 py-1 bg-apple-bg/80 text-apple-gray rounded-md border border-apple-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.links.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-apple-blue hover:text-blue-400 transition-colors duration-200"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
