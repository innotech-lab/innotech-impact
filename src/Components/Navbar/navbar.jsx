import React, { useState } from "react";
import "./navbar.css";
import Inno from "../../assets/Inno.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">

      {/* ===== TOP HEADER ===== */}
      <div className="top-header">

        <div className="logo">
          <img src={Inno} alt="Innotech Impact" />
        </div>

        <div className="contact-info">
          <div className="info">
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <strong>Contact</strong>
              <p>Gitega, Burundi</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="info">
            <i className="fa-solid fa-envelope"></i>
            <div>
              <strong>Email</strong>
              <p>info@innotech.bi</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="info">
            <i className="fa-solid fa-phone"></i>
            <div>
              <strong>Call</strong>
              <p>+257 00 00 00</p>
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
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Services</a></li>
          <li><a href="/">Projects</a></li>
          <li><a href="/">Portfolio</a></li>
          <li><a href="/">Formation</a></li>
          <li><a href="/">Contact</a></li>
        </ul>

        <div className="nav-right">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <button className="quote-btn">Devis</button>
        </div>

      </nav>

    </header>
  );
};

export default Navbar;
