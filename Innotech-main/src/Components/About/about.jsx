import React, { useState, useEffect } from "react";
import "./about.css";
import aboutImg from "../../assets/ordi1.png";

const About = () => {
  const [info, setInfo] = useState({
    stats_projects: 0,
    stats_sectors: 0,
    stats_satisfaction: 0
  });

  // --- COURS API (PARTIE 1) : LA LECTURE (GET) ---
  // 1. useEffect() est un "Hook" React. Il sert à exécuter du code à un moment précis.
  // Le tableau vide [] à la fin signifie : "Exécute ce code UNE SEULE FOIS quand le composant s'affiche".
  useEffect(() => {
    // 2. fetch() lance une requête HTTP réseau vers notre backend Django.
    // Par défaut, fetch fait une requête "GET" (il demande à lire de la donnée).
    fetch('http://127.0.0.1:8000/api/company-info/')
      // 3. Le backend répond en format texte brut (JSON).
      // res.json() transforme ce texte en objet/tableau JavaScript manipulable par React.
      .then(res => res.json())
      // 4. 'data' contient maintenant nos données de la base de données.
      .then(data => {
        // L'API renvoie un tableau (ex: [{id: 1, stats_projects: 120, ...}]). 
        // On prend le premier élément (data[0]) et on le stocke dans le "State" de React avec setInfo().
        if (data.length > 0) {
          const apiData = data[0];
          setInfo({
            stats_projects: apiData.stats_projects,
            stats_sectors: apiData.stats_sectors,
            stats_satisfaction: apiData.stats_satisfaction,
            about_title: apiData.about_title || "QUI SOMMES-NOUS?",
            about_description: apiData.about_description || "Innotech Impact est une entreprise technologique pionnière qui s'engage à transformer le paysage numérique. Fondée en 2015, nous avons émergé en tant que leader en comblant le fossé entre les aspirations numériques et les réalisations.\n\nNotre mission principale est de permettre aux individus, aux entreprises et aux institutions de mener l'évolution numérique en toute confiance.",
            about_image: apiData.about_image || aboutImg
          });
        }
      })
      // 5. catch() capture les erreurs (ex: si vous avez oublié de lancer le serveur Django !).
      .catch(err => console.error(err));
  }, []);

  return (
    <main>
        <section className="projects-stats">
        <div className="stat-card">
          <h3>{info.stats_projects}</h3>
          <p>Projets accompagnes</p>
        </div>
        <div className="stat-card">
          <h3>{info.stats_sectors}</h3>
          <p>Secteurs couverts</p>
        </div>
        <div className="stat-card">
          <h3>{info.stats_satisfaction}%</h3>
          <p>Clients satisfaits</p>
        </div>
      </section>
    <section className="about-section">

      {/* LEFT IMAGE */}
      <div className="about-image">
        <img src={info.about_image || aboutImg} alt="about" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="about-content">
        <h2>{info.about_title}</h2>

        {/* pre-line permet de conserver les sauts de lignes saisis dans l'admin Django */}
        <p style={{ whiteSpace: "pre-line" }}>
          {info.about_description}
        </p>

        <div className="about-buttons">
          <button className="btn-outline">
            Services <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button className="btn-filled">
            Contactez-Nous <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

    </section>
    </main>
  );
};

export default About;
