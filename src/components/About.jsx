import { motion } from 'framer-motion'

const scrollTo = (id) => (e) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const linkClass =
  'text-apple-blue font-medium hover:text-blue-400 transition-colors duration-200'

const roles = [
  {
    icon: '🤖',
    title: 'Agentic AI',
    desc: 'Autonomous agents for e-commerce at FlipPilot and self-driving quantum chemistry labs at The Matter Lab.',
  },
  {
    icon: '⚡',
    title: 'Full-Stack',
    desc: 'End-to-end pipelines for web apps, iOS applications, and open-source projects.',
  },
  {
    icon: '🏆',
    title: 'Hackathons',
    desc: ['Overall 3rd @ SmileHacks UofT', 'Winner @ Spark Hackathon Western'],
  },
  {
    icon: '📊',
    title: 'Data Analysis',
    desc: 'Built a parameterized urban mobility simulator for downtown Toronto.',
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
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 text-center">
            <span className="text-apple-dark">About </span>
            <span className="text-apple-blue">Me</span>
          </h2>

          <div className="max-w-3xl mx-auto text-apple-gray font-light leading-relaxed space-y-5">
            <p className="text-lg">
              I build full-stack, cloud, and agentic systems.{' '}
              <span className="text-apple-dark font-medium">
                My only rule: don't solve a problem that doesn't exist.
              </span>
            </p>

            <p className="text-lg">
              Winning hackathons at Spark Western University and SmileHacks UofT,
              I solve tangible problems with scalable software.
            </p>

            <div>
              <p className="text-xs font-black text-apple-dark tracking-widest uppercase mb-3">
                Ongoing Projects
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="#matter-lab" onClick={scrollTo('matter-lab')} className={linkClass}>
                    @ The Matter Lab
                  </a>
                  {' '}— research intern under Jiaru Bai and Allan Zhao.
                </li>
                <li>
                  <a href="#flippilot" onClick={scrollTo('flippilot')} className={linkClass}>
                    @ FlipPilot
                  </a>
                  {' '}— creating an AI agent to retrieve, analyze, and resell the best deals on e-commerce platforms.
                </li>
                <li>
                  <a href="#beamer-plus" onClick={scrollTo('beamer-plus')} className={linkClass}>
                    @ Beamer+ with Prof. Chandra Gummaluru
                  </a>
                  {' '}— designing a slideshow app for academics with a built-in coding shell, graphical function plotter, and enhanced audience interaction.
                </li>
                <li>
                  <a
                    href="#tensorflow-probability"
                    onClick={scrollTo('tensorflow-probability')}
                    className={linkClass}
                  >
                    @ Google TensorFlow Probability
                  </a>
                  {' '}— open-source contributor; PR #2023.
                </li>
              </ul>
            </div>

            <ul className="space-y-2">
              <li>
                <a href="#uc-borrowbox" onClick={scrollTo('uc-borrowbox')} className={linkClass}>
                  UC BorrowBox
                </a>
                {' '}— food-, utensil-, and item-sharing system for University College residents.
              </li>
              <li>
                <span className="text-apple-dark font-semibold">CricEngine</span>
                {' '}— unleashing the perfect iOS app for cricket statisticians.
              </li>
            </ul>

            <p>
              In my spare time, I play tennis & watch cricket — and hold the World
              Record for the Youngest Sports Author, publishing{' '}
              <a
                href="https://www.amazon.ca/Ten-Moments-That-Changed-Cricket/dp/9690029290"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Ten Moments That Changed Cricket
              </a>
              {' '}(800 copies across the globe, stocked at Walmart, Barnes & Noble, and more!).
            </p>

            <p>
              Emails to{' '}
              <a
                href="mailto:hasan.malik@mail.utoronto.ca"
                className="text-apple-blue hover:text-blue-400 transition-colors duration-200"
              >
                hasan.malik@mail.utoronto.ca
              </a>
              {' '}will find me.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
              {Array.isArray(role.desc) ? (
                <ul className="text-sm text-apple-gray leading-relaxed space-y-1">
                  {role.desc.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-apple-gray leading-relaxed">{role.desc}</p>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
