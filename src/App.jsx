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
import './App.css'

function App() {
  return (
    <div className='app'>
<<<<<<< HEAD
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
      </Routes>
      <Footer />
=======
    <Navbar/>
    <Home/>
    <About/>
    <Service />
    <Temoignage/>
    <Contact />
    <Section/>
    <Footer/>
>>>>>>> c5e956e49ca7aee6f6325d9e66c08fc3a686fb23
    </div>

  )
}

export default App
