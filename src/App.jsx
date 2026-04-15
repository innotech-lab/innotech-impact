import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/navbar'
import Home from './Components/Home/home'
import Footer from './Components/Footer/footer'
import About from './Components/About/about'
import Section from './Components/Section/section'
import Temoignage from './Components/Temoignage/temoignage'
import Service from './Components/Service/service'
import Background from './Components/Background/background'
import Contact from './Components/Contact/contact'
import DetailAbout from './page/DetailAbout/DetailAbout'
import Formation from './page/Formation/formation'
import ContactPage from './page/Contact/contact'
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
            <Background />
            <Section />
          </>
        } />
        <Route path="/about" element={<DetailAbout />} />
        <Route path="/formation" element={<Formation />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
