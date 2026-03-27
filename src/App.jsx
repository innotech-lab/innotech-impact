import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
    <Navbar/>
    </div>
   
  )
}

export default App
