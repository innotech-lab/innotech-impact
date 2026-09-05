import { useLang } from "../../i18n";
import "./langtoggle.css";

/**
 * Bascule français / anglais.
 *
 * Un sélecteur segmenté plutôt qu'un interrupteur : les deux langues sont
 * visibles en permanence, on lit son choix au lieu de le déduire. Une pastille
 * glisse derrière le libellé actif — le même geste que la pastille de la barre
 * de progression, à l'échelle d'un contrôle.
 *
 * Deux détails qui ne se voient pas mais s'entendent :
 *
 *   — chaque bouton porte `lang`, sinon un lecteur d'écran francophone
 *     prononce « English » à la française, et inversement ;
 *   — le nom accessible est la langue en toutes lettres, pas l'abréviation :
 *     « FR » se lit « eff-erre », « Français » se lit Français.
 */

const OPTIONS = [
  { code: "fr", short: "FR", full: "Français" },
  { code: "en", short: "EN", full: "English" },
];

export default function LangToggle({ className = "" }) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      className={`lang-toggle ${className}`}
      role="group"
      aria-label={t("Changer de langue")}
      data-active={lang}
    >
      {/* La pastille vit hors du flux : elle glisse, les libellés ne bougent pas. */}
      <span className="lang-toggle__pill" aria-hidden="true" />
      {OPTIONS.map(({ code, short, full }) => (
        <button
          key={code}
          type="button"
          lang={code}
          className="lang-toggle__option"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          <span aria-hidden="true">{short}</span>
          <span className="sr-only">{full}</span>
        </button>
      ))}
    </div>
  );
}
