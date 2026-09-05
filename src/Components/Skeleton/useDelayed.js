import { useEffect, useState } from "react";

/**
 * Ne signale une attente que si elle dure.
 *
 * Un chargement de quarante millisecondes qui affiche puis retire un squelette
 * produit un clignotement — plus désagréable que l'attente elle-même. En
 * dessous du seuil, la page ne montre rien et le contenu apparaît directement.
 */
export function useDelayed(active, ms = 220) {
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setElapsed(true), ms);
    return () => clearTimeout(id);
  }, [active, ms]);

  // Le résultat est dérivé plutôt que remis à zéro dans l'effet : un `setState`
  // appelé directement dans un effet déclenche un second rendu pour rien.
  return active && elapsed;
}
