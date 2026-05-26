/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║   CHAPITRE 14 : Projects.jsx — Listes & Filtres Dynamiques      ║
 * ║                  "Exploiter la puissance du JSON"                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * CE COMPOSANT ILLUSTRE : LA GESTION AVANCÉE DES DONNÉES
 * =======================================================
 * On ne se contente pas d'afficher une liste, on l'organise, 
 * on la filtre et on utilise des champs calculés par le backend.
 * 
 * 1. LE CHAMP CALCULÉ "stack_array" :
 *    --------------------------------
 *    Dans Django (models.py), stack = "React, Node.js" (Texte brut).
 *    Mais pour React, c'est pénible à manipuler. 
 *    Grâce à notre Serializer (serializers.py), on reçoit un vrai tableau :
 *    "stack_array": ["React", "Node.js"]
 *    React peut alors faire : stack_array.map(tech => <span className="tag">{tech}</span>)
 * 
 * 2. LES FILTRES DYNAMIQUES :
 *    -------------------------
 *    On ne définit pas les catégories en dur. On les extrait des projets 
 *    reçus de l'API. Si vous ajoutez une nouvelle catégorie dans l'admin Django, 
 *    elle apparaîtra automatiquement comme un bouton de filtre !
 * 
 * 3. L'OPTIMISATION AVEC useMemo :
 *    ----------------------------
 *    useMemo() évite de recalculer les filtres à chaque petit mouvement 
 *    de la page. React ne refait le calcul que si la liste des projets change.
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Projects.css";
import tech from "../../assets/TECH.png"; // Fallback si pas d'image API

const Projects = () => {
  // --- ÉTATS ---
  const [projects, setProjects] = useState([]);      // Liste brute de l'API
  const [activeCategory, setActiveCategory] = useState("Tous"); // Filtre actuel
  const [selectedProject, setSelectedProject] = useState(null); // Pour la modale
  const [isHeroVisible, setIsHeroVisible] = useState(false);    // Pour l'animation
  const projectsGridRef = useRef(null);

  // --- ÉTAPE 1 : RÉCUPÉRATION DES DONNÉES (GET) ---
  useEffect(() => {
    // Appel vers l'URL définie dans api/urls.py
    fetch('http://127.0.0.1:8000/api/projects/')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("❌ Erreur API projects:", err));
  }, []);

  // --- ÉTAPE 2 : CALCUL DYNAMIQUE DES CATÉGORIES ---
  // On parcourt tous les projets pour trouver les catégories uniques.
  // [...new Set(...)] est une astuce JS pour supprimer les doublons.
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map((project) => project.category))];
    return ["Tous", ...uniqueCategories];
  }, [projects]);

  // --- ÉTAPE 3 : FILTRAGE DES PROJETS ---
  // On crée une sous-liste qui ne contient que les projets de la catégorie active.
  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  // Animation au chargement
  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const handleKeywordClick = (category) => {
    setActiveCategory(category);
    projectsGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="projects-page">
      {/* HERO SECTION */}
      <section className="projects-hero">
        <div className="projects-hero-pattern" />
        <div className="projects-hero-content">
          <span className={`projects-badge hero-word ${isHeroVisible ? "is-visible delay-1" : ""}`}>
            <span className="projects-badge-dot" /> Nos Realisations
          </span>
          <h1 className={`hero-word ${isHeroVisible ? "is-visible delay-2" : ""}`}>
            Des projets digitaux penses pour l'impact
          </h1>
          <p className={`hero-word ${isHeroVisible ? "is-visible delay-3" : ""}`}>
            Nous accompagnons startups, PME et institutions dans la conception de
            solutions web et mobile robustes.
          </p>
          
          {/* Mots-clés rapides */}
          <div className={`projects-keywords hero-word ${isHeroVisible ? "is-visible delay-4" : ""}`}>
            <button type="button" className="projects-keyword-btn" onClick={() => handleKeywordClick("EdTech")}>EdTech</button>
            <button type="button" className="projects-keyword-btn" onClick={() => handleKeywordClick("E-commerce")}>E-commerce</button>
            <button type="button" className="projects-keyword-btn" onClick={() => handleKeywordClick("Data")}>Data</button>
            <button type="button" className="projects-keyword-btn" onClick={() => handleKeywordClick("Tous")}>Tous les projets</button>
          </div>
        </div>
      </section>

      {/* GRILLE DE PROJETS */}
      <section className="projects-grid-section">
        <div className="projects-section-head">
          <h2>Selection de projets strategiques</h2>
        </div>

        {/* AFFICHAGE DES BOUTONS DE FILTRE DYNAMIQUES */}
        <div className="projects-filter">
          {categories.map((category) => (
            <button
              key={category}
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
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-media">
                {/* L'URL de l'image vient directement de Django */}
                <img src={project.image || tech} alt={project.title} />
                <span className="project-category">{project.category}</span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-insights">
                  <p><strong>Enjeu:</strong> {project.challenge}</p>
                  <p><strong>Resultat:</strong> {project.result}</p>
                </div>
                
                {/* EXPLOITATION DU CHAMP CALCULÉ stack_array */}
                <div className="project-tags">
                  {(project.stack_array || []).map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MODALE DE DÉTAILS */}
      {selectedProject && (
        <div className="projects-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <article className="projects-modal" onClick={(e) => e.stopPropagation()}>
            <button className="projects-modal-close" onClick={() => setSelectedProject(null)}>×</button>
            <img src={selectedProject.image || tech} alt={selectedProject.title} className="projects-modal-image" />
            <div className="projects-modal-content">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
              <div className="project-stack">
                {(selectedProject.stack_array || []).map((item) => (
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
