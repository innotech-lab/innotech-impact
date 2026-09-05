import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../../Components/PageMeta/PageMeta";
import { useT } from "../../i18n";

/**
 * Route de repli. Avant, une URL inconnue affichait l'en-tête, un <main> vide et
 * le pied de page : aucun message, aucune sortie. Les trois liens reprennent les
 * deux offres que le site doit garder accessibles à tout moment.
 */
export default function NotFound() {
  const t = useT();
  return (
    <>
      <PageMeta
        title="Page introuvable"
        description="Cette page n’existe pas ou a été déplacée. Retrouvez les solutions logicielles et la STEM Academy d’Innotech Impact."
        path="/404"
      />

      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow reveal">{t("Erreur 404")}</p>
          <h1 className="reveal reveal--2">
            {t("Cette page n’existe pas, ou plus.")}
          </h1>
          <p className="reveal reveal--3">
            {t(
              "Le lien est peut-être incomplet, ou la page a changé d’adresse. Voici les trois chemins les plus courts vers ce que vous cherchiez.",
            )}
          </p>
          <div className="page-hero__line" />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div data-reveal="rise" data-reveal-stagger className="feature-grid">
            <article className="feature">
              <span className="eyebrow">{t("Accueil")}</span>
              <div>
                <h3>{t("Revenir au point de départ")}</h3>
                <p>
                  {t(
                    "Les deux façons de travailler avec Innotech, en un écran.",
                  )}
                </p>
                <Link className="text-link" to="/">
                  {t("Aller à l’accueil")} <ArrowRight size={17} />
                </Link>
              </div>
            </article>
            <article className="feature">
              <span className="eyebrow">{t("Solutions")}</span>
              <div>
                <h3>{t("Un projet logiciel")}</h3>
                <p>
                  {t(
                    "Produits, plateformes et outils métiers construits avec vos équipes.",
                  )}
                </p>
                <Link className="text-link" to="/services">
                  {t("Voir les solutions")} <ArrowRight size={17} />
                </Link>
              </div>
            </article>
            <article className="feature">
              <span className="eyebrow">{t("STEM Academy")}</span>
              <div>
                <h3>{t("Une envie d’apprendre")}</h3>
                <p>
                  {t(
                    "Des parcours courts et pratiques pour transformer la curiosité en capacité.",
                  )}
                </p>
                <Link className="text-link" to="/formation">
                  {t("Voir les formations")} <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
