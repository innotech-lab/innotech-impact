
import React from 'react';
<<<<<<< HEAD
import { Link } from "react-router-dom";
import './Service.css';
=======
import './service.css';
>>>>>>> 433ba18e6f01dbda36104a65c76f00fea5624f2d

const startupServices = [
  {
    title: "Conseil Stratégique",
    description: "Nous transformons vos idées complexes en feuilles de route exploitables pour accélérer votre croissance.",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
      </svg>
    )
  },
  {
    title: "Développement Produit",
    description: "De l'architecture au déploiement, nous bâtissons des solutions robustes et scalables adaptées à votre marché.",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
      </svg>
    )
  },
  {
    title: "Design Expérientiel",
    description: "Une approche centrée sur l'utilisateur pour garantir une adoption rapide et une satisfaction client maximale.",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    )
  }
];

const Service = () => {
  return (
    <section className="startup-services">
      <div className="container">
        <div className="header-content">
          <span className="badge">Nos Services</span>
          <h2>Propulsez votre vision</h2>
          <p>Nous combinons innovation technique et vision business pour créer l'avenir de votre entreprise.</p>
        </div>

        <div className="services-grid">
          {startupServices.map((service, index) => (
            <div className="card" key={index}>
              <div className="icon-wrapper">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to="/services" className="learn-more">En savoir plus →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;