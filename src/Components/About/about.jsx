import React from "react";
import "./about.css";
import aboutImg from "../../assets/hero.png";

const About = () => {
  return (
    <section className="about-section">

      {/* LEFT IMAGE */}
      <div className="about-image">
        <img src={aboutImg} alt="about" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="about-content">
        <h2>QUI SOMMES-NOUS?</h2>

        <p>
          MEDIABOX est une entreprise technologique pionnière qui s'engage à
          transformer le paysage numérique. Fondée en 2015, nous avons émergé
          en tant que leader en comblant le fossé entre les aspirations
          numériques et les réalisations.
        </p>

        <p>
          Notre mission principale est de permettre aux individus, aux
          entreprises et aux institutions de mener l'évolution numérique en
          toute confiance. MEDIABOX est le pont entre les aspirations et les
          réalisations numériques.
        </p>

        <p>
          Nous nous positionnons comme un partenaire tangible, permettant à
          divers clients de mener l'évolution numérique avec l'innovation,
          l'autonomisation, la fiabilité, la collaboration et la responsabilité.
        </p>

        <p>
          Chez MEDIABOX, nous pensons que le domaine numérique est rempli de
          possibilités infinies, attendant d'être déverrouillées.
        </p>

        <div className="about-buttons">
          <button className="btn-outline">
            Services <span>→</span>
          </button>
          <button className="btn-filled">
            Contactez-Nous <span>→</span>
          </button>
        </div>
      </div>

    </section>
  );
};

export default About;
