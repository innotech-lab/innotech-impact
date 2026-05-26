/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║   CHAPITRE 16 : Footer.jsx — Newsletter & Infos Globales        ║
 * ║                  "Réutilisation et Inscription"                 ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * CE COMPOSANT ILLUSTRE : LA RÉUTILISATION DES DONNÉES
 * =====================================================
 * Le Footer est présent sur TOUTES les pages. Il doit donc charger 
 * les informations de contact (adresse, email, tel) pour qu'elles 
 * soient à jour partout.
 * 
 * 1. CHARGEMENT DES INFOS (GET) :
 *    ---------------------------
 *    Comme dans la page Contact, on appelle `/api/company-info/`.
 *    Si l'admin change le numéro de téléphone dans Django, le Footer 
 *    se met à jour sur tout le site instantanément.
 * 
 * 2. L'INSCRIPTION NEWSLETTER (POST) :
 *    -------------------------------
 *    C'est un mini-formulaire avec un seul champ. 
 *    On envoie `{ "email": "..." }` vers `/api/newsletter/`.
 *    Django vérifie si l'email existe déjà (contrainte UNIQUE dans le modèle).
 * 
 * 3. FEEDBACK VISUEL :
 *    -----------------
 *    On utilise l'état `status` pour afficher "Bienvenue à bord ✨" 
 *    ou une erreur si l'email est déjà inscrit.
 */

import { useState, useEffect } from "react";
import "./footer.css";
import Innotech from "../../assets/Innotech.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  
  // Infos de contact (données partagées avec la page Contact)
  const [companyInfo, setCompanyInfo] = useState({
    address: "Kabondo Avenue Lac Rweru No7",
    email: "info@innotech.bi",
    phone: "+257 000 000"
  });

  // Récupération des infos au chargement global de l'app
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/company-info/')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setCompanyInfo(data[0]);
      })
      .catch(err => console.error("Erreur Footer info:", err));
  }, []);

  // Gestion de la Newsletter
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("Veuillez entrer un email");
      return;
    }

    setStatus("Abonnement en cours...");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus("Bienvenue à bord ✨");
        setEmail("");
      } else {
        // Django renvoie une erreur si l'email est déjà dans la base
        setStatus("Erreur ou email déjà inscrit.");
      }
    } catch (err) {
      setStatus("Erreur réseau.");
    }
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

        {/* LOGO & DESCRIPTION */}
        <div className="footer-brand">
          <img src={Innotech} alt="Innotech Impact" />
          <p>Empowering businesses with modern digital solutions and innovation.</p>
        </div>

        {/* LIENS RAPIDES */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          {quickLinks.map((item) => (
            <Link key={item.to} to={item.to}>
              <AiOutlineArrowRight /> {item.label}
            </Link>
          ))}
        </div>

        {/* CONTACT (DYNAMIQUE) */}
        <div className="footer-col contact-box">
          <h4>Contact</h4>
          <p className="contact-item"><i className="fa-solid fa-location-dot"></i> {companyInfo.address}</p>
          <p className="contact-item"><i className="fa-solid fa-envelope"></i> {companyInfo.email}</p>
          <p className="contact-item"><i className="fa-solid fa-phone"></i> {companyInfo.phone}</p>
          
          <div className="socials social-box">
            {socialIcons.map((Icon, i) => (
              <a key={i} href="#"><Icon /></a>
            ))}
          </div>
        </div>

        {/* NEWSLETTER (POST) */}
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
          {status && <span className="newsletter-status">{status}</span>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Innotech — Designed By Team Innotech</p>
      </div>
    </footer>
  );
};

export default Footer;
