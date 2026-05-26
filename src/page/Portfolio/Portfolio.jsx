import React, { useEffect, useMemo, useState } from "react";
import "./Portfolio.css";
import gnosis from "../../assets/Gnosis.PNG";
import kithub from "../../assets/kithub.PNG";
import comlb from "../../assets/comlb.PNG";
import lm from "../../assets/Lm.PNG";
import women from "../../assets/Women.PNG";
import tech from "../../assets/TECH.png";

// Jeu de donnees des projets affiches dans la grille du portfolio.
const projects = [
  {
    id: 1,
    title: "Gnosis Platform",
    category: "Web",
    image: gnosis,
    desc: "Plateforme d'apprentissage en ligne pour les jeunes innovateurs.",
    tags: ["React", "Node.js"],
  },
  {
    id: 2,
    title: "Kithub",
    category: "Mobile",
    image: kithub,
    desc: "Application mobile de mise en relation entre talents et entreprises.",
    tags: ["Flutter", "Firebase"],
  },
  {
    id: 3,
    title: "ComLB",
    category: "Web",
    image: comlb,
    desc: "Solution e-commerce pour les commerçants locaux du Burundi.",
    tags: ["Vue.js", "Laravel"],
  },
  {
    id: 4,
    title: "LM Dashboard",
    category: "Design",
    image: lm,
    desc: "Tableau de bord analytique pour le suivi des performances.",
    tags: ["Figma", "React"],
  },
  {
    id: 5,
    title: "Women Tech",
    category: "Formation",
    image: women,
    desc: "Programme de formation tech dédié aux femmes entrepreneures.",
    tags: ["Education", "Tech"],
  },
  {
    id: 6,
    title: "Innotech Hub",
    category: "Design",
    image: tech,
    desc: "Identité visuelle et branding pour l'écosystème Innotech.",
    tags: ["Branding", "UI/UX"],
  },
];

const Portfolio = () => {
  // Gere l'animation d'apparition du banner au chargement.
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  // Stocke le projet selectionne pour ouvrir la fenetre modale.
  const [selectedProject, setSelectedProject] = useState(null);
  // Filtre actif pour trier les projets par categorie.
  const [activeFilter, setActiveFilter] = useState("Tous");

  // Declenche l'animation du banner avec un leger delai.
  useEffect(() => {
    const timer = setTimeout(() => setIsBannerVisible(true), 350);
    return () => clearTimeout(timer);
  }, []);

  // Construit dynamiquement la liste des filtres disponibles.
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map((project) => project.category))];
    return ["Tous", ...uniqueCategories];
  }, []);

  // Retourne les projets selon le filtre actuellement selectionne.
  const filteredProjects = useMemo(() => {
    if (activeFilter === "Tous") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

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
              <img src={project.image} alt={project.title} />
              <div className="card-overlay">
                <span className="card-category">{project.category}</span>
              </div>
            </div>
            <div className="card-body">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="card-tags">
                {project.tags.map((tag) => (
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
              src={selectedProject.image}
              alt={selectedProject.title}
              className="portfolio-modal-image"
            />
            <div className="portfolio-modal-content">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.desc}</p>
              <div className="card-tags">
                {selectedProject.tags.map((tag) => (
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
