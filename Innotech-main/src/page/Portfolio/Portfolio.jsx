import React, { useEffect, useMemo, useState } from "react";
import "./Portfolio.css";
import gnosis from "../../assets/Gnosis.PNG";
import kithub from "../../assets/kithub.PNG";
import comlb from "../../assets/comlb.PNG";
import lm from "../../assets/Lm.PNG";
import women from "../../assets/Women.PNG";
import tech from "../../assets/TECH.png";

// Les projets seront maintenant récupérés depuis l'API Django

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  // Gere l'animation d'apparition du banner au chargement.
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  // Stocke le projet selectionne pour ouvrir la fenetre modale.
  const [selectedProject, setSelectedProject] = useState(null);
  // Filtre actif pour trier les projets par categorie.
  const [activeFilter, setActiveFilter] = useState("Tous");

  // Appel API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects/')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  // Declenche l'animation du banner avec un leger delai.
  useEffect(() => {
    const timer = setTimeout(() => setIsBannerVisible(true), 350);
    return () => clearTimeout(timer);
  }, []);

  // Construit dynamiquement la liste des filtres disponibles.
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map((project) => project.category))];
    return ["Tous", ...uniqueCategories];
  }, [projects]);

  // Retourne les projets selon le filtre actuellement selectionne.
  const filteredProjects = useMemo(() => {
    if (activeFilter === "Tous") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  // Permet de fermer la modale avec la touche Echap.
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="portfolio-page">
      {/* Section hero du portfolio */}
      <div className="portfolio-banner">
        <div className="portfolio-dot-pattern" />
        <div className="portfolio-glow portfolio-glow-1" />
        <div className="portfolio-glow portfolio-glow-2" />

        <div className="portfolio-banner-content-wrapper">
          <div className={`portfolio-banner-animation ${isBannerVisible ? "in-view" : ""}`}>
            <span className="portfolio-badge">
              <span className="portfolio-badge-dot" />
              Nos Realisations
            </span>
            <h1 className="portfolio-banner-title">Notre Portfolio</h1>
            <p className="portfolio-banner-subtitle">
              Decouvrez les projets qui illustrent notre expertise et notre passion pour
              l'innovation.
            </p>
          </div>
        </div>
      </div>

      <div className="portfolio-intro">
        <h2>Des solutions concretes pour des impacts durables</h2>
        <p>
          Chaque projet combine strategie, design et technologie afin de creer des experiences utiles
          et memorables pour nos clients.
        </p>
      </div>

      {/* Barre de filtres par categorie */}
      <div className="portfolio-filter">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-btn ${activeFilter === category ? "active" : ""}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grille principale des projets */}
      <div className="portfolio-grid">
        {filteredProjects.map((project) => (
          <div className="portfolio-card" key={project.id}>
            <div className="card-img-wrapper">
              <img src={project.image || tech} alt={project.title} />
              <div className="card-overlay">
                <span className="card-category">{project.category}</span>
              </div>
            </div>
            <div className="card-body">
              <h3>{project.title}</h3>
              <p>{project.description || project.desc}</p>
              <div className="card-tags">
                {(project.stack_array || project.tags || []).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <button
                type="button"
                className="card-link"
                onClick={() => setSelectedProject(project)}
              >
                Voir le projet
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modale de details du projet, affichee uniquement si un projet est selectionne */}
      {selectedProject && (
        <div
          className="portfolio-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div
            className="portfolio-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Details du projet ${selectedProject.title}`}
          >
            <button
              type="button"
              className="portfolio-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Fermer les details du projet"
            >
              ×
            </button>
            <img
              src={selectedProject.image || tech}
              alt={selectedProject.title}
              className="portfolio-modal-image"
            />
            <div className="portfolio-modal-content">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description || selectedProject.desc}</p>
              <div className="card-tags">
                {(selectedProject.stack_array || selectedProject.tags || []).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
