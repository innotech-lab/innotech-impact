import React from "react";
import "./section.css";
import TECH from "../../assets/TECH.png";
import comlb from "../../assets/comlb.png";
import kithub from "../../assets/kithub.png";
import Lm from "../../assets/Lm.png";
import Women from "../../assets/Women.png";
import Gnosis from "../../assets/Gnosis.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
const PartnerSlider = () => {
  return (
    <section className="banner">
      <div className="logos-slide">
        {/* Groupe 1 */}
        <div className="logo">
         <img src={TECH} alt="Innotech Logo" className="logo-img" />
        </div>
         <div className="logo">
         <img src={comlb} alt="Innotech Logo" className="logo-img" />
        </div>
         <div className="logo">
         <img src={kithub} alt="Innotech Logo" className="logo-img" />
        </div>
         <div className="logo">
         <img src={Lm} alt="Innotech Logo" className="logo-img" />
        </div>
         <div className="logo">
         <img src={Women} alt="Innotech Logo" className="logo-img" />
        </div>
        <div className="logo">
         <img src={Gnosis} alt="Innotech Logo" className="logo-img" />
        </div>
      </div>
    </section>
  );
};

export default PartnerSlider;