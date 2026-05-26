/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║   CHAPITRE 17 : Background.jsx — Médias & Textes Dynamiques     ║
 * ║                  "Gérer les vidéos et images de fond"            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * CE COMPOSANT ILLUSTRE : LA FLEXIBILITÉ DU CONTENU
 * ==================================================
 * Cette section est souvent la "vitrine" du site. Pouvoir changer 
 * la vidéo ou l'image de fond sans toucher au code est un énorme avantage.
 * 
 * 1. MULTI-MÉDIA (Image & Vidéo) :
 *    -----------------------------
 *    Le modèle `BackgroundSection` dans Django permet d'uploader une image 
 *    ET une vidéo. Dans le JSON, on reçoit les deux URLs.
 * 
 * 2. GESTION DES FALLBACKS (Sécurité) :
 *    ---------------------------------
 *    Si l'admin n'a pas encore configuré la section dans Django, 
 *    on utilise des fichiers importés localement (`back2`, `innotechlogo`).
 *    Cela évite d'avoir un site cassé au premier lancement.
 * 
 * 3. RETOURS À LA LIGNE (pre-line) :
 *    -------------------------------
 *    Pour le titre, on utilise `whiteSpace: "pre-line"`. 
 *    Cela permet à l'admin d'insérer des retours à la ligne dans le 
 *    TextField de Django (ex: "Innovation\nPour le Futur") et qu'ils 
 *    soient respectés par le navigateur.
 */

import React, { useState, useEffect } from "react";
import "./background.css";
import back2 from '../../assets/ba1.png'
import innotechlogo from "../../assets/video/JuneTech.mp4";

const Background = () => {
  // État initial avec des valeurs de secours (locales)
  const [bgInfo, setBgInfo] = useState({
    title: "Innovation\nFor The Future",
    description: "Innotech Impact empowers businesses through modern technology, innovation and digital solutions.",
    button_text: "Discover More",
    background_image: back2,
    video_file: innotechlogo
  });

  useEffect(() => {
    // Récupération de la configuration depuis l'API
    fetch('http://127.0.0.1:8000/api/background-section/')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const apiData = data[0];
          // On fusionne les données de l'API avec nos valeurs de secours
          setBgInfo({
            title: apiData.title || "Innovation\nFor The Future",
            description: apiData.description,
            button_text: apiData.button_text,
            // Si le champ image/vidéo est vide dans l'API, on garde le fichier local
            background_image: apiData.background_image || back2,
            video_file: apiData.video_file || innotechlogo
          });
        }
      })
      .catch(err => console.error("Erreur API Background:", err));
  }, []);

  return (
    <section className="herosection">

      {/* BACKGROUND IMAGE (DYNAMIQUE) */}
      <div className="herosection-video">
        <img src={bgInfo.background_image} alt="Background" />
      </div>

      <div className="herosection-overlay"></div>

      <div className="herosection-container">
        <div className="herosection-text">
          {/* pre-line : très important pour le rendu des sauts de ligne venant de la DB */}
          <h1 style={{ whiteSpace: "pre-line" }}>
            {bgInfo.title}
          </h1>
          <p>{bgInfo.description}</p>
          <button className="herosection-btn">{bgInfo.button_text}</button>
        </div>

        {/* CARTE VIDÉO (DYNAMIQUE) */}
        <div className="herosection-card">
          {/* key={bgInfo.video_file} : force la vidéo à se recharger si l'URL change */}
          <video autoPlay muted loop playsInline key={bgInfo.video_file}>
            <source src={bgInfo.video_file} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default Background;