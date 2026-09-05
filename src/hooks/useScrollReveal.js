import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Révélation au défilement, pilotée par attribut.
 *
 * Un seul observateur pour tout le site plutôt qu'un hook par composant : les
 * pages n'ont qu'à poser `data-reveal` sur un élément, et rien à importer. Un
 * MutationObserver rattrape les éléments montés après coup — les routes sont en
 * React.lazy, leur contenu arrive donc après ce montage.
 *
 * L'animation elle-même vit dans motion.css : ce hook ne fait qu'ajouter la
 * classe `is-revealed` au bon moment.
 */

const SELECTOR = "[data-reveal]";

export default function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Mouvement réduit : on révèle sans attendre, mais on garde le même chemin
    // de code — sortir ici raterait les routes montées en différé, et leur
    // contenu resterait masqué. C'est exactement ce que le sondage a trouvé.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target); // une seule fois, jamais au retour
        }
      },
      // Le déclenchement se fait un peu avant le bas de fenêtre : l'élément est
      // déjà en place quand le regard l'atteint, plutôt que d'arriver en retard.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    /** Indexe les enfants d'un conteneur en cascade pour décaler leur entrée. */
    const index = (el) => {
      if (!el.hasAttribute("data-reveal-stagger")) return;
      [...el.children].forEach((child, i) =>
        child.style.setProperty("--reveal-i", i),
      );
    };

    const observe = (root) => {
      const targets = root.matches?.(SELECTOR)
        ? [root, ...root.querySelectorAll(SELECTOR)]
        : [...root.querySelectorAll(SELECTOR)];
      for (const el of targets) {
        if (el.dataset.revealBound) continue;
        el.dataset.revealBound = "1";
        index(el);
        if (reduced) el.classList.add("is-revealed");
        else observer.observe(el);
      }
    };

    observe(document.body);

    /*
      Filet de sécurité. Un IntersectionObserver peut ne jamais se déclencher :
      élément dans un conteneur au défilement inattendu, onglet ouvert en
      arrière-plan, page trop courte pour que le seuil soit franchi. Passé ce
      délai, tout ce qui n'a pas été révélé l'est d'office — mieux vaut une
      animation manquée qu'un contenu perdu.
    */
    const safety = setTimeout(() => {
      document
        .querySelectorAll(`${SELECTOR}:not(.is-revealed)`)
        .forEach((el) => el.classList.add("is-revealed"));
    }, 3000);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === 1) observe(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(safety);
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);
}
