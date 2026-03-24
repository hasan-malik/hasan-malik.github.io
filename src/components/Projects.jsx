import { motion } from 'framer-motion'

const projects = [
  {
    name: 'Sparky',
    subtitle: 'Elderly Care Coordinator',
    badge: 'Hackathon Winner',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    context: 'Solo — Western University Hackathon',
    description:
      'iOS app connecting clinics, hospitals, and drivers to elderly patients in rural North Canada. Features a custom rule-based chatbot built on Apple\'s Speech API—deliberately not an LLM—so it never gives inaccurate medical advice.',
    tech: ['Swift', 'SwiftUI', 'SFSpeechRecognizer', 'iOS'],
    year: 'Feb 2026',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/hasan-malik' }],
  },
  {
    name: 'StarTooth',
    subtitle: 'Dental X-Ray Visualizer',
    badge: 'Overall 3rd Prize',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    context: 'SmileHacks Toronto',
    description:
      'Input a 2D dental X-ray and get a fully interactive 3D model. Simulate cavities, extractions, abrasion, and chewing in real time. Includes persistent patient-doctor chat history.',
    tech: ['React.js', 'Three.js', 'PostgreSQL', 'TypeScript'],
    year: 'Feb 2026',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/hasan-malik' }],
  },
  {
    name: 'BeamerPlus',
    subtitle: 'Next-Gen Academic Presentations',
    badge: 'Research',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    context: 'w/ Prof. Chandra Gummaluru · Open Source',
    description:
      'Reimagining how academic knowledge is presented. Built-in graphing tools, a coding console, split-view for multiple slides, AI-summarized Q&A, and video recording. Currently in active development.',
    tech: ['Research', 'Open Source', 'Education'],
    year: 'Dec 2025–Present',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/hasan-malik' }],
  },
  {
    name: 'Learn Coding & Animations in Lua',
    subtitle: 'Interactive eBook · PressBooks',
    badge: 'Published',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    context: 'w/ Prof. Rutwa Engineer · PressBooks',
    description:
      'Co-authored a 16,000-word active-learning eBook with 34 exercises teaching game development through Roblox Studio. Designed for high school students with no prior coding experience.',
    tech: ['Lua', 'Roblox Studio', 'Game Dev', 'Education'],
    year: 'Jan–May 2025',
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
          <h2 className="text-4xl md:text-5xl font-black text-apple-dark tracking-tight">
            Selected Work
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
              className="group p-7 bg-white border border-apple-border rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${project.badgeColor}`}>
                  {project.badge}
                </span>
                <span className="text-xs text-apple-gray">{project.year}</span>
              </div>

              <h3 className="text-2xl font-black text-apple-dark tracking-tight mb-1">
                {project.name}
              </h3>
              <p className="text-sm font-medium text-apple-gray mb-1">{project.subtitle}</p>
              <p className="text-xs text-apple-blue mb-4">{project.context}</p>

              <p className="text-sm text-apple-gray leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-2.5 py-1 bg-apple-light text-apple-dark rounded-md"
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
                    className="text-sm font-semibold text-apple-dark hover:text-apple-blue transition-colors duration-200"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
