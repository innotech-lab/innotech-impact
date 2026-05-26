import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// On importe toutes les icônes pour pouvoir les utiliser dynamiquement via le nom en base de données
import * as LucideIcons from 'lucide-react';
import { useInView } from "../../hooks/useInView";
import PartnerSlider from "../../Components/Section/section";
import "./DetailAbout.css";
import aboutImg from "../../assets/ordi1.png";

// Les valeurs statiques sont remplacées par l'appel API

const DetailAbout = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [v, setV] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    about_title: "NOTRE HISTOIRE",
    about_description: "INNOTECH IMPACT est une force motrice de l'innovation technologique au Burundi..."
  });
  const [companyValues, setCompanyValues] = useState([]);
  const valuesRef = useInView();

  useEffect(() => {
    // Animation de la bannière
    const t = setTimeout(() => setV(true), 500);
    
    // Récupération des valeurs depuis l'API
    fetch('http://127.0.0.1:8000/api/company-values/')
      .then(res => res.json())
      .then(data => setCompanyValues(data))
      .catch(err => console.error(err));

    // Récupération des infos de l'entreprise
    fetch('http://127.0.0.1:8000/api/company-info/')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setCompanyInfo(data[0]);
      })
      .catch(err => console.error(err));

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="detail-about-container">
      
      {/* PAGE BANNER SECTION */}
      <div className="about-banner">
        <div className="banner-dot-pattern" />
        <div className="banner-glow glow-1" />
        <div className="banner-glow glow-2" />
        
        <div className="banner-content-wrapper">
          <div className={`banner-animation-container ${v ? 'in-view' : ''}`}>
            <h1 className="banner-title">À Propos d'Innotech</h1>
            <p className="banner-subtitle">
              Expertise technologique, transformation numérique et innovation au service de votre réussite.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: QUI SOMMES-NOUS */}
      <section className="about-section">
        <div className="about-image">
          <img src={companyInfo.about_image || aboutImg} alt="about" />
        </div>

        <div className="about-content">
          <h2>{companyInfo.about_title}</h2>
          <p style={{ whiteSpace: "pre-line" }}>
            {companyInfo.about_description}
          </p>

          <div className="about-buttons">
            <Link to="/services" className="btn-outline">
              Services <span>→</span>
            </Link>
            <Link to="/contact" className="btn-filled">
              Contactez-Nous <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: MISSION, VISION, VALUES (INTERACTIVE) */}
      <section className="about-mission">
        <div className="mission-container">
          
          <div className="mission-header">
            <span className="badge">Principes Fondamentaux</span>
            <h2 className="section-title">Mission, Vision & Valeurs</h2>
          </div>

          <div ref={valuesRef.ref} className={`accordion-flex ${valuesRef.inView ? 'in-view' : ''}`}>
            {companyValues.map((val, i) => {
              const isActive = activeValue === i;
              const Icon = LucideIcons[val.icon_name] || LucideIcons.HelpCircle;
              
              return (
                <div 
                  key={val.id || val.title} 
                  onMouseEnter={() => setActiveValue(i)}
                  className={`accordion-item ${isActive ? 'active' : ''}`}
                >
                  {/* Background Image */}
                  <div 
                    className="item-bg"
                    style={{ backgroundImage: `url(${val.image})` }}
                  />
                  
                  {/* Overlays */}
                  <div className="item-overlay-dark" />
                  <div className={`item-overlay-color color-${i % 3}`} />

                  {/* Content */}
                  <div className="item-content">
                    <div className="icon-wrapper">
                      <Icon className="icon-main" />
                    </div>
                    
                    <h3 className="item-title">
                      {val.title}
                    </h3>
                    
                    <div className="item-details">
                      <p className="item-desc">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: NOS PARTENAIRES */}
      <section className="about-partners">
        <div className="mission-container">
          <div className="mission-header">
            <span className="badge">Ils nous font confiance</span>
            <h2 className="section-title">Nos Partenaires</h2>
          </div>
          <PartnerSlider />
        </div>
      </section>

    </div>
  );
};

export default DetailAbout;
