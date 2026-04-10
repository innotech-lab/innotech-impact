import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/Home/home";
import Footer from "./Components/Footer/footer";
import About from "./Components/About/about";
import Section from "./Components/Section/section";
import Temoignage from "./Components/Temoignage/temoignage";
import Service from "./Components/Service/service";
import Contact from "./Components/Contact/contact";
import Formation from "./page/Formation/formation";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Page Accueil */}
        <Route 
          path="/" 
          element={
            <>
              <Home/>
              <About/>
              <Service />
              <Temoignage/>
              <Contact />
              <Section/>
            </>
          } 
        />

        {/* Page Formation */}
        <Route path="/formation" element={<Formation />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;