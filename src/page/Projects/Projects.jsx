import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gnosis from "../../assets/Gnosis.webp";
import kithub from "../../assets/kithub.webp";
import comlb from "../../assets/comlb.webp";
import women from "../../assets/Women.webp";
import PageMeta from "../../Components/PageMeta/PageMeta";
import ProjectIndex from "../../Components/ProjectIndex/ProjectIndex";
import { useT } from "../../i18n";
const data = [
  {
    title: "Gnosis Platform",
    kind: "Apprentissage",
    desc: "Une piste de plateforme d’apprentissage pour les jeunes innovateurs.",
    image: gnosis,
  },
  {
    title: "Kithub",
    kind: "Emploi & talents",
    desc: "Une piste de mise en relation entre talents et organisations.",
    image: kithub,
  },
  {
    title: "ComLB",
    kind: "Commerce local",
    desc: "Une piste e-commerce pour rendre les activités locales plus accessibles.",
    image: comlb,
  },
  {
    title: "Women Tech",
    kind: "STEM",
    desc: "Une initiative de formation technologique dédiée aux femmes entrepreneures.",
    image: women,
  },
];
export default function Projects() {
  const [kind, setKind] = useState("Tous");
  const t = useT();
  const kinds = ["Tous", ...new Set(data.map((x) => x.kind))];
  const works = useMemo(
    () => (kind === "Tous" ? data : data.filter((x) => x.kind === kind)),
    [kind],
  );
  return (
    <>
      <PageMeta
        title="Réalisations"
        description="Les initiatives et produits présentés par Innotech Impact. Résultats et collaborations à confirmer avant publication."
        path="/projects"
      />
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow reveal">{t("Réalisations")}</p>
          <h1 className="reveal reveal--2">
            {t("Des pistes de travail pour des enjeux qui comptent.")}
          </h1>
          <p className="reveal reveal--3">
            {t(
              "Voici les initiatives et produits présentés dans le site. Les résultats et collaborations sont à compléter avec les preuves validées avant publication.",
            )}
          </p>
          <div className="page-hero__line" />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div data-reveal="rise" className="section-head">
            <div>
              <p className="eyebrow">{t("Explorer")}</p>
              <h2>
                {t("Des terrains différents, une même attention au contexte.")}
              </h2>
            </div>
          </div>
          <div
            data-reveal="rise"
            className="filterbar"
            role="group"
            aria-label={t("Filtrer les réalisations")}
          >
            {kinds.map((x) => (
              <button
                key={x}
                aria-pressed={x === kind}
                onClick={() => setKind(x)}
              >
                {t(x)}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {works.length}{" "}
            {works.length > 1
              ? t("réalisations affichées.")
              : t("réalisation affichée.")}
          </p>
          <div data-reveal="rise">
            <ProjectIndex items={works} />
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div data-reveal="rise" className="shell section-head">
          <div>
            <p className="eyebrow">{t("Un besoin à résoudre")}</p>
            <h2>{t("Votre projet peut devenir la prochaine étude de cas.")}</h2>
          </div>
          <Link to="/devis" className="button button--lime">
            {t("Démarrer la conversation")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
