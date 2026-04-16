import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/navbar'
import Home from './Components/Home/home'
import Footer from './Components/Footer/footer'
import About from './Components/About/about'
import Section from './Components/Section/section'
import Temoignage from './Components/Temoignage/temoignage'
import Service from './Components/Service/service'
import Contact from './Components/Contact/contact'
import DetailAbout from './page/DetailAbout/DetailAbout'
import DetailService from './page/DetailService/DetailService'
import Portfolio from './page/Portfolio/Portfolio'
import Projects from './page/Projects/Projects'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <About />
            <Service />
            <Temoignage />
            <Contact />
            <Section />
          </>
        } />
        <Route path="/about" element={<DetailAbout />} />
        <Route path="/services" element={<DetailService />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </div>

  )
}

export default App
