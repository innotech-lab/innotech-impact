import { useState } from 'react'
import Navbar from './Components/Navbar/navbar'
import Footer from './Components/Footer/footer'
import Section from './Components/Section/section'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
    <Navbar/>
    <Section/>
    <Footer/>
    </div>
   
  )
}

export default App
