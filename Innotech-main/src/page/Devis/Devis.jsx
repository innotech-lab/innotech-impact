/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║   CHAPITRE 15 : Devis.jsx — Formulaire Complexe (POST)          ║
 * ║                  "Gérer les sélecteurs et l'envoi"               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * CE COMPOSANT ILLUSTRE : L'ENVOI DE DONNÉES STRUCTURÉES
 * =======================================================
 * Contrairement au formulaire de contact simple, celui-ci inclut 
 * un élément <select> (menu déroulant). 
 * 
 * 1. SYNCHRONISATION (Binding) :
 *    -------------------------
 *    Chaque champ (input, select, textarea) est lié à l'état `formData`.
 *    Quand vous changez une option dans le select, `handleChange` met 
 *    à jour `formData.service`.
 * 
 * 2. L'URL DE L'API :
 *    ---------------
 *    On envoie les données vers `http://127.0.0.1:8000/api/quotes/`.
 *    Django reçoit cet objet JSON et crée une entrée dans la table `QuoteRequest`.
 * 
 * 3. RETOUR UTILISATEUR :
 *    -------------------
 *    On utilise `loading` pour désactiver le bouton pendant l'envoi.
 *    C'est crucial pour éviter que l'utilisateur ne clique 10 fois 
 *    pendant que le serveur réfléchit !
 */

import React, { useState } from 'react';
import './devis.css';

const Devis = () => {
  // L'état regroupe tous les champs attendus par Django (voir models.py QuoteRequest)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Étape 1 : Récupérer la liste des services pour le menu déroulant
  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/api/services/')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Erreur chargement services:", err));
  }, []);

  // Fonction générique pour mettre à jour n'importe quel champ du formulaire
  const handleChange = (e) => {
    // e.target.id correspond à l'attribut id de l'élément (name, email, service, message)
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Empêche le rechargement de la page
    e.preventDefault();
    setLoading(true);

    try {
      // Étape CRUCIALE : Envoi du JSON au backend
      const response = await fetch('http://127.0.0.1:8000/api/quotes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // On convertit notre objet JavaScript en texte JSON
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("✨ Votre demande de devis a été envoyée avec succès !");
        // On vide le formulaire pour le prochain usage
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        alert("❌ Erreur lors de l'envoi. Vérifiez vos informations.");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Erreur réseau. Le serveur Django est-il allumé ?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="devis-container">
      <div className="devis-header">
        <h2>Demande de Devis</h2>
        <p>Parlez-nous de votre projet. Nous vous répondrons dans les plus brefs délais.</p>
      </div>
      
      <div className="devis-form-wrapper">
        <form className="devis-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input type="text" id="name" placeholder="Votre nom" required value={formData.name} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Adresse Email</label>
            <input type="email" id="email" placeholder="Votre adresse email" required value={formData.email} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label htmlFor="service">Service souhaité</label>
            {/* Le select fonctionne comme un input : sa valeur est liée au state */}
            <select id="service" required value={formData.service} onChange={handleChange}>
              <option value="">Sélectionnez un service</option>
              {services.map(s => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
              <option value="Autre">Autre</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Détails du projet</label>
            <textarea id="message" rows="5" placeholder="Décrivez votre besoin..." required value={formData.message} onChange={handleChange}></textarea>
          </div>
          
          <button type="submit" className="devis-submit-btn" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer la demande"}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Devis;
