/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         COURS COMPLET : CONNEXION BACKEND ↔ FRONTEND            ║
 * ║    CHAPITRE 13 : useInView.js — Custom Hook React               ║
 * ║           "Détecter quand un élément entre dans l'écran"        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * QU'EST-CE QU'UN CUSTOM HOOK ?
 * ================================
 * Un "Custom Hook" est une fonction JavaScript qui :
 *   1. Commence par le préfixe "use" (convention React obligatoire)
 *   2. Peut utiliser d'autres hooks React (useState, useEffect, useRef...)
 *   3. Encapsule une logique réutilisable qu'on peut importer partout
 *
 * C'est comme créer son propre outil dans la boîte à outils React.
 *
 * POURQUOI CE HOOK EXISTE-T-IL ?
 * ================================
 * On veut déclencher des animations CSS UNIQUEMENT quand l'élément
 * est visible à l'écran (dans le "viewport").
 *
 * PROBLÈME SANS CE HOOK :
 *   Les animations démarrent dès le chargement de la page,
 *   même pour les sections que l'utilisateur n'a pas encore vues.
 *
 * SOLUTION AVEC CE HOOK :
 *   On observe chaque section. Dès qu'elle entre dans l'écran,
 *   on ajoute une classe CSS qui déclenche l'animation.
 *   L'utilisateur voit l'animation au bon moment → effet "wow" !
 *
 * OUTIL UTILISÉ : l'API native du navigateur IntersectionObserver
 *   C'est une API JavaScript qui observe si un élément HTML
 *   croise le viewport (la zone visible de l'écran).
 *   Très performante car elle n'utilise pas d'écouteurs "scroll".
 *
 * UTILISATION DANS UN COMPOSANT :
 * =================================
 *   import { useInView } from '../../hooks/useInView';
 *
 *   function MonComposant() {
 *     const { ref, inView } = useInView({ threshold: 0.1 });
 *     // threshold: 0.1 = se déclenche quand 10% de l'élément est visible
 *
 *     return (
 *       <section ref={ref} className={inView ? 'animate-in' : ''}>
 *         Contenu qui s'anime quand il entre dans l'écran
 *       </section>
 *     );
 *   }
 */

import { useState, useEffect, useRef } from 'react';

/**
 * useInView — Détecte si un élément est visible dans le viewport.
 *
 * @param {Object} options - Options de l'IntersectionObserver
 *   @param {number} options.threshold - Entre 0 et 1. Pourcentage de l'élément
 *                                       visible pour déclencher l'observation.
 *                                       0.1 = 10% visible, 1 = 100% visible.
 *
 * @returns {{ ref: React.Ref, inView: boolean }}
 *   - ref    : À attacher à l'élément HTML à observer (ref={ref})
 *   - inView : true si l'élément est visible, false sinon
 */
export const useInView = (options = { threshold: 0.1 }) => {

  // ─────────────────────────────────────────────────────────────────
  // ÉTAT : inView — est-ce que l'élément est visible ?
  // ─────────────────────────────────────────────────────────────────
  // Commence à false (élément pas encore visible au chargement).
  // Passe à true dès que l'élément entre dans le viewport.
  const [inView, setInView] = useState(false);

  // ─────────────────────────────────────────────────────────────────
  // REF : référence directe à l'élément DOM
  // ─────────────────────────────────────────────────────────────────
  // useRef() crée une "référence" vers un élément HTML.
  // Elle permet d'accéder directement au DOM sans passer par React.
  // On l'attache à un élément avec : <div ref={ref}>
  // Ensuite, ref.current = l'élément HTML réel (ex: <section>)
  const ref = useRef(null);

  // ─────────────────────────────────────────────────────────────────
  // EFFET : Configuration de l'IntersectionObserver
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {

    // ── Création de l'observateur ─────────────────────────────────
    // IntersectionObserver prend un callback et des options.
    // Le callback est appelé chaque fois que l'état d'intersection change.
    const observer = new IntersectionObserver(([entry]) => {
      // "entry" contient les informations sur l'intersection.
      // entry.isIntersecting = true si l'élément est visible dans l'écran.
      if (entry.isIntersecting) {
        setInView(true);  // → React re-affiche avec inView=true → animation !

        // Optimisation : on arrête d'observer après le premier déclenchement.
        // L'animation ne se joue qu'une seule fois (au premier scroll jusqu'à l'élément).
        // Si on voulait re-animer à chaque apparition, il faudrait supprimer cette ligne
        // et aussi appeler setInView(false) quand l'élément quitte l'écran.
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options); // Les options (threshold) sont passées ici à l'observateur

    // ── Démarrer l'observation ────────────────────────────────────
    // On ne commence à observer que si ref.current existe (l'élément est monté dans le DOM).
    if (ref.current) {
      observer.observe(ref.current);
    }

    // ── Fonction de nettoyage (cleanup) ──────────────────────────
    // useEffect peut retourner une fonction "cleanup".
    // Elle est appelée automatiquement quand le composant est démonté (retiré du DOM).
    // C'est CRUCIAL pour éviter les fuites mémoire (memory leaks).
    // Sans ça, l'observer continuerait à tourner même si le composant n'existe plus.
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };

  }, [options]); // Se relance si les options changent (rare, mais correct)


  // ─────────────────────────────────────────────────────────────────
  // RETOUR DU HOOK
  // ─────────────────────────────────────────────────────────────────
  // On retourne un objet avec les deux valeurs dont le composant a besoin :
  //   - ref    : à attacher à l'élément (<section ref={ref}>)
  //   - inView : booléen pour conditionner le style/className
  return { ref, inView };
};
