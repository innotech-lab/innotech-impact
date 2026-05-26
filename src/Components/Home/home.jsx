import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "INNOTECH IMPACT",
    subtitle:
      "Innovation pour tous — Nous aidons les entreprises et les jeunes innovateurs à construire le futur numérique.",
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    title: "Innovation & Technologie",
    subtitle:
      "Construisons ensemble des solutions intelligentes adaptées au monde moderne.",
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    title: "Transform Your Vision",
    subtitle:
      "Nous transformons vos idées en projets réels grâce à la technologie.",
  },
];

const Home = () => {
  // Index du slide actif dans le hero.
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Va au slide suivant en boucle.
  const goToNext = () => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  };

  // Va au slide precedent en boucle.
  const goToPrevious = () => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  };

  // Rotation automatique des slides toutes les 4 secondes.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${slides[current].image})` }}
    >
      <div className="overlay"></div>

      <div className="hero-content">

        {/* TITRE AVEC COULEUR LOGO */}
        <h1>
          <span className="green">INNOTECH</span>{" "}
          <span className="white">IMPACT</span>
        </h1>

        <p>{slides[current].subtitle}</p>

        <div className="buttons">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/projects")}
          >
            Decouvrir nos projets <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/portfolio")}
          >
            Voir le portfolio <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        {/* Navigation manuelle du carrousel */}
        <div className="hero-controls">
          <button
            type="button"
            className="hero-control-btn"
            onClick={goToPrevious}
            aria-label="Slide precedent"
          >
            ←
          </button>
          <button
            type="button"
            className="hero-control-btn"
            onClick={goToNext}
            aria-label="Slide suivant"
          >
            →
          </button>
        </div>

        <div className="scroll-indicator">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`indicator-dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Aller au slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
