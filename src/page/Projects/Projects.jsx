import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Projects.css";
import gnosis from "../../assets/Gnosis.PNG";
import kithub from "../../assets/kithub.PNG";
import comlb from "../../assets/comlb.PNG";
import lm from "../../assets/Lm.PNG";
import women from "../../assets/Women.PNG";
import tech from "../../assets/TECH.png";

// Donnees de presentation des projets avec contexte business.
const projectList = [
  {
    id: 1,
    title: "Gnosis Platform",
    image: gnosis,
    category: "EdTech",
    desc: "Plateforme d'apprentissage en ligne orientee innovation, avec parcours personnalises et gestion centralisee.",
    challenge: "Structurer des parcours de formation modulaires pour differents profils.",
    result: "Hausse du taux d'engagement et meilleur suivi des performances academiques.",
    stack: ["React", "Node.js", "API REST"],
  },
  {
    id: 2,
    title: "Kithub",
    image: kithub,
    category: "HR Tech",
    desc: "Application mobile de mise en relation entre talents et entreprises, avec un parcours candidat simplifie.",
    challenge: "Fluidifier le matching entre recruteurs et candidats sur mobile.",
    result: "Reduction du temps de recrutement et meilleure conversion des candidatures.",
    stack: ["Flutter", "Firebase", "Cloud Functions"],
  },
  {
    id: 3,
    title: "ComLB Commerce",
    image: comlb,
    category: "E-commerce",
    desc: "Solution e-commerce locale avec gestion de catalogue, commandes et tableau de bord marchand.",
    challenge: "Digitaliser la vente locale avec une experience marchande simple.",
    result: "Croissance du volume de commandes et pilotage en temps reel des ventes.",
    stack: ["Vue.js", "Laravel", "MySQL"],
  },
  {
    id: 4,
    title: "LM Analytics",
    image: lm,
    category: "Data",
    desc: "Dashboard analytique pour piloter les KPIs business en temps reel avec visualisations claires.",
    challenge: "Centraliser des donnees multi-sources dans un tableau de bord unique.",
    result: "Decision plus rapide grace a des indicateurs clairs et actionnables.",
    stack: ["React", "Charting", "Data API"],
  },
  {
    id: 5,
    title: "Women Tech Program",
    image: women,
    category: "Impact",
    desc: "Programme de formation et mentorat digital pour accelerer l'inclusion des femmes entrepreneures.",
    challenge: "Concevoir un accompagnement digital engageant et durable.",
    result: "Meilleure retention des participantes et progression des competences.",
    stack: ["Learning", "Community", "Mentoring"],
  },
  {
    id: 6,
    title: "Innotech Brand System",
    image: tech,
    category: "Brand Design",
    desc: "Refonte de l'identite visuelle, systeme de composants et guides pour la coherence multi-support.",
    challenge: "Harmoniser la marque sur l'ensemble des canaux de communication.",
    result: "Identite plus coherente et deploiement accelere sur les supports.",
    stack: ["Branding", "UI/UX", "Design System"],
  },
];

