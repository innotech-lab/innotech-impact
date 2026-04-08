import React, { useState, useEffect } from "react";
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
  const [current, setCurrent] = useState(0);

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
          <button className="btn btn-primary">Découvrir →</button>
          <button className="btn btn-secondary">Contactez-nous →</button>
        </div>

        <div className="scroll-indicator">
          {slides.map((_, i) => (
            <span key={i} className={i === current ? "active" : ""}></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;