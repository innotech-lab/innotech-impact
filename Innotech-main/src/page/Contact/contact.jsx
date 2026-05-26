/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║   CHAPITRE 12 : page/Contact/contact.jsx                        ║
 * ║       "GET + POST dans le même composant — Double connexion"    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * CE COMPOSANT EST LE PLUS COMPLET DU PROJET.
 * Il illustre deux types de connexion API dans un seul composant :
 *
 *   1. GET  → Récupère les coordonnées de l'entreprise (adresse, tél, email, map)
 *             depuis Django pour les afficher dynamiquement.
 *
 *   2. POST → Envoie le message du formulaire vers Django qui le
 *             sauvegarde en base et notifie l'admin par email.
 *
 * DIAGRAMME DES DEUX CONNEXIONS :
 * =================================
 *
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │                     page/Contact/contact.jsx                 │
 *  │                                                             │
 *  │  useEffect() ──GET──► /api/company-info/ ──► companyInfo   │
 *  │                                              ↓              │
 *  │                                         Affiche adresse,   │
 *  │                                         téléphone, email,  │
 *  │                                         Google Maps iframe  │
 *  │                                                             │
 *  │  handleSubmit() ──POST──► /api/contact/ ──► BD + Email     │
 *  │                                              ↓              │
 *  │                                         Alert "Succès !"   │
 *  └─────────────────────────────────────────────────────────────┘
 *
 * AVANTAGE DE CETTE ARCHITECTURE :
 * ==================================
 * L'adresse, le téléphone, l'email et la carte Google Maps
 * sont gérés par l'admin Django (CompanyInfo).
 * Changer ces infos dans /admin/ → le site se met à jour AUTOMATIQUEMENT.
 * Pas besoin de modifier le code React !
 */

import { useState, useEffect } from "react";
import "./contact.css";

