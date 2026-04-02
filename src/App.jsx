import { useState } from 'react'
import Navbar from './Components/Navbar/navbar'
import Home from './Components/Home/home'
import Footer from './Components/Footer/footer'
import About from './Components/About/about'
import Section from './Components/Section/section'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
    <Navbar/>
    <About/>
    <Section/>
    <Footer/>
    </div>
   
  )
}

export default App
