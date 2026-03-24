import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Achievements />
        <Skills />
      </main>
      <Contact />
    </div>
  )
}

export default App
