import { useCallback, useEffect, useMemo, useState } from "react";
import { LangContext, STORAGE_KEY, initialLang } from "./index";

/**
 * Le fournisseur de langue.
 *
 * Le dictionnaire anglais pèse une dizaine de kilo-octets une fois compressé —
 * de la prose, pas du code. Le livrer dans le paquet d'entrée le ferait
 * télécharger par tous les visiteurs francophones, dont la plupart ne
 * basculeront jamais. Il est donc chargé à la demande, au premier passage en
 * anglais, et gardé ensuite.
 *
 * Pendant ce chargement — un aller-retour, quelques dizaines de millisecondes —
 * `t` renvoie le français. C'est exactement le repli prévu pour une traduction
 * manquante : on ne voit jamais ni clé nue ni page vide.
 *
 * Seul export de ce fichier, et c'est un composant : c'est ce que demande le
 * rafraîchissement à chaud. Les hooks vivent dans index.js.
 */
export default function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const [dict, setDict] = useState(null);

  useEffect(() => {
    // `lang` sur <html> n'est pas décoratif : il décide de la voix et de la
    // prononciation des lecteurs d'écran, et de la césure du navigateur.
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Navigation privée, stockage bloqué : le choix vaut pour la session.
    }
  }, [lang]);

  useEffect(() => {
    if (lang !== "en" || dict) return;
    let alive = true;
    import("./en").then((m) => alive && setDict(m.en));
    return () => {
      alive = false;
    };
  }, [lang, dict]);

  const t = useCallback(
    (fr) => {
      if (lang === "fr" || !dict) return fr;
      const hit = dict[fr];
      if (hit === undefined && import.meta.env.DEV) {
        console.warn("[i18n] traduction manquante :", JSON.stringify(fr));
      }
      return hit ?? fr;
    },
    [lang, dict],
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      toggle: () => setLang((l) => (l === "fr" ? "en" : "fr")),
    }),
    [lang, t],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