function Contact() {

  // ─────────────────────────────────────────────────────────────────
  // ÉTAT 1 : Informations de l'entreprise (chargées depuis l'API)
  // ─────────────────────────────────────────────────────────────────
  // On initialise avec des valeurs par défaut (fallback).
  // Si l'API échoue, ces valeurs s'affichent quand même.
  // Quand l'API répond, ces valeurs sont remplacées par les données réelles.
  const [companyInfo, setCompanyInfo] = useState({
    address: "Kabondo Avenue Lac Rweru No7",       // Valeur par défaut
    email:   "contact@innotech.bi",                // Valeur par défaut
    phone:   "+257 79 00 00 00",                  // Valeur par défaut
    map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15933.123456789!2d29.36!3d-3.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c1829999999999%3A0x9999999999999999!2sBujumbura%2C%20Burundi!5e0!3m2!1sfr!2sbi!4v1714151234567!5m2!1sfr!2sbi"
  });

  // ─────────────────────────────────────────────────────────────────
  // ÉTAT 2 : Champs du formulaire de contact
  // ─────────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    subject: "",
    message: ""
  });

  // État de chargement pour désactiver le bouton pendant l'envoi
  const [loading, setLoading] = useState(false);


  // ─────────────────────────────────────────────────────────────────
  // CONNEXION 1 : GET /api/company-info/
  // Lecture des informations de l'entreprise au chargement
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    // GET http://127.0.0.1:8000/api/company-info/
    //
    // Django retourne un TABLEAU avec une seule entrée (singleton) :
    // [
    //   {
    //     "id": 1,
    //     "address": "Kabondo Avenue Lac Rweru No7",
    //     "email": "info@innotech.bi",
    //     "phone": "+257 79 00 00 00",
    //     "map_url": "https://maps.google.com/embed?..."
    //   }
    // ]
    fetch('http://127.0.0.1:8000/api/company-info/')
      .then(res => res.json())
      .then(data => {
        // data est un tableau → on prend data[0] (la première et seule entrée)
        // On vérifie d'abord que le tableau n'est pas vide (data.length > 0)
        // pour éviter une erreur si CompanyInfo n'est pas encore créé dans l'admin.
        if (data.length > 0) setCompanyInfo(data[0]);
        // Si data est vide → on garde les valeurs par défaut déclarées dans useState()
      })
      .catch(err => console.error("❌ Erreur API company-info:", err));

  }, []); // [] = s'exécute une seule fois au montage du composant


  // ─────────────────────────────────────────────────────────────────
  // PATTERN CONTROLLED INPUT — handleChange
  // ─────────────────────────────────────────────────────────────────
  // Met à jour dynamiquement le champ concerné dans l'état "form".
  // La notation [e.target.name] = clé dynamique :
  //   si l'utilisateur tape dans le champ name="subject" → met à jour form.subject
  //   si l'utilisateur tape dans le champ name="message" → met à jour form.message
  const handleChange = (e) => {
    setForm({
      ...form,                   // Copie tous les champs existants
      [e.target.name]: e.target.value  // Met à jour uniquement le champ modifié
    });
  };


  // ─────────────────────────────────────────────────────────────────
  // CONNEXION 2 : POST /api/contact/
  // Envoi du formulaire de contact vers Django
  // ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    // Stoppe le rechargement de page natif du navigateur
    e.preventDefault();
    setLoading(true);

    try {
      // ── ÉTAPE A : Construire et envoyer la requête POST ──────
      const response = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',

        headers: {
          // Ce header est OBLIGATOIRE pour les requêtes POST avec JSON.
          // Il indique à Django REST Framework comment "lire" le body.
          // Sans lui, Django retournerait une erreur 415 Unsupported Media Type.
          'Content-Type': 'application/json',
        },

        // JSON.stringify(form) convertit l'objet JavaScript en chaîne JSON :
        // { name:"Jean", email:"...", subject:"...", message:"..." }
        // → '{"name":"Jean","email":"...","subject":"...","message":"..."}'
        //
        // Django reçoit cette chaîne, la parse, valide chaque champ
        // selon les règles du modèle ContactMessage, puis sauvegarde en BD.
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          // Valeur par défaut si le sujet est laissé vide par l'utilisateur
          subject: form.subject || "Message depuis la page Contact",
          message: form.message
        })
      });

      // ── ÉTAPE B : Vérifier le statut de la réponse ───────────
      if (response.ok) {
        // Django a retourné 201 Created → tout s'est bien passé
        alert("✅ Message envoyé avec succès !");
        // Réinitialise tous les champs du formulaire
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        // Django a retourné une erreur 400 (données invalides) ou 500 (erreur serveur)
        alert("❌ Erreur lors de l'envoi du message.");
      }

    } catch (error) {
      // Erreur RÉSEAU : le backend est éteint, ou pas de connexion internet
      console.error("❌ Erreur réseau:", error);
      alert("Erreur réseau. Vérifiez que le backend est allumé sur http://127.0.0.1:8000");

    } finally {
      // Toujours désactiver le chargement à la fin, succès ou échec
      setLoading(false);
    }
  };


  // ─────────────────────────────────────────────────────────────────
  // RENDU JSX : Affichage des données de l'API + Formulaire POST
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="contact-page">

      {/* ── EN-TÊTE DE LA PAGE ── */}
      <section className="contact-hero">
        <div className="container">
          <h2>Contactez-nous</h2>
          <p>Nous sommes là pour répondre à vos questions et vous accompagner dans vos projets.</p>
        </div>
      </section>

      {/* ── CARTES D'INFORMATIONS DE CONTACT ──
          Ces valeurs viennent de l'état "companyInfo", lui-même
          chargé depuis GET /api/company-info/ au montage du composant.
          Si l'admin modifie l'adresse dans Django → s'affiche ici automatiquement. */}
      <section className="contact-cards container">
        <div className="info-card">
          <i className="fa-solid fa-location-dot"></i>
          <h3>Adresse</h3>
          <p>{companyInfo.address}</p>   {/* Donnée Django */}
        </div>
        <div className="info-card">
          <i className="fa-solid fa-phone"></i>
          <h3>Téléphone</h3>
          <p>{companyInfo.phone}</p>     {/* Donnée Django */}
        </div>
        <div className="info-card">
          <i className="fa-solid fa-envelope"></i>
          <h3>Email</h3>
          <p>{companyInfo.email}</p>     {/* Donnée Django */}
        </div>
      </section>

      {/* ── FORMULAIRE + CARTE GOOGLE MAPS ── */}
      <section className="contact-main container">
        <div className="contact-grid">

          {/* FORMULAIRE POST */}
          <div className="contact-form-container">
            <h3>Envoyez un message</h3>
            {/*
             * onSubmit={handleSubmit} : React intercepte le submit
             * et appelle notre fonction async qui fait le POST vers Django.
             */}
            <form onSubmit={handleSubmit} className="contact-form">
              {/* name="name" → correspond à la clé dans l'état "form"
                  value={form.name} → Controlled Input (React contrôle la valeur)
                  required → validation HTML native (backup si JS désactivé) */}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Sujet"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Votre message"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? "Envoi..." : "Envoyer le Message"}
              </button>
            </form>
          </div>

          {/* CARTE GOOGLE MAPS — URL chargée depuis /api/company-info/
              companyInfo.map_url contient le lien "Intégrer une carte" de Google Maps.
              L'opérateur || fournit un fallback si map_url est null en base de données. */}
          <div className="contact-map">
            <h3>Notre Emplacement</h3>
            <iframe
              src={companyInfo.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15933.123456789!2d29.36!3d-3.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c1829999999999%3A0x9999999999999999!2sBujumbura%2C%20Burundi!5e0!3m2!1sfr!2sbi!4v1714151234567!5m2!1sfr!2sbi"}
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: "15px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bujumbura Map"
            ></iframe>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Contact;