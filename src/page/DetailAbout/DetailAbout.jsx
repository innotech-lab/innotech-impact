import React, { useState, useEffect } from "react";
import { Target, Eye, Heart } from 'lucide-react';
import { useInView } from "../../hooks/useInView";
import "./DetailAbout.css";
import aboutImg from "../../assets/hero.png";

const values = [
  // ... (keep original values)
  { 
    icon: Target, 
    title: 'Notre Mission', 
    desc: 'Donner à chaque client — particulier ou entreprise — les stratégies technologiques, les outils et l\'expertise nécessaires pour réaliser une transformation numérique durable.', 
    img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  { 
    icon: Eye, 
    title: 'Notre Vision', 
    desc: 'Être le partenaire technologique le plus fiable au monde, reconnu pour notre intégrité inébranlable, notre innovation constante et nos résultats clients mesurables.', 
    img: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  { 
    icon: Heart, 
    title: 'Nos Valeurs', 
    desc: 'La transparence, une responsabilité rigoureuse et une mentalité axée sur le client guident chaque décision, investissement et recommandation stratégique que nous prenons.', 
    img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
];

const DetailAbout = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [v, setV] = useState(false);
  const valuesRef = useInView();

  useEffect(() => {
    const t = setTimeout(() => setV(true), 500);
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
            <span className="banner-badge">
              <span className="badge-dot" />
              Qui Sommes-Nous ?
            </span>
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
          <img src={aboutImg} alt="about" />
        </div>

        <div className="about-content">
          <h2>NOTRE HISTOIRE</h2>
          <p>
            INNOTECH IMPACT est une force motrice de l'innovation technologique au Burundi. 
            Depuis notre fondation à Gitega, nous nous sommes donnés pour mission de briser 
            les barrières numériques et d'offrir des solutions de pointe accessibles à tous.
          </p>
          <p>
            Notre parcours est marqué par une volonté inébranlable d'accompagner les entreprises 
            et les jeunes innovateurs dans leur transformation numérique. Innotech Impact est 
            plus qu'une entreprise ; c'est un catalyseur de progrès, créant un pont entre 
            les visions d'aujourd'hui et les réalités de demain.
          </p>
          <p>
            Nous croyons que la technologie est un levier puissant pour le développement. 
            C'est pourquoi nous investissons dans des solutions intelligentes, fiables et 
            collaboratives qui répondent aux défis uniques de notre époque et propulsent 
            nos clients vers une réussite durable.
          </p>
          <p>
            Chez INNOTECH IMPACT, chaque projet est une opportunité de débloquer des possibilités 
            infinies et de construire ensemble un futur numérique prospère.
          </p>

          <div className="about-buttons">
            <button className="btn-outline">
              Services <span>→</span>
            </button>
            <button className="btn-filled">
              Contactez-Nous <span>→</span>
            </button>
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
            {values.map(({ icon: Icon, title, desc, img }, i) => {
              const isActive = activeValue === i;
              
              return (
                <div 
                  key={title} 
                  onMouseEnter={() => setActiveValue(i)}
                  className={`accordion-item ${isActive ? 'active' : ''}`}
                >
                  {/* Background Image */}
                  <div 
                    className="item-bg"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  
                  {/* Overlays */}
                  <div className="item-overlay-dark" />
                  <div className={`item-overlay-color color-${i}`} />

                  {/* Content */}
                  <div className="item-content">
                    <div className="icon-wrapper">
                      <Icon className="icon-main" />
                    </div>
                    
                    <h3 className="item-title">
                      {title}
                    </h3>
                    
                    <div className="item-details">
                      <p className="item-desc">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default DetailAbout;
