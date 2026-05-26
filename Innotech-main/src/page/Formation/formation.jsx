
import React, { useState, useEffect } from "react";
import "./formation.css";

function Formation() {
  const [formations, setFormations] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/formations/')
      .then(res => res.json())
      .then(data => setFormations(data))
      .catch(err => console.error(err));
  }, []);

  const toggleDetails = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="formation-container">
      <h1 className="formation-title">Nos Formations</h1>

      <div className="formation-list">
        {formations.map((formation) => (
          <div key={formation.id} className="formation-card">
            <div className="formation-header">
              <h3>{formation.titre}</h3>
              <button 
                className={`btn-toggle ${openId === formation.id ? "active" : ""}`}
                onClick={() => toggleDetails(formation.id)}
              >
                {openId === formation.id ? "Masquer" : "Afficher plus"}
              </button>
            </div>

            {openId === formation.id && (
              <div className="formation-details">
                <p>{formation.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Formation;
