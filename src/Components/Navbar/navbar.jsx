import React from "react";
import "./navbar.css";
import Logor from "../../assets/Logor.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  return (
    <header>
      {/* ===== TOP HEADER ===== */}
      <div className="top-header">
        <div className="logo">
          <img src={Logor} alt="Innotech Logo" className="logo-img" />
          <h2></h2>
        </div>

        <div className="contact-info">
          <div className="info">
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <strong>Contact us</strong>
              <p>25/2 Norda, Ukrain</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="info">
            <i className="fa-solid fa-envelope"></i>
            <div>
              <strong>Email us</strong>
              <p>info@insurin.com</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="info">
            <i className="fa-solid fa-phone"></i>
            <div>
              <strong>Free Call</strong>
              <p>(+02) – 23456789</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <ul className="menu">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>

          <li className="dropdown">
            <a href="#">
              Web&Mobile
            </a>
          </li>

          <li className="dropdown">
            <a href="#">
              Formation
            </a>
          </li>

          <li className="dropdown">
            <a href="#">
              Blog 
            </a>
          </li>

          <li className="dropdown">
            <a href="#">
              Portfolio
            </a>
          </li>
        </ul>

        <div className="nav-right">
          <button className="search-btn" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <button className="quote-btn">
            Devis
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;