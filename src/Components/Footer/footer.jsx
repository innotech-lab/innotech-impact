import React from "react";
import "./footer.css";
import Innotech from "../../assets/Innotech.png";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <img src={Innotech} alt="Innotech Impact" />

          <p>
            Innovation pour tous. We create smart digital solutions
            that help businesses grow through modern technology.
          </p>

          <div className="socials">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="footer-links">
          <h3>Navigation</h3>
          <ul>
            <li>About Us</li>
            <li>Services</li>
            <li>Projects</li>
            <li>Portfolio</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-links">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h3>Contact</h3>

          <p><FaMapMarkerAlt /> Gitega, Burundi</p>
          <p><FaEnvelope /> info@innotech.bi</p>
          <p><FaClock /> Mon – Sat : 8h – 17h</p>

          <div className="newsletter">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} INNOTECH IMPACT — Innovation pour tous
      </div>

    </footer>
  );
};

export default Footer;
