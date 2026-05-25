import { motion } from 'framer-motion'

const roles = [
  {
    icon: '🤖',
    title: 'Agentic AI',
    desc: "FlipPilot's e-commerce agent and Aspuru-Guzik's Matter Lab.",
  },
  {
    icon: '⚡',
    title: 'Full-Stack Developer',
    desc: 'Shipped end-to-end web and iOS products, database to pixel.',
  },
  {
    icon: '🏆',
    title: 'Hackathons',
    desc: 'Sparky (Winner, Western) and StarTooth (3rd, SmileHacks).',
  },
  {
    icon: '🔬',
    title: 'ML Research',
    desc: 'Tuning VLM inference on Jetson at the Matter Lab.',
  },
  {
    icon: '📊',
    title: 'Data Analysis',
    desc: 'A 620K-trip Toronto transit digital twin in TransitSim.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            <span className="text-apple-dark">About </span>
            <span className="text-apple-blue">Me</span>
          </h2>
          <p className="text-lg text-apple-gray font-light max-w-2xl mx-auto leading-relaxed">
            CS student at the University of Toronto, working across AI infrastructure,
            full-stack, and iOS. Currently building agentic AI pipelines at FlipPilot
            (Best Intern Award) and productionizing a 55-package agentic stack at
            Prof. Alan Aspuru-Guzik's Matter Lab. I love shipping products where the
            engineering is invisible and the experience is everything. Always chasing
            the next hard problem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 bg-apple-light/60 border border-apple-border rounded-2xl backdrop-blur-sm text-center"
            >
              <div className="text-3xl mb-4">{role.icon}</div>
              <h3 className="text-lg font-bold text-apple-dark mb-2">{role.title}</h3>
              <p className="text-sm text-apple-gray leading-relaxed">{role.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
