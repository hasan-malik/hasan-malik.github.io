import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Stars from './components/Stars'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Skills from './components/Skills'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
}

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="bg-apple-bg min-h-screen relative">
      <Stars />
      <div className="relative z-10">
        <Nav currentPage={page} onNavigate={setPage} />

        <AnimatePresence mode="wait">
          {page === 'home' ? (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <main>
                <Hero />
                <About />
                <Projects />
                <Experience />
                <Achievements />
                <Skills />
              </main>
              <Contact />
            </motion.div>
          ) : (
            <motion.div key="gallery" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Gallery onBack={() => setPage('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
