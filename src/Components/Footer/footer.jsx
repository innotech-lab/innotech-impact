import React from "react";
import "./footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* Main footer */}
      <footer className="footer">

        <div className="footer-container">

          {/* Contact */}
          <div className="footer-col">
            <h3>Innotech</h3>

            <p className="desc">
              The charm of pleasure of the moment, so blinded by desire,
              that they cannot foresee the pain and trouble.
            </p>

            <p><FaMapMarkerAlt /> 30 Commercial Road Fratton, Australia</p>
            <p><FaEnvelope /> insurin@company.com</p>
            <p><FaClock /> Mon – Sat: 8am – 5pm</p>

            <div className="socials">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
            </div>
          </div>

          {/* Company links */}
          <div className="footer-col">
            <h4>Our Company</h4>
            <ul>
              <li>Our Story</li>
              <li>News & Blog</li>
              <li>Careers</li>
              <li>Customer Support</li>
              <li>Contact Us</li>
              <li>Website Accessibility</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4>Subscribe newsletter</h4>

            <div className="newsletter">
              <input type="email" placeholder="Email" />
              <button>Subscribe Now</button>
            </div>

          </div>

        </div>

        <div className="footer-bottom">
          Copyright © 2022 INNOTECH — All Rights Reserved
        </div>

      </footer>
    </>
  );
};

export default Footer;
