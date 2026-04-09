import { useState } from 'react'
import Navbar from './Components/Navbar/navbar'
import Home from './Components/Home/home'
import Footer from './Components/Footer/footer'
import About from './Components/About/about'
import Section from './Components/Section/section'
import Temoignage from './Components/Temoignage/temoignage'
import Service from './Components/Service/service'
import Contact from './Components/Contact/contact'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
    <Navbar/>
    <Home/>
    <About/>
    <Service />
<<<<<<< HEAD
    <Temoignage/>
=======
    <Contact />
>>>>>>> 5d2d808b62433f9644a14a6f5190356a34b0ce27
    <Section/>
    <Footer/>
    </div>
   
  )
}

export default App
