import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Remet le défilement en haut à chaque changement de route.
 *
 * Sans cela, un visiteur qui clique sur un appel à l'action depuis le bas d'une
 * page arrive au milieu de la suivante — sur /devis, en plein formulaire, sans
 * avoir vu le titre ni le contexte.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduced ? "auto" : "instant",
    });
  }, [pathname]);

  return null;
}
