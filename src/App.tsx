import Navbar from './components/ui/Navbar'
import Hero from './components/sections/Hero'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  )
}