const Projects = () => {
  // Filtre actif pour trier les projets par categorie.
  const [activeCategory, setActiveCategory] = useState("Tous");
  // Projet ouvert dans la modale de details.
  const [selectedProject, setSelectedProject] = useState(null);
  // Controle l'apparition animee des mots dans le hero.
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const projectsGridRef = useRef(null);

  // Construit la liste des categories en evitant les doublons.
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projectList.map((project) => project.category))];
    return ["Tous", ...uniqueCategories];
  }, []);

  // Retourne les projets a afficher selon le filtre actif.
  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") {
      return projectList;
    }
    return projectList.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  // Anime le texte du hero des le chargement de la page.
  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Interaction hero: clic sur un mot-cle pour filtrer puis descendre sur la grille.
  const handleKeywordClick = (category) => {
    setActiveCategory(category);
    projectsGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="projects-page">
      {/* Section hero: positionnement, message de valeur et actions principales */}
      <section className="projects-hero">
        <div className="projects-hero-pattern" />
        <div className="projects-hero-glow projects-hero-glow-left" />
        <div className="projects-hero-glow projects-hero-glow-right" />

        <div className="projects-hero-content">
          <span className={`projects-badge hero-word ${isHeroVisible ? "is-visible delay-1" : ""}`}>
            <span className="projects-badge-dot" />
            Nos Realisations
          </span>
          <h1 className={`hero-word ${isHeroVisible ? "is-visible delay-2" : ""}`}>
            Des projets digitaux penses pour l'impact
          </h1>
          <p className={`hero-word ${isHeroVisible ? "is-visible delay-3" : ""}`}>
            Nous accompagnons startups, PME et institutions dans la conception de
            solutions web et mobile robustes, avec une execution orientee resultats.
          </p>
          <div className={`projects-keywords hero-word ${isHeroVisible ? "is-visible delay-4" : ""}`}>
            <button
              type="button"
              className="projects-keyword-btn"
              onClick={() => handleKeywordClick("EdTech")}
            >
              EdTech
            </button>
            <button
              type="button"
              className="projects-keyword-btn"
              onClick={() => handleKeywordClick("E-commerce")}
            >
              E-commerce
            </button>
            <button
              type="button"
              className="projects-keyword-btn"
              onClick={() => handleKeywordClick("Data")}
            >
              Data
            </button>
            <button
              type="button"
              className="projects-keyword-btn"
              onClick={() => handleKeywordClick("Tous")}
            >
              Tous les projets
            </button>
          </div>
          <div className={`projects-hero-actions hero-word ${isHeroVisible ? "is-visible delay-5" : ""}`}>
            {/* CTA principal vers les realisations detaillees */}
            <a href="/portfolio" className="projects-btn projects-btn-primary">
              Voir le portfolio
            </a>
            {/* CTA conversion: renvoie vers le formulaire de contact sur la home */}
            <a href="/#contact" className="projects-btn projects-btn-secondary">
              Demarrer un projet
            </a>
          </div>
        </div>
      </section>

      {/* Chiffres cles pour renforcer la credibilite */}
      <section className="projects-stats">
        <div className="stat-card">
          <h3>0</h3>
          <p>Projets accompagnes</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Secteurs couverts</p>
        </div>
        <div className="stat-card">
          <h3>0%</h3>
          <p>Clients satisfaits</p>
        </div>
      </section>

      {/* Grille de realisations avec details de valeur par projet */}
      <section className="projects-grid-section">
        <div className="projects-section-head">
          <h2>Selection de projets strategiques</h2>
          <p>
            Chaque mission combine cadrage metier, execution technique et objectifs de
            performance mesurables.
          </p>
        </div>

        {/* Interaction: filtre des projets par categorie */}
        <div className="projects-filter">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`projects-filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid" ref={projectsGridRef}>
          {filteredProjects.map((project) => (
            <article
              className="project-card"
              key={project.id}
              // Ouverture de la modale au clic sur la carte.
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                // Accessibilite clavier: ouvrir la modale avec Entree ou Espace.
                if (event.key === "Enter" || event.key === " ") {
                  setSelectedProject(project);
                }
              }}
            >
              <div className="project-media">
                <img src={project.image} alt={project.title} />
                <span className="project-category">{project.category}</span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-insights">
                  <p>
                    <strong>Enjeu:</strong> {project.challenge}
                  </p>
                  <p>
                    <strong>Resultat:</strong> {project.result}
                  </p>
                </div>
                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Appel a l'action final pour generer des prises de contact */}
      <section className="projects-cta">
        <h2>Un projet a lancer ?</h2>
        <p>
          Parlons de vos objectifs, de vos contraintes et de la meilleure strategie
          produit pour les atteindre.
        </p>
        <div className="projects-cta-actions">
          <a href="/#contact" className="projects-cta-btn">Prendre rendez-vous</a>
          <a href="/portfolio" className="projects-cta-link">Voir aussi le Portfolio</a>
        </div>
      </section>

      {/* Interaction: modale de details projet */}
      {selectedProject && (
        <div
          className="projects-modal-backdrop"
          role="presentation"
          // Ferme la modale si l'utilisateur clique hors du contenu.
          onClick={() => setSelectedProject(null)}
        >
          <article
            className="projects-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Details du projet ${selectedProject.title}`}
            // Evite la fermeture lors d'un clic a l'interieur de la modale.
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="projects-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Fermer les details du projet"
            >
              ×
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="projects-modal-image"
            />
            <div className="projects-modal-content">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.desc}</p>
              <p>
                <strong>Enjeu:</strong> {selectedProject.challenge}
              </p>
              <p>
                <strong>Resultat:</strong> {selectedProject.result}
              </p>
              <div className="project-stack">
                {selectedProject.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
};

export default Projects;
