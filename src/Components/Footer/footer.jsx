import { useState } from "react";
import "./footer.css";
import Innotech from "../../assets/Innotech.png";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { AiOutlineArrowRight } from "react-icons/ai";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("Enter email first");
      return;
    }

    setStatus("Subscribing...");

    setTimeout(() => {
      setStatus("Welcome aboard ✨");
      setEmail("");
    }, 1200);
  };

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/Formation", label: "Formation" },
    { to: "/contact", label: "Contact" },
  ];

  const socialIcons = [FaLinkedin, FaTwitter, FaFacebook, FaInstagram];

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="footer-container">

      {/* BRAND */}
        <div className="footer-brand">
          <img src={Innotech} alt="Innotech Impact" />
         <p>
            Empowering businesses with modern digital solutions and innovation.
          </p>
         </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          {quickLinks.map((item) => (
            <Link key={item.to} to={item.to}>
              <AiOutlineArrowRight /> {item.label}
            </Link>
          ))}
        </div>

       {/* CONTACT */}
      <div className="footer-col contact-box">
          <h4>Contact</h4>

        <p className="contact-item">
         <i className="fa-solid fa-location-dot"></i>
             Kabondo Avenue Lac Rweru No7
         </p>

       <p className="contact-item">
          <i className="fa-solid fa-envelope"></i>
           info@innotech.bi
       </p>

        <p className="contact-item">
           <i className="fa-solid fa-phone"></i>
             +257 000 000
         </p>

      <div className="socials social-box">
           {socialIcons.map((Icon, i) => (
             <a key={i} href="#">
              <Icon />
            </a>
           ))}
       </div>
          </div>

        {/* NEWSLETTER */}
        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Get updates straight to your inbox.</p>

          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>

          {status && <span>{status}</span>}

          <div className="contact">
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Innotech — Designed By Team Innotech
        </p>
      </div>

    </footer>
  );
};

export default Footer;
