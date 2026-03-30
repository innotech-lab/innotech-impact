<<<<<<< HEAD
import React from "react";
import "./footer.css";
import Logor from "../../assets/Logor.png";b
import { FaFacebookF, FaInstagram, FaYoutube, FaPhone, FaMapMarkerAlt, FaCrosshairs } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you!");
  };

  return (
    <footer className="pms-footer">

      <div className="pms-inner">

        {/* Brand */}
        <div className="pms-block pms-brand">
          <img src={Logor} alt="" className="pms-logo" />
          <p className="pms-desc">
            Learn music with passion and professionalism. Lessons for all ages.
          </p>
        </div>

        {/* Links */}
        <div className="pms-block">
          <h4>Links</h4>
          <ul className="pms-list">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Web&Mobile</a></li>
            <li><a href="/teachers">Formation</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="pms-block">
          <h4>Newsletter</h4>
          <p>Receive our tips, events, and offers.</p>

          <form className="pms-news" onSubmit={handleSubmit}>
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>

          <p className="pms-note">We respect your privacy.</p>
        </div>

        {/* Contact */}
        <div className="pms-block">
          <h4>Contact</h4>

          <p className="contact-item">
            <FaMapMarkerAlt />Kabondo, Bujumbura, Burundi
          </p>

          <p className="contact-item">
            <FaPhone /> +25763833
          </p>

          <p className="contact-item">
            <FaCrosshairs /> Kabondo, Burundi
          </p>

          <div className="pms-social">
            <a href="#" className="social-facebook">
              <FaFacebookF />
            </a>

            <a href="#" className="social-instagram">
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@danny_bay"
              target="_blank"
              rel="noopener noreferrer"
              className="social-youtube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

      </div>

      <div className="pms-bottom">
        © {year} INNOTECH — Created by Team Innotech
      </div>

    </footer>
  );
};

export default Footer;
=======
import React from 'react'
import './footer.css'
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>

                <div className='footer-content-left'>
                    <h3>Mon Site</h3>
                    <p>Suivez-nous sur les réseaux sociaux</p>
                </div>

                <div className='footer-content-center'>
                    <h4>Liens utiles</h4>
                    <ul>
                        <li>Accueil</li>
                        <li>À propos</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className='footer-content-right'>
                    <h4>Réseaux sociaux</h4>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className='item'><FaFacebook />Facebook</a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className='item'><FaYoutube />YouTube</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className='item'><FaInstagram />Instagram</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer
>>>>>>> a597f90d3d29682184887805a40f51c60e68a4a6
