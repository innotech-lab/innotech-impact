/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║     CHAPITRE 10 : team.jsx — Lecture de données avec images     ║
 * ║                   "Comment afficher des photos uploadées"        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * CE COMPOSANT ILLUSTRE UN CAS RÉEL : la gestion des images distantes.
 *
 * PROBLÈME SPÉCIFIQUE AUX IMAGES :
 * ==================================
 * Quand l'admin uploade une photo dans Django (/admin/),
 * Django la sauvegarde dans :  d:/Inno/innotech_backend/media/team/photo.jpg
 *
 * Dans le JSON retourné par l'API, le champ image contient :
 *   "image": "http://127.0.0.1:8000/media/team/photo.jpg"
 *
 * React peut directement utiliser cette URL dans <img src={member.image} />.
 *
 * MAIS si aucune photo n'est uploadée, le champ vaut null :
 *   "image": null
 *
 * SOLUTION DE FALLBACK :
 *   On utilise le service ui-avatars.com pour générer un avatar automatique
 *   à partir du nom de la personne. Ex: "Jean Dupont" → avatar "JD".
 *   src={member.image || `https://ui-avatars.com/api/?name=${member.name}&...`}
 *   L'opérateur || signifie "si member.image est null/vide, utilise l'URL d'avatar".
 *
 * RÉSUMÉ DU FLUX :
 *   Django → JSON → React
 *   { name: "Marie", image: "http://127.0.0.1:8000/media/team/marie.jpg" }
 *                                      ↑
 *                   URL complète servie par Django (voir core_project/urls.py)
 */

import React, { useState, useEffect } from "react";
import "./team.css";

const Team = () => {
  // ─────────────────────────────────────────────────────────────────
  // ÉTAT : tableau vide initialement, rempli après l'appel API
  // ─────────────────────────────────────────────────────────────────
  const [team, setTeam] = useState([]);

  // ─────────────────────────────────────────────────────────────────
  // APPEL API : récupère tous les membres de l'équipe au montage
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    // GET http://127.0.0.1:8000/api/team-members/
    // Django exécute : SELECT * FROM api_teammember ORDER BY created_at
    // Retourne : [{ id, name, role, image, bio, linkedin, twitter, facebook }, ...]
    fetch("http://127.0.0.1:8000/api/team-members/")
      .then((res) => res.json())      // Convertit le texte JSON en tableau JavaScript
      .then((data) => setTeam(data))  // Stocke dans l'état → React re-affiche
      .catch((err) => console.error("❌ Erreur API team-members:", err));
  }, []); // [] = une seule fois au montage

  // ─────────────────────────────────────────────────────────────────
  // AFFICHAGE CONDITIONNEL :
  // Si l'équipe est vide (aucun membre en base), on n'affiche rien.
  // Cela évite d'afficher une section "Notre Équipe" vide et laide.
  // L'admin peut ajouter des membres via http://127.0.0.1:8000/admin/
  // ─────────────────────────────────────────────────────────────────
  if (team.length === 0) return null;

  return (
    <section className="team-section">
      <div className="container">
        <p className="subtitle">NOTRE ÉQUIPE</p>
        <h2 className="title">Rencontrez Nos Experts</h2>
        <p className="description">
          Une équipe passionnée et dévouée à transformer vos idées en réalités numériques percutantes.
        </p>

        <div className="team-grid">
          {/*
           * .map() parcourt le tableau "team" et crée une carte JSX pour chaque membre.
           * key={member.id} : identifiant unique requis par React pour optimiser le rendu.
           * L'id vient directement de la base de données Django (clé primaire auto-incrémentée).
           */}
          {team.map((member) => (
            <div className="team-card" key={member.id}>
              <div className="member-image">

                {/*
                 * GESTION INTELLIGENTE DE L'IMAGE :
                 *
                 * member.image → URL complète Django :
                 *   "http://127.0.0.1:8000/media/team/jean.jpg"
                 *
                 * Si member.image est null (pas de photo uploadée) :
                 *   Fallback vers ui-avatars.com qui génère un avatar
                 *   avec les initiales du nom. Complètement automatique !
                 *
                 * Exemple : member.name = "Jean Dupont"
                 * → https://ui-avatars.com/api/?name=Jean+Dupont&background=random&size=300
                 * → affiche un cercle coloré avec "JD"
                 */}
                <img
                  src={
                    member.image
                      ? member.image // ← URL de l'image Django (ex: .../media/team/jean.jpg)
                      : `https://ui-avatars.com/api/?name=${member.name}&background=random&size=300`
                  }
                  alt={member.name}
                />

                {/*
                 * AFFICHAGE CONDITIONNEL DES RÉSEAUX SOCIAUX :
                 * On n'affiche le lien QUE si le champ n'est pas null.
                 * member.linkedin && <a>...</a> = affiche le <a> seulement si linkedin existe.
                 * C'est l'opérateur de court-circuit : si faux → n'affiche rien.
                 */}
                <div className="social-links">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  )}
                  {member.facebook && (
                    <a href={member.facebook} target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  )}
                </div>
              </div>

              <div className="member-info">
                <h3>{member.name}</h3>         {/* Correspond au champ "name" du modèle */}
                <span>{member.role}</span>       {/* Correspond au champ "role" du modèle */}
                {/* La bio n'est affichée que si elle n'est pas vide (blank=True dans le modèle) */}
                {member.bio && <p>{member.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
