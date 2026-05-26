import React, { useState, useEffect } from "react";
import "./section.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const PartnerSlider = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/partners/')
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error(err));
  }, []);

  if (partners.length === 0) return null;

  return (
    <section className="banner">
      <div className="logos-slide">
        {partners.map(partner => (
          <div className="logo" key={partner.id}>
            {partner.logo ? (
              <img src={partner.logo} alt={partner.name} className="logo-img" />
            ) : (
              <span className="partner-name-fallback">{partner.name}</span>
            )}
          </div>
        ))}
        {/* On duplique pour l'effet de défilement infini CSS */}
        {partners.map(partner => (
          <div className="logo" key={`${partner.id}-dup`}>
            {partner.logo ? (
              <img src={partner.logo} alt={partner.name} className="logo-img" />
            ) : (
              <span className="partner-name-fallback">{partner.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnerSlider;