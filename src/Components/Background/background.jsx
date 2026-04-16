import React from "react";
import "./background.css";
import back2 from '../../assets/ba1.png'
import innotechlogo from "../../assets/video/JuneTech.mp4";

const Background = () => {
  return (
    <section className="herosection">

      {/* BACKGROUND IMAGE */}
      <div className="herosection-video">
        <img src={back2} alt="Background" />
      </div>

      {/* DARK OVERLAY */}
      <div className="herosection-overlay"></div>

      <div className="herosection-container">

        {/* LEFT TEXT */}
        <div className="herosection-text">
          <h1>
            Innovation <br />
            For The Future
          </h1>

          <p>
            Innotech Impact empowers businesses through
            modern technology, innovation and digital solutions.
          </p>

          <button className="herosection-btn">
            Discover More
          </button>

        </div>

        {/* RIGHT VIDEO CARD */}
        <div className="herosection-card">
          <video autoPlay muted loop playsInline>
            <source src={innotechlogo} type="video/mp4" />
          </video>
        </div>

      </div>

    </section>
  );
};

export default Background;