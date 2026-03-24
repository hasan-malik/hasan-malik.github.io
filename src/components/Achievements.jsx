import { motion } from 'framer-motion'

const achievements = [
  {
    category: 'WORLD RECORD',
    title: "World's Youngest Sports Author",
    subtitle: 'Guinness World Record · 2024',
    detail:
      'Published "Ten Moments That Changed Cricket" — 26,000 words, 130+ pages. Available at Walmart, Barnes & Noble, Amazon, and 15+ bookstores worldwide.',
    accent: 'border-l-amber-400',
  },
  {
    category: 'ACADEMIC',
    title: 'GPA 4.00 / 4.00',
    subtitle: 'University of Toronto · UofT Scholar Award · First-Year Representative',
    detail:
      'Differential Calc 96% · Integral Calc 95% · Computer Organization 91% · Theory of Computation 94% · Intro to CS 97% · Software Design 93% · Intro to Philosophy 93%',
    accent: 'border-l-apple-blue',
  },
  {
    category: 'AWARD',
    title: 'Cambridge Outstanding Learner Award',
    subtitle: 'Highest CS Score in the Punjab Province',
    detail:
      'Medal in Computer Science. Recognized among all Cambridge students across Punjab — one of the largest exam boards globally.',
    accent: 'border-l-violet-400',
  },
  {
    category: 'OLYMPIAD',
    title: '1st in Pakistan — Robotics & Biology',
    subtitle: 'LGS Innoventions 2023 · National Science Olympiad',
    detail:
      'Team ranked 1st nationally in Robotics and 1st in Biology. Also ranked 2nd in Mathematics at LGS Scienject 2023 — awarded Overall Best Team.',
    accent: 'border-l-emerald-400',
  },
  {
    category: 'DEBATE',
    title: 'Harvard MUN Best Delegate',
    subtitle: 'Harvard YMUN 2022 · Member of Best Delegation',
    detail:
      '15 national and international MUN awards across Pakistan, Canada, Bahrain, and Indonesia. Trained 40 juniors to win Best Young Delegation at LUMUN 2023.',
    accent: 'border-l-rose-400',
  },
  {
    category: 'ACADEMIC',
    title: 'SAT 1580 — 99th Percentile',
    subtitle: 'Among 5,600,000 students worldwide',
    detail:
      'Also: 1st in Batch at AS Levels 2023 · Most Diligent Prefect · School Prefect · Yearbook Editor · Red Blazer recipient · Club President at Aitchison College.',
    accent: 'border-l-sky-400',
  },
  {
    category: 'FOUNDER',
    title: 'The Cricketing Hour',
    subtitle: "Pakistan's Largest Youth-Run Sports Blog · 2023",
    detail:
      'Over 60 videos covering major cricket news, long-form analyses, and bite-sized Reels. 50,000+ views and 5,000+ followers on Instagram; 5,000+ views on YouTube.',
    accent: 'border-l-green-400',
  },
]

export default function Achievements() {
  return (
    <section id="recognition" className="py-28">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-apple-blue tracking-widest uppercase mb-3">
            Recognition
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-apple-dark tracking-tight">
            Awards & Honours
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`p-7 bg-white border border-apple-border rounded-2xl border-l-4 ${item.accent} hover:shadow-lg transition-shadow duration-300`}
            >
              <p className="text-xs font-black text-apple-gray tracking-widest mb-3">
                {item.category}
              </p>
              <h3 className="text-xl font-black text-apple-dark tracking-tight mb-1">
                {item.title}
              </h3>
              <p className="text-sm font-semibold text-apple-blue mb-3">{item.subtitle}</p>
              <p className="text-sm text-apple-gray leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
