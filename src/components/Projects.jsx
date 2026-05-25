import { motion } from 'framer-motion'

const projects = [
  {
    name: 'TransitSim',
    subtitle: 'Toronto Transit Digital Twin',
    badge: 'Personal',
    badgeColor: 'bg-cyan-900/60 text-cyan-300 border-cyan-700',
    context: 'Python · FastAPI · React',
    description:
      'A parameterized 3D digital twin simulating 620K daily Toronto trips across 11 climate/GDP metrics. Solves a multi-modal convex optimization problem to cut simulated CO₂ by 72% under a 26-minute commute cap, ships a public 6-mode simulation API on a containerized cloud runtime, and prevents Python/JS engine drift to a 10⁻⁹ relative tolerance via a cross-language parity test harness.',
    tech: ['Python', 'JavaScript', 'FastAPI', 'NumPy', 'React'],
    year: '2026',
    gradient: 'from-cyan-900/80 to-sky-900/80',
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/hasan-malik/TransitSim' },
      { label: 'Live ↗',   href: 'https://hasan-malik.github.io/TransitSim/' },
    ],
  },
  {
    id: 'tensorflow-probability',
    name: 'TensorFlow Probability',
    subtitle: 'Open-Source Contributor',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-900/60 text-indigo-300 border-indigo-700',
    context: 'Google · TensorFlow',
    description:
      'Expanded the BFGS optimization engine by engineering configurable line-search tuning parameters, and validated parameter forwarding across 2 optimization trajectories using Rosenbrock convergence tests.',
    tech: ['Python', 'TensorFlow', 'Open Source'],
    year: '2025',
    gradient: 'from-indigo-900/80 to-blue-900/80',
    links: [
      { label: 'PR #2023 ↗', href: 'https://github.com/tensorflow/probability/pull/2023' },
      { label: 'PR #2024 ↗', href: 'https://github.com/tensorflow/probability/pull/2024' },
    ],
  },
  {
    id: 'uc-borrowbox',
    name: 'UC BorrowBox',
    subtitle: 'Residence Peer-to-Peer Exchange',
    badge: 'Full-Stack',
    badgeColor: 'bg-rose-900/60 text-rose-300 border-rose-700',
    context: 'University College · Residence',
    description:
      'Cut duplicate-purchase waste across 3 residence halls via a peer-to-peer exchange supporting 3 transaction types. Standardized an 8-view crossplatform UI by codifying Apple’s 11-step type scale and color system into design tokens.',
    tech: ['Railway', 'Node.js', 'Express', 'PostgreSQL', 'React'],
    year: '2025',
    gradient: 'from-rose-900/80 to-pink-900/80',
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/hasan-malik/UC-BorrowBox' },
      { label: 'Live ↗',   href: 'https://ucborrowbox.netlify.app' },
    ],
  },
  {
    name: 'StarTooth',
    subtitle: 'Dental X-Ray Visualizer',
    badge: 'Overall 3rd Prize',
    badgeColor: 'bg-amber-900/60 text-amber-300 border-amber-700',
    context: 'SmileHacks Toronto',
    description:
      'Synthesizes interactive 3D dental anatomy from 2D X-ray inputs via a client-side graphics rendering pipeline. Simulates clinical pathologies and treatments — e.g. extractions — through real-time 3D mesh modifications, and facilitates post-appointment consultation via role-based Q&A channels with persistent 3D annotations.',
    tech: ['TypeScript', 'Next.js', 'React', 'PostgreSQL'],
    year: 'Feb 2026',
    gradient: 'from-sky-900/80 to-blue-900/80',
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/notjackl3/smilehacks' },
    ],
  },
  {
    name: 'Sparky',
    subtitle: 'Elderly Care Coordinator',
    badge: 'Hackathon Winner',
    badgeColor: 'bg-emerald-900/60 text-emerald-300 border-emerald-700',
    context: 'Spark Case Competition × Hackathon, Western University',
    description:
      'A conversational iOS logistics agent coordinating medical transit in low-infrastructure regions. Eliminates LLM medical liability by parsing vocal inputs into deterministic, synonym-matched intents, and streamlines patient-to-driver matching via a priority algorithm for scarce transportation assets.',
    tech: ['SwiftUI', 'SFSpeechRecognizer', 'iOS'],
    year: 'Feb 2026',
    gradient: 'from-emerald-900/80 to-teal-900/80',
    links: [
      { label: 'GitHub ↗',  href: 'https://github.com/hasan-malik/sparky' },
      { label: 'Devpost ↗', href: 'https://devpost.com/software/sparky-ykhqn0' },
    ],
  },
  {
    name: 'Insight',
    subtitle: 'Vision Assistant for Blind Users',
    badge: 'MacHacks',
    badgeColor: 'bg-fuchsia-900/60 text-fuchsia-300 border-fuchsia-700',
    context: 'MacHacks · McMaster University',
    description:
      'An iOS conversational agent for blind users, running VLM inference at 1Hz on scene-change to describe surroundings. Enables hands-free GPS navigation with four phases of haptic cues by polling waypoint distance every 2s.',
    tech: ['SwiftUI', 'Swift', 'AVSpeechFoundation', 'VLM'],
    year: '2025',
    gradient: 'from-fuchsia-900/80 to-purple-900/80',
    links: [
      { label: 'GitHub ↗',  href: 'https://github.com/hasan-malik/Insight' },
      { label: 'Devpost ↗', href: 'https://devpost.com/software/insight-t439sl' },
    ],
  },
  {
    name: 'Beamer+',
    subtitle: 'Next-Gen Academic Presentations',
    badge: 'Research',
    badgeColor: 'bg-violet-900/60 text-violet-300 border-violet-700',
    context: 'w/ Prof. Chandra Gummaluru · Open Source',
    description:
      'Reimagining how academic knowledge is presented. Built-in graphing tools, a coding console, split-view for multiple slides, AI-summarized Q&A, and video recording. In active development.',
    tech: ['Research', 'Open Source', 'Education'],
    year: 'Dec 2025–Present',
    gradient: 'from-violet-900/80 to-purple-900/80',
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/chandra-gummaluru/beamer-plus' },
      { label: 'Live ↗',   href: 'https://app.beamerplus.app' },
    ],
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
              id={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-apple-light/60 border border-apple-border rounded-2xl hover:border-apple-blue/40 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden backdrop-blur-sm scroll-mt-24"
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
