import { useEffect } from "react";
import { useT } from "../../i18n";

/**
 * Pose le titre, la description et les balises de partage de la route courante.
 *
 * Le site est rendu côté client : sans ce composant, les huit routes partagent
 * le titre et la description uniques d'index.html, et un lien partagé sur
 * WhatsApp ou LinkedIn s'affiche sans intitulé propre. Écrit en 30 lignes plutôt
 * qu'avec une dépendance : le projet s'interdit d'en ajouter.
 */

const SUFFIX = "Innotech Impact";

/** Crée la balise si elle manque, la met à jour sinon. */
function setMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attrs.rel ? "link" : "meta");
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
}

export default function PageMeta({ title, description, path }) {
  const t = useT();

  useEffect(() => {
    // Titre et description passent par `t` : un lien partagé depuis la version
    // anglaise doit s'afficher en anglais dans l'aperçu.
    const translated = t(title);
    const fullTitle =
      translated === SUFFIX ? translated : `${translated} — ${SUFFIX}`;
    document.title = fullTitle;

    setMeta('meta[name="description"]', {
      name: "description",
      content: t(description),
    });
    setMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: t(description),
    });
    setMeta('meta[property="og:url"]', {
      property: "og:url",
      content: new URL(path, location.origin).href,
    });
    setMeta('link[rel="canonical"]', {
      rel: "canonical",
      href: new URL(path, location.origin).href,
    });
  }, [title, description, path, t]);

  return null;
}
