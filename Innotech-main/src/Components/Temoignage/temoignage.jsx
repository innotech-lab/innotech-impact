import React, { useState, useEffect, useRef } from "react";
import "./temoignage.css";

function Temoignage() {
  const [temoignages, setTemoignages] = useState([]);
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState("");
  const isAnimating = useRef(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/testimonials/')
      .then(res => res.json())
      .then(data => {
        setTemoignages(data);
      })
      .catch(err => console.error(err));
  }, []);

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

  // On détermine combien de cartes afficher : au maximum 3, ou moins si on a peu de témoignages.
  const numVisible = Math.min(temoignages.length, 3);
  const visible = temoignages.length > 0 
    ? Array.from({ length: numVisible }, (_, k) => temoignages[(index + k) % temoignages.length])
    : [];

  if (temoignages.length === 0) {
    return <section className="temoignage"><p style={{textAlign: "center", color: "white"}}>Chargement des témoignages...</p></section>;
  }

  return (
    <section className="temoignage">
      <p className="subtitle">TESTIMONIALS</p>
      <h2 className="title">Explore Clients Review</h2>
      <p className="description">
        On the other hand we denounce with righteous indignation and dislike
        men who are so beguiled and demoralized.
      </p>

      <div className="slider-wrapper">
        {/* On n'affiche les flèches que s'il y a plus d'un témoignage */}
        {temoignages.length > 1 && (
          <button className="slider-btn" onClick={() => slide("prev")}>&#8592;</button>
        )}
        
        <div className={`cards ${animClass}`}>
          {visible.map((item, i) => (
            <div 
              className={`card card-${temoignages.length === 1 ? 'single' : i + 1}`} 
              key={`${item.id}-${index}-${i}`}
            >
              <span className="quote">❝</span>
              <p className="text">{item.content || item.texte}</p>
              <div className="client">
                <img src={item.image || `https://ui-avatars.com/api/?name=${item.client_name || item.nom}&background=random`} alt={item.client_name || item.nom} />
                <div>
                  <h4>{item.client_name || item.nom}</h4>
                  <span>{item.role || item.poste}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {temoignages.length > 1 && (
          <button className="slider-btn" onClick={() => slide("next")}>&#8594;</button>
        )}
      </div>

      {/* On n'affiche les points que s'il y a plus d'un témoignage */}
      {temoignages.length > 1 && (
        <div className="dots">
          {temoignages.map((_, i) => (
            <span key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Temoignage;
