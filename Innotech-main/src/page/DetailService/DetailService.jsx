import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../Components/Service/service";
import "./DetailService.css";

// Etapes de collaboration avec les clients.
// Etapes de collaboration avec les clients.
// Questions frequentes sur les services.

const DetailService = () => {
  const [processSteps, setProcessSteps] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [activeStep, setActiveStep] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    // Animation de la bannière
    const timer = setTimeout(() => setIsHeroVisible(true), 60);

    // Récupération des étapes de collaboration
    fetch('http://127.0.0.1:8000/api/process-steps/')
      .then(res => res.json())
      .then(data => {
        setProcessSteps(data);
        if (data.length > 0) setActiveStep(data[0].id);
      })
      .catch(err => console.error(err));

    // Récupération des FAQs
    fetch('http://127.0.0.1:8000/api/faqs/')
      .then(res => res.json())
      .then(data => {
        setFaqList(data);
        if (data.length > 0) setOpenFaqId(data[0].id);
      })
      .catch(err => console.error(err));

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="detail-service-page">
      {/* Hero principal de la page services */}
      <section className="detail-service-hero">
        <div className="detail-service-pattern" />
        <div className="detail-service-glow detail-service-glow-left" />
        <div className="detail-service-glow detail-service-glow-right" />
        <div className="detail-service-hero-content">
          <span className={`detail-service-badge service-hero-word ${isHeroVisible ? "is-visible delay-1" : ""}`}>
            <span className="badge-dot" />
            Expertises Innotech
          </span>
          <h1 className={`service-hero-word ${isHeroVisible ? "is-visible delay-2" : ""}`}>
            Des services pensés pour accelerer notre croissance
          </h1>
          <p className={`service-hero-word ${isHeroVisible ? "is-visible delay-3" : ""}`}>
            Nous combinons strategie, design et ingenierie pour concevoir des solutions
            digitales durables qui creent de la valeur.
          </p>
          <div className={`detail-service-hero-actions service-hero-word ${isHeroVisible ? "is-visible delay-4" : ""}`}>
            <Link to="/contact" className="hero-btn hero-btn-primary">
              Demarrer une mission
            </Link>
            <Link to="/projects" className="hero-btn hero-btn-secondary">
              Voir nos projets
            </Link>
          </div>
        </div>
      </section>

      <Service />

      {/* SECTION : PROCESSUS DE COLLABORATION */}
      {processSteps.length > 0 && (
        <section className="service-process">
          <div className="service-focus-head">
            <span className="detail-service-badge">Methodologie</span>
            <h2>Comment nous travaillons</h2>
            <p>Un processus agile et transparent pour garantir le succes de votre projet.</p>
          </div>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`process-step ${activeStep === step.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(step.id)}
              >
                <span className="step-number">0{index + 1}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION : FAQ */}
      {faqList.length > 0 && (
        <section className="service-faq">
          <div className="service-focus-head">
            <span className="detail-service-badge">FAQ</span>
            <h2>Questions Frequentes</h2>
            <p>Tout ce que vous devez savoir sur notre accompagnement.</p>
          </div>
          <div className="faq-list">
            {faqList.map((item) => (
              <div key={item.id} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                >
                  {item.question}
                  <span>{openFaqId === item.id ? "−" : "+"}</span>
                </button>
                {openFaqId === item.id && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="service-cta">
        <h2>Parlons de votre prochaine solution digitale</h2>
        <p>
          Nous pouvons cadrer votre projet rapidement et proposer un plan d'action
          adapte a vos objectifs business.
        </p>
        <div className="service-cta-actions">
          <Link to="/" className="cta-btn cta-btn-primary">
            Prendre rendez-vous
          </Link>
          <Link to="/portfolio" className="cta-btn cta-btn-outline">
            Explorer le portfolio
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DetailService;
