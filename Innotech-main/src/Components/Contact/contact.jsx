/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║   CHAPITRE 11 : Components/Contact/contact.jsx                  ║
 * ║           "Le formulaire rapide de la page d'accueil"           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * CE COMPOSANT ILLUSTRE : L'ENVOI DE DONNÉES (méthode POST)
 * ===========================================================
 * C'est la version courte du formulaire de contact, intégrée
 * directement dans la page d'accueil (section défilante).
 *
 * DIFFÉRENCE AVEC page/Contact/contact.jsx :
 *   - Ce composant (Components/) = formulaire simple 3 champs, accueil
 *   - La page (page/) = page complète avec carte, infos, Google Maps
 *
 * PATTERN POST (ÉCRITURE) VS GET (LECTURE) :
 * ============================================
 *
 *  GET  (lire)   : React  ──► Django ──► Base de données ──► JSON ──► React
 *  POST (écrire) : React  ──► Django ──► Base de données (INSERT)
 *
 *  Pour le POST, on doit :
 *    1. Spécifier method: 'POST' dans fetch()
 *    2. Ajouter 'Content-Type': 'application/json' dans les headers
 *    3. Convertir l'objet JS en texte JSON avec JSON.stringify()
 *    4. Envoyer ce texte dans body:
 *
 *  fetch('/api/contact/', {
 *    method: 'POST',
 *    headers: { 'Content-Type': 'application/json' },
 *    body: JSON.stringify({ name: "...", email: "...", message: "..." })
 *  })
 *
 * VALIDATION CÔTÉ FRONTEND :
 * ============================
 * Avant d'envoyer la requête, on valide les données côté React.
 * C'est une "pré-validation" pour améliorer l'UX (expérience utilisateur).
 * Django fait SA PROPRE validation côté serveur (toujours).
 * Les deux validations sont complémentaires.
 */

import { useState } from "react";
import "./contact.css";

