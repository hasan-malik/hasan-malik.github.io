import { motion } from 'framer-motion'
import GitHubActivity from './GitHubActivity'

const badges = [
  { label: '4.00 GPA',            sub: 'University of Toronto'       },
  { label: '2× Hackathon Winner', sub: 'Solo + Team'                 },
  { label: 'World Record Holder', sub: "World's Youngest Sports Author" },
  { label: 'Cambridge Award',     sub: 'Highest CS Score in Punjab'  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20">
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">

        <motion.p
          {...fadeUp(0)}
          className="text-sm font-semibold text-apple-blue tracking-widest uppercase mb-6"
        >
          Computer Science · University of Toronto · Class of 2028
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-black leading-none tracking-tighter mb-6"
          style={{ fontSize: 'clamp(72px, 11vw, 130px)' }}
        >
          <span className="text-apple-dark">Hasan</span><br />
          <span className="text-apple-blue">Malik.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-xl md:text-2xl text-apple-gray font-light max-w-lg leading-relaxed mb-10"
        >
          Building things that scale, solve hard problems, and last.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-wrap gap-2.5 mb-12"
        >
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-apple-light/60 rounded-full border border-apple-border backdrop-blur-sm"
            >
              <span className="text-sm font-semibold text-apple-dark">{badge.label}</span>
              <span className="hidden sm:inline text-sm text-apple-gray">·</span>
              <span className="hidden sm:inline text-sm text-apple-gray">{badge.sub}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp(0.4)}
          className="flex items-center gap-6 mb-8"
        >
          <a
            href="#work"
            className="px-6 py-3 bg-apple-blue text-white rounded-full text-sm font-semibold hover:bg-blue-500 transition-colors duration-200"
          >
            See My Work
          </a>
          <a
            href="https://github.com/hasan-malik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-apple-gray hover:text-apple-dark transition-colors duration-200"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/hasan-malik-/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-apple-gray hover:text-apple-dark transition-colors duration-200"
          >
            LinkedIn ↗
          </a>
        </motion.div>

        <motion.div {...fadeUp(0.5)} className="max-w-sm">
          <GitHubActivity />
        </motion.div>

      </div>
    </section>
  )
}
