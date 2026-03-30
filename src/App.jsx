import { useState } from 'react'
import Navbar from './Components/Navbar/navbar'
import Footer from './Components/Footer/footer'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Footer from "./Components/Footer/footer";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
    <Navbar/>
    <Footer/>
    </div>
   
  )
}

export default App
