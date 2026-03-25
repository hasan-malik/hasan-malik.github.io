import { motion } from 'framer-motion'
import SignatureWatermark from './SignatureWatermark'
import GitHubActivity from './GitHubActivity'

export default function Contact() {
  return (
    <footer id="contact" className="py-20 border-t border-apple-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold text-apple-blue tracking-widest uppercase mb-3">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              <span className="text-apple-dark">Let's </span>
              <span className="text-apple-blue">Talk.</span>
            </h2>
            <a
              href="mailto:hasan.malik@mail.utoronto.ca"
              className="text-lg font-medium text-apple-gray hover:text-apple-blue transition-colors duration-200"
            >
              hasan.malik@mail.utoronto.ca
            </a>
          </motion.div>

          <SignatureWatermark className="hidden md:block w-72 h-36" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-8"
          >
            {[
              { label: 'GitHub',   href: 'https://github.com/hasan-malik'         },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/hasan-malik-/'   },
              { label: 'Resume',   href: '/resume.pdf'                              },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-apple-gray hover:text-apple-blue transition-colors duration-200"
              >
                {label} ↗
              </a>
            ))}
          </motion.div>

        </div>

        <div className="mt-16 pt-8 border-t border-apple-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-sm font-bold text-apple-dark block">Hasan Malik</span>
            <span className="text-sm text-apple-gray">CS @ University of Toronto · 2028</span>
          </div>
          <GitHubActivity />
        </div>

      </div>
    </footer>
  )
}
