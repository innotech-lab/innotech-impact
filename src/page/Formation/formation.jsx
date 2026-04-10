
import React, { useState } from "react";
import "./Formation.css"; // Assurez-vous que le fichier CSS est dans le même dossier

function Formation() {
  const formations = [
    {
      id: 1,
      titre: "Développement Web",
      details: "Apprendre HTML, CSS, JavaScript et React."
    },
    {
      id: 2,
      titre: "Base de données",
      details: "Maîtriser MySQL, SQL Server et la modélisation."
    },
    {
      id: 3,
      titre: "Réseaux",
      details: "Comprendre les réseaux, protocoles et sécurité."
    }
  ];

  const [openId, setOpenId] = useState(null);

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