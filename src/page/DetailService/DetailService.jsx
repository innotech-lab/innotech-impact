import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../Components/Service/service";
import "./DetailService.css";

// Etapes de collaboration avec les clients.
const processSteps = [
  {
    id: 1,
    title: "Cadrage",
    desc: "Ateliers pour comprendre le contexte, les objectifs et les priorites.",
  },
  {
    id: 2,
    title: "Conception",
    desc: "Prototype, architecture et plan d'execution avec jalons de livraison.",
  },
  {
    id: 3,
    title: "Production",
    desc: "Developpement agile, tests qualite et iterations rapides.",
  },
  {
    id: 4,
    title: "Evolution",
    desc: "Mesure des resultats, optimisation continue et support post-lancement.",
  },
];

// Questions frequentes sur les services.
const faqList = [
  {
    id: "q1",
    question: "En combien de temps un projet peut demarrer ?",
    answer:
      "En general, le cadrage initial prend entre 3 et 7 jours selon la complexite. Une fois valide, la production peut commencer immediatement.",
  },
  {
    id: "q2",
    question: "Travaillez-vous avec des startups et des entreprises etablies ?",
    answer:
      "Oui. Nous adaptons notre methode a votre niveau de maturite, du MVP rapide a des plateformes plus complexes.",
  },
  {
    id: "q3",
    question: "Proposez-vous un accompagnement apres livraison ?",
    answer:
      "Oui, avec des offres de maintenance evolutive, monitoring, optimisations et accompagnement des equipes.",
  },
];

const DetailService = () => {
  const [activeStep, setActiveStep] = useState(processSteps[0].id);
  const [openFaqId, setOpenFaqId] = useState(faqList[0].id);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 60);
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
