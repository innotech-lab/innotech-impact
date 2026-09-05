import { createContext, useContext } from "react";

/**
 * Bilingue français / anglais — contexte et accès.
 *
 * La clé de traduction est la phrase française elle-même. Ce choix a deux
 * conséquences qui comptent :
 *
 *   — le français reste lisible dans le JSX, on ne relit pas `hero.title.line2`
 *     pour savoir ce qu'affiche un composant ;
 *   — une traduction manquante retombe sur le français, jamais sur une clé nue.
 *     Une page à moitié traduite reste une page lisible.
 *
 * Aucune bibliothèque : react-i18next et ses satellites pèsent une quarantaine
 * de kilo-octets pour deux langues et zéro pluriel complexe. Ici, un contexte et
 * une recherche dans un objet suffisent.
 *
 * Le fournisseur vit dans LangProvider.jsx : un fichier qui exporte à la fois un
 * composant et des hooks casse le rafraîchissement à chaud de Vite.
 */

export const LangContext = createContext(null);
export const STORAGE_KEY = "innotech-lang";

/** La langue au premier rendu : choix mémorisé, puis langue du navigateur. */
export function initialLang() {
  if (typeof window === "undefined") return "fr";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    // Navigation privée, stockage bloqué : on continue sans mémoire.
  }
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "fr";
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang doit être appelé sous <LangProvider>");
  return ctx;
}

/** Raccourci : la plupart des composants ne veulent que la fonction. */
export function useT() {
  return useLang().t;
}
