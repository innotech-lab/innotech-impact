import React from "react";
import "./section.css";
import Logor from "../../assets/Logor.png";
import TECH from "../../assets/TECH.png";
const PartnerSlider = () => {
  return (
    <section className="banner">
      <div className="logos-slide">

        {/* Groupe 1 */}
        <div className="logo">
         <img src={Logor} alt="Innotech Logo" className="logo-img" />
        </div>
        <div className="logo">
         <img src={TECH} alt="Innotech Logo" className="logo-img" />
        </div>
        <div className="logo">
         <img src={Logor} alt="Innotech Logo" className="logo-img" />
        </div>
      </div>
    </section>
  );
};

export default PartnerSlider;