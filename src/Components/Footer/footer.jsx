import React from "react";
import "./footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Innotech from "../../assets/Innotech.png";
import { FaFacebookF, FaInstagram, FaYoutube, FaPhone, FaMapMarkerAlt, FaCrosshairs } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you!");
  };

  return (
 <footer className="footer">
      <div className="container">

        {/* LEFT */}
        <div className="footer-box about">
          <h2 className="logo">Innotech</h2>

          <p>
            The charms of pleasure of the expect moment, so blinded by desire,
            thats they cannot fores that bound to.
          </p>

          <div className="socials">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>

        {/* CONTACT */}
        <div className="footer-box">
          <h3>Contact info</h3>

          <div className="contact-item">
            <i className="fa fa-location-dot"></i>
            <span>
              30 Commercial Road <br />
              Fratton, Australia
            </span>
          </div>

          <div className="contact-item">
            <i className="fa fa-envelope"></i>
            <span>
              insurin@company.com <br />
              1-888-452-1505
            </span>
          </div>

          <div className="contact-item">
            <i className="fa fa-phone"></i>
            <span>
              Mon – Sat: 8 am – 5 pm, <br />
              Sunday: CLOSED
            </span>
          </div>
        </div>

        {/* COMPANY */}
        <div className="footer-box">
          <h3>Our Company</h3>

          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">News & Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Website Accessibility</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-box">
          <h3>Subscribe newsletter</h3>

          <input type="email" placeholder="Email" />
          <button>Subscribe Now</button>
        </div>

      </div>

      <div className="copyright">
        © {year} INNOTECH — Created by Team Innotech
      </div>

    </footer>
  );
};

export default Footer;