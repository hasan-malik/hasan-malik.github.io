import { motion } from 'framer-motion'

const skillGroups = [
  {
    category: 'Languages',
    skills: [
      'Python', 'JavaScript', 'TypeScript', 'Swift',
      'C', 'C++', 'Java', 'SQL', 'Lua', 'MIPS Assembly', 'HTML', 'CSS',
    ],
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      'React.js', 'SwiftUI', 'TailwindCSS', 'Three.js',
      'Flask', 'PyTorch', 'Java Swing',
    ],
  },
  {
    category: 'Tools & Platforms',
    skills: [
      'PostgreSQL', 'Supabase', 'Git', 'Vite',
      'SFSpeechRecognizer', 'Roblox Studio', 'PressBooks',
    ],
  },
]

export default function Skills() {
  return (
    <section className="py-28">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-apple-blue tracking-widest uppercase mb-3">
            Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-apple-dark">My </span>
            <span className="text-apple-blue">Technologies</span>
          </h2>
        </motion.div>

        <div className="space-y-10">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-black text-apple-gray tracking-widest uppercase mb-4">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-apple-light/60 border border-apple-border rounded-full text-sm font-medium text-apple-dark hover:border-apple-blue hover:text-apple-blue transition-all duration-200 cursor-default backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
