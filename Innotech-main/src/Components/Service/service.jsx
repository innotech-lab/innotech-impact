/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║     CHAPITRE 8 : service.jsx — Exemple de Lecture (GET)         ║
 * ║                  "Comment React récupère des données"           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * CE COMPOSANT ILLUSTRE LE PATTERN FONDAMENTAL DE LECTURE D'API :
 *   1. Déclarer un état (useState) pour stocker les données
 *   2. Déclencher le chargement (useEffect) au montage du composant
 *   3. Appeler l'API avec fetch()
 *   4. Stocker la réponse dans l'état
 *   5. Afficher les données dans le JSX
 *
 * FLUX COMPLET :
 * ===============
 *  [Composant monte]
 *       ↓
 *  useEffect() se déclenche
 *       ↓
 *  fetch('http://127.0.0.1:8000/api/services/')  ──── requête GET ────►  Django
 *                                                 ◄── JSON réponse ────  Django
 *       ↓
 *  setServices(data)  → React re-affiche le composant avec les données
 *       ↓
 *  services.map(service => <div>...</div>)  → Affichage des cartes
 */

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Service.css';

const Service = () => {
  // ─────────────────────────────────────────────────────────────────
  // ÉTAPE 1 : DÉCLARER LES ÉTATS (useState)
  // ─────────────────────────────────────────────────────────────────
  //
  // useState([]) crée une variable "services" initialement vide [].
  // setServices() est la fonction pour modifier cette variable.
  // Chaque fois que setServices() est appelée, React re-affiche le composant.
  //
  // Analogie : c'est comme une boîte qui commence vide.
  // Quand l'API répond, on remplit la boîte avec les données.
  const [services, setServices] = useState([]);

  // État de chargement : true pendant que l'API répond, false ensuite.
  // Permet d'afficher un message "Chargement..." en attendant.
  const [isLoading, setIsLoading] = useState(true);

  // ─────────────────────────────────────────────────────────────────
  // ÉTAPE 2 : DÉCLENCHER L'APPEL API (useEffect)
  // ─────────────────────────────────────────────────────────────────
  //
  // useEffect(fonction, [dépendances]) :
  //   - La fonction est exécutée APRÈS que React a affiché le composant.
  //   - Le tableau [] vide = "execute cette fonction UNE SEULE FOIS,
  //     juste après le premier affichage" (comme componentDidMount en classe).
  //   - Si on mettait [services], la fonction se relancerait à chaque
  //     changement de "services" → boucle infinie ! Toujours mettre [].
  useEffect(() => {

    // ─────────────────────────────────────────────────────────────
    // ÉTAPE 3 : L'APPEL API AVEC fetch()
    // ─────────────────────────────────────────────────────────────
    //
    // fetch() est une fonction JavaScript native pour faire des requêtes HTTP.
    // Elle retourne une "Promesse" (Promise) : une valeur qui arrivera plus tard.
    // On utilise .then() pour définir quoi faire quand la réponse arrive.
    //
    // Ici on fait un GET (lecture) car on veut seulement lire les données.
    // Pas besoin de préciser method:'GET', c'est le défaut de fetch().
    fetch('http://127.0.0.1:8000/api/services/')
      // ÉTAPE 3a : Convertir la réponse HTTP brute en objet JavaScript
      // La réponse arrive sous forme de texte JSON brut.
      // .json() le parse et retourne un objet/tableau JavaScript utilisable.
      .then(response => response.json())

      // ÉTAPE 3b : Utiliser les données converties
      // "data" est maintenant un tableau d'objets JavaScript :
      // [{ id:1, title:"Dev Web", description:"...", icon_svg:"<svg>..." }, ...]
      .then(data => {
        setServices(data);    // On stocke les services dans l'état → React re-affiche
        setIsLoading(false);  // Le chargement est terminé
      })

      // ÉTAPE 3c : Gérer les erreurs réseau
      // Si le backend est éteint ou l'URL est mauvaise, on arrive ici.
      .catch(error => {
        console.error("❌ Erreur lors de la récupération des services:", error);
        setIsLoading(false); // Même en erreur, on arrête l'indicateur de chargement
      });

  }, []); // ← Le tableau vide est OBLIGATOIRE pour n'appeler l'API qu'une seule fois


  // ─────────────────────────────────────────────────────────────────
  // ÉTAPE 4 : AFFICHER LES DONNÉES (JSX)
  // ─────────────────────────────────────────────────────────────────
  return (
    <section className="startup-services">
      <div className="container">
        <div className="header-content">
          <span className="badge">Nos Services</span>
          <h2>Propulsez votre vision</h2>
          <p>Nous combinons innovation technique et vision business pour créer l'avenir de votre entreprise.</p>
        </div>

        <div className="services-grid">
          {/* Affichage conditionnel selon l'état du chargement */}

          {isLoading ? (
            // CAS 1 : L'API n'a pas encore répondu → message de chargement
            <p>Chargement des services depuis l'API...</p>

          ) : services.length === 0 ? (
            // CAS 2 : L'API a répondu mais il n'y a aucun service en base
            // → L'admin doit en ajouter via http://127.0.0.1:8000/admin/
            <p>Aucun service disponible. Ajoutez-en via le panel d'administration Django.</p>

          ) : (
            // CAS 3 : Les données sont là → on les affiche avec .map()
            // .map() parcourt le tableau et retourne un composant JSX pour chaque élément.
            // La prop "key" est obligatoire pour que React optimise les re-rendus.
            services.map((service) => (
              <div className="card" key={service.id}>

                {/* Affichage du SVG reçu depuis Django
                    dangerouslySetInnerHTML injecte du HTML brut dans le DOM.
                    On l'utilise car service.icon_svg contient une chaîne "<svg>...</svg>".
                    Le nom "dangerously" rappelle de ne JAMAIS l'utiliser avec
                    du contenu entré par les utilisateurs (risque XSS). */}
                <div
                  className="icon-wrapper"
                  dangerouslySetInnerHTML={{ __html: service.icon_svg }}
                />

                {/* Les propriétés correspondent exactement aux champs
                    du modèle Service dans models.py */}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/services" className="learn-more">En savoir plus →</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Service;