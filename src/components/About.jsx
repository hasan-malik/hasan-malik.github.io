import { motion } from 'framer-motion'

const roles = [
  {
    icon: '📱',
    title: 'iOS Developer',
    desc: 'Swift & SwiftUI — building native apps that feel at home on Apple platforms.',
  },
  {
    icon: '⚡',
    title: 'Full-Stack Engineer',
    desc: 'React, Flask, PostgreSQL — end-to-end products, from database to pixel.',
  },
  {
    icon: '🔬',
    title: 'Researcher',
    desc: 'Collaborating with professors to rethink how knowledge is built and shared.',
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
            CS student at the University of Toronto — building at the intersection of iOS,
            full-stack, and research. I love shipping products that feel effortless to use:
            the kind where the engineering is invisible and the experience is everything.
            First-Year Representative. Always chasing the next hard problem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
