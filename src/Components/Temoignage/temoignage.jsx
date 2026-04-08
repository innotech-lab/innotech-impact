import React, { useState, useEffect, useRef } from "react";
import "./temoignage.css";

const temoignages = [
  { id: 1, texte: "Innotech a transformé notre infrastructure IT. Une équipe réactive et des solutions vraiment adaptées à nos besoins.", nom: "Sophie Martin", poste: "CEO, TechCorp", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, texte: "Grâce à Innotech, notre productivité a augmenté de 40%. Je recommande vivement leurs services cloud.", nom: "Karim Benali", poste: "CTO, StartupHub", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, texte: "Un accompagnement professionnel du début à la fin. L'équipe est disponible et très compétente.", nom: "Laura Dupont", poste: "IT Manager, FinGroup", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 4, texte: "La migration vers le cloud s'est faite sans interruption. Innotech maîtrise parfaitement son domaine.", nom: "Marc Leroy", poste: "Directeur Technique, LogiPro", image: "https://randomuser.me/api/portraits/men/54.jpg" },
  { id: 5, texte: "Excellent rapport qualité-prix. Nos systèmes n'ont jamais été aussi stables et sécurisés.", nom: "Amina Toure", poste: "DSI, MediSanté", image: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 6, texte: "Innotech nous a aidé à moderniser notre SI en un temps record. Partenaire de confiance.", nom: "Pierre Fontaine", poste: "Managing Director, BuildCo", image: "https://randomuser.me/api/portraits/men/76.jpg" },
];

function Temoignage() {
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState("");
  const isAnimating = useRef(false);

  const slide = (dir) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setAnimClass(dir === "next" ? "slide-out-left" : "slide-out-right");
    setTimeout(() => {
      setIndex((i) =>
        dir === "next"
          ? (i + 1) % temoignages.length
          : (i - 1 + temoignages.length) % temoignages.length
      );
      setAnimClass(dir === "next" ? "slide-in-right" : "slide-in-left");
      setTimeout(() => {
        setAnimClass("");
        isAnimating.current = false;
      }, 400);
    }, 300);
  };

  const visible = [0, 1, 2].map((offset) => temoignages[(index + offset) % temoignages.length]);

  return (
    <section className="temoignage">
      <p className="subtitle">TESTIMONIALS</p>
      <h2 className="title">Explore Clients Review</h2>
      <p className="description">
        On the other hand we denounce with righteous indignation and dislike
        men who are so beguiled and demoralized.
      </p>

      <div className="slider-wrapper">
        <button className="slider-btn" onClick={() => slide("prev")}>&#8592;</button>
        <div className={`cards ${animClass}`}>
          {visible.map((item, i) => (
            <div className={`card card-${i + 1}`} key={`${item.id}-${index}`}>
              <span className="quote">❝</span>
              <p className="text">{item.texte}</p>
              <div className="client">
                <img src={item.image} alt={item.nom} />
                <div>
                  <h4>{item.nom}</h4>
                  <span>{item.poste}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn" onClick={() => slide("next")}>&#8594;</button>
      </div>

      <div className="dots">
        {temoignages.map((_, i) => (
          <span key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </section>
  );
}

export default Temoignage;
