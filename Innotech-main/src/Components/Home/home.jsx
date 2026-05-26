/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║   CHAPITRE 18 : Home.jsx — Carrousel Héro Dynamique             ║
 * ║                  "Animer des données venant de l'API"            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * CE COMPOSANT ILLUSTRE : LA GESTION D'UNE LISTE DE SLIDES
 * =========================================================
 * La page d'accueil ne doit pas être figée. On utilise une liste de 
 * slides gérée dans Django pour faire vivre le Hero.
 * 
 * 1. CHARGEMENT DE LA LISTE (GET) :
 *    -----------------------------
 *    On appelle `/api/hero-slides/`. Django renvoie un tableau d'objets.
 *    Chaque objet contient un titre, un sous-titre et une image de fond.
 * 
 * 2. LOGIQUE DE CARROUSEL :
 *    ----------------------
 *    L'état `current` détermine quel slide du tableau `slides` est affiché.
 *    Le style `backgroundImage: url(...)` change dynamiquement selon l'index.
 * 
 * 3. EFFET AUTOMATIQUE (setInterval) :
 *    -------------------------------
 *    On utilise un deuxième `useEffect` pour lancer un chrono qui 
 *    change de slide toutes les 4 secondes. 
 *    ⚠️ IMPORTANT : On utilise `clearInterval` dans le `return` pour 
 *    arrêter le chrono si l'utilisateur quitte la page.
 * 
 * 4. INTERACTION (Dots & Buttons) :
 *    ------------------------------
 *    L'utilisateur peut aussi changer de slide manuellement en cliquant 
 *    sur les points en bas ou les flèches.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  // Liste des slides venant de l'API
  const [slides, setSlides] = useState([]);
  // Index du slide actuellement affiché
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // ÉTAPE 1 : Récupérer les slides au chargement
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/hero-slides/')
      .then(res => res.json())
      .then(data => setSlides(data))
      .catch(err => console.error("Erreur API HeroSlides:", err));
  }, []);

  // ÉTAPE 2 : Logic de navigation manuelle
  const goToNext = () => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  };
  const goToPrevious = () => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  };

  // ÉTAPE 3 : Rotation automatique (Timer)
  useEffect(() => {
    // Si la liste est vide, on ne fait rien
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    }, 4000);

    // NETTOYAGE : Crucial pour éviter les bugs de performance
    return () => clearInterval(timer);
  }, [slides]); // Se relance si la liste de slides change

  // Écran de chargement si l'API n'a pas encore répondu
  if (slides.length === 0) {
    return (
      <section className="hero">
        <div className="overlay"></div>
        <h1 className="loading-text">Chargement de l'accueil...</h1>
      </section>
    );
  }

  return (
    <section
      className="hero"
      // L'image de fond change dynamiquement selon le slide actuel
      style={{ backgroundImage: `url(${slides[current].image})` }}
    >
      <div className="overlay"></div>

      <div className="hero-content">
        {/* Style spécial si le titre est le nom de l'entreprise */}
        {slides[current].title === "INNOTECH IMPACT" ? (
          <h1>
            <span className="green">INNOTECH</span> <span className="white">IMPACT</span>
          </h1>
        ) : (
          <h1 className="white">{slides[current].title}</h1>
        )}

        <p>{slides[current].subtitle}</p>

        <div className="buttons">
          <button className="btn btn-primary" onClick={() => navigate("/projects")}>
            Decouvrir nos projets <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/portfolio")}>
            Voir le portfolio <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        {/* FLÈCHES DE NAVIGATION */}
        <div className="hero-controls">
          <button className="hero-control-btn" onClick={goToPrevious}>←</button>
          <button className="hero-control-btn" onClick={goToNext}>→</button>
        </div>

        {/* INDICATEURS (DOTS) */}
        <div className="scroll-indicator">
          {slides.map((_, i) => (
            <button
              key={i}
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