function Contact() {
                    
  // ─────────────────────────────────────────────────────────────────
  // ÉTATS DU FORMULAIRE
  // ─────────────────────────────────────────────────────────────────

  // "form" : stocke les valeurs actuelles des champs du formulaire.
  // Chaque champ commence vide "".
  // React maintient ces valeurs à jour via le pattern "Controlled Input".
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  // "errors" : objet qui stocke les messages d'erreur par champ.
  // Ex: { name: "Le nom est requis", email: "" }
  // Un champ sans erreur a une chaîne vide.
  const [errors, setErrors] = useState({});

  // "loading" : true pendant que la requête API est en cours.
  // Permet de désactiver le bouton pour éviter les doubles envois.
  const [loading, setLoading] = useState(false);


  // ─────────────────────────────────────────────────────────────────
  // VALIDATION CÔTÉ FRONTEND
  // ─────────────────────────────────────────────────────────────────
  // Cette fonction vérifie les règles AVANT d'envoyer à Django.
  // Elle retourne true (valide) ou false (erreurs détectées).
  const validateForm = () => {
    const newErrors = {};

    // Règle 1 : Le nom ne peut pas être vide
    // .trim() supprime les espaces en début/fin (évite " " comme valeur valide)
    if (!form.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    // Règle 2 : L'email doit être présent et valide
    if (!form.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      // Expression régulière qui vérifie le format xxx@xxx.xxx
      newErrors.email = "Email invalide";
    }

    // Règle 3 : Le message doit avoir au moins 10 caractères
    if (!form.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    // On stocke les erreurs trouvées dans l'état "errors"
    // React affichera les messages d'erreur sous chaque champ
    setErrors(newErrors);

    // Si newErrors est vide ({}), alors Object.keys(newErrors).length === 0 = true (valide)
    return Object.keys(newErrors).length === 0;
  };


  // ─────────────────────────────────────────────────────────────────
  // PATTERN "CONTROLLED INPUT" — handleChange
  // ─────────────────────────────────────────────────────────────────
  // Un "Controlled Input" est un champ <input> dont la valeur est
  // totalement contrôlée par React (via l'état "form").
  //
  // À chaque frappe clavier :
  //   1. L'utilisateur tape une lettre dans le champ
  //   2. onChange déclenche handleChange
  //   3. handleChange met à jour l'état "form"
  //   4. React re-affiche l'input avec la nouvelle valeur
  //
  // C'est le React qui "contrôle" ce qui est affiché, pas le navigateur.
  const handleChange = (e) => {
    // e.target.name  = l'attribut name de l'input (ex: "email")
    // e.target.value = ce que l'utilisateur a tapé (ex: "jean@mail.com")
    const { name, value } = e.target;

    // On copie l'état précédent (...prev) et on met à jour UN champ.
    // La notation [name] permet d'utiliser une variable comme clé d'objet.
    // Ex: [name] = ["email"] → met à jour form.email uniquement.
    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer l'erreur du champ dès que l'utilisateur recommence à taper
    // → feedback visuel immédiat (le message d'erreur disparaît)
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };


  // ─────────────────────────────────────────────────────────────────
  // SOUMISSION DU FORMULAIRE — handleSubmit (POST vers Django)
  // ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    // IMPORTANT : e.preventDefault() annule le comportement par défaut du navigateur.
    // Par défaut, un <form> recharge la page au submit. On veut éviter ça
    // pour garder le contrôle total avec fetch() et notre propre logique.
    e.preventDefault();

    // On valide d'abord. Si invalide → on stoppe tout (return early pattern).
    if (!validateForm()) {
      return; // Django n'est jamais contacté si la validation échoue
    }

    // On active l'état de chargement → le bouton affiche "Envoi en cours..."
    setLoading(true);

    try {
      // ── REQUÊTE POST VERS DJANGO ──────────────────────────────
      // La fonction fetch() avec method:'POST' = envoyer des données.
      // Django REST Framework reçoit ces données, les valide à nouveau
      // côté serveur, les sauvegarde en BD, et envoie une notification email.
      const response = await fetch('http://127.0.0.1:8000/api/contact/', {

        method: 'POST', // Indique à Django "je veux CRÉER une nouvelle ressource"

        headers: {
          // On dit à Django que le "colis" qu'on envoie est au format JSON.
          // Sans ce header, Django ne saura pas comment lire le body.
          'Content-Type': 'application/json',
        },

        // JSON.stringify() : transforme l'objet JavaScript en texte JSON.
        // Ex: { name: "Jean", email: "jean@mail.com", message: "Bonjour" }
        // devient : '{"name":"Jean","email":"jean@mail.com","message":"Bonjour"}'
        // C'est ce texte qui voyage sur le réseau jusqu'à Django.
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          // "subject" est obligatoire dans le modèle Django ContactMessage.
          // Ce composant n'a pas de champ sujet, donc on met une valeur par défaut.
          subject: "Nouveau message de contact",
          message: form.message
        })
      });

      // ── TRAITEMENT DE LA RÉPONSE ──────────────────────────────
      // response.ok = true si le status HTTP est entre 200 et 299.
      // Django retourne 201 Created si tout va bien.
      if (response.ok) {
        alert("✅ Message envoyé avec succès !");
        // On réinitialise le formulaire (vide tous les champs)
        setForm({ name: "", email: "", message: "" });
      } else {
        // Django retourne 400 Bad Request si la validation échoue côté serveur.
        alert("❌ Erreur lors de l'envoi du message.");
      }

    } catch (error) {
      // Ce catch attrapera les erreurs RÉSEAU (ex: le backend est éteint,
      // pas de connexion internet, URL incorrecte).
      // Ce n'est PAS pour les erreurs de validation (400) — celles-ci
      // arrivent dans le else du if(response.ok) ci-dessus.
      console.error("❌ Erreur réseau lors de l'envoi:", error);
      alert("Erreur réseau. Vérifiez que le backend Django est bien démarré.");

    } finally {
      // "finally" s'exécute TOUJOURS, qu'il y ait une erreur ou non.
      // On s'assure de toujours désactiver le chargement à la fin.
      setLoading(false);
    }
  };


  // ─────────────────────────────────────────────────────────────────
  // RENDU JSX
  // ─────────────────────────────────────────────────────────────────
  return (
    <section className="contact" id="contact">
      <h2>Contactez-nous</h2>

      {/*
       * onSubmit={handleSubmit} : React intercepte la soumission et
       * appelle notre handleSubmit() au lieu du comportement HTML par défaut.
       */}
      <form onSubmit={handleSubmit} className="contact-form">

        {/* ── Champ NOM ── */}
        <div className="form-group">
          {/* 
              - name="name" : doit correspondre à la clé dans l'état "form"
              - value={form.name} : Controlled Input (valeur pilotée par React)
              - onChange : met à jour l'état à chaque frappe
          */}
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* ── Champ EMAIL ── */}
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* ── Champ MESSAGE ── */}
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Votre message"
            value={form.message}
            onChange={handleChange}
            className={errors.message ? "input-error" : ""}
          ></textarea>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        {/*
         * disabled={loading} : le bouton devient grisé et non-cliquable
         * pendant que la requête est en cours → évite les doubles envois.
         */}
        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer"}
        </button>

      </form>
    </section>
  );
}

export default Contact;