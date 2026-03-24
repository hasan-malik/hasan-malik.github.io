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

function App() {
  return (
    <div className="bg-apple-bg min-h-screen relative">
      <Stars />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Achievements />
          <Skills />
          <Gallery />
        </main>
        <Contact />
      </div>
    </div>
  )
}

export default App
