import React from 'react';
import './devis.css';

const Devis = () => {
  return (
    <div className="devis-container">
      <div className="devis-header">
        <h2>Demande de Devis</h2>
        <p>Parlez-nous de votre projet. Nous vous répondrons dans les plus brefs délais.</p>
      </div>
      <div className="devis-form-wrapper">
        <form className="devis-form">
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input type="text" id="name" placeholder="Votre nom" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Adresse Email</label>
            <input type="email" id="email" placeholder="Votre adresse email" required />
          </div>
          <div className="form-group">
            <label htmlFor="service">Service souhaité</label>
            <select id="service" required>
              <option value="">Sélectionnez un service</option>
              <option value="web">Développement Web</option>
              <option value="mobile">Application Mobile</option>
              <option value="design">Design UI/UX</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Détails du projet</label>
            <textarea id="message" rows="5" placeholder="Décrivez votre besoin..." required></textarea>
          </div>
          <button type="submit" className="devis-submit-btn">Envoyer la demande</button>
        </form>
      </div>
    </div>
  );
};

export default Devis;
