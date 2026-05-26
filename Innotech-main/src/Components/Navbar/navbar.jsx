import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Innotech from "../../assets/Innotech.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    address: "Gitega, Burundi",
    email: "info@innotech.bi",
    phone: "+257 00 00 00"
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/company-info/')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setCompanyInfo(data[0]);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <header className="header">

      {/* ===== TOP HEADER ===== */}
      <div className="top-header">

        <div className="logo">
          <img src={Innotech} alt="Innotech Impact" />
        </div>

        <div className="contact-info">
          <div className="info">
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <strong>Contact</strong>
              <p>{companyInfo.address}</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="info">
            <i className="fa-solid fa-envelope"></i>
            <div>
              <strong>Email</strong>
              <p>{companyInfo.email}</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="info">
            <i className="fa-solid fa-phone"></i>
            <div>
              <strong>Call</strong>
              <p>{companyInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">

        {/* Hamburger */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>

        <ul className={menuOpen ? "menu active" : "menu"}>

          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/team">Équipe</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/formation">Formation</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="nav-right">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <Link to="/devis" className="quote-btn" style={{ textDecoration: 'none' }}>
            Devis 
          </Link>
        </div>

      </nav>

    </header>
  );
};

export default Navbar;
