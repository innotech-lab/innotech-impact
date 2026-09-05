import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../../Components/PageMeta/PageMeta";
import { useT } from "../../i18n";
const courses = [
  {
    title: "Web, de l’idée au prototype",
    level: "Fondations",
    text: "HTML, CSS, JavaScript et React à travers des projets à montrer et expliquer.",
    details:
      "Pour débuter une pratique du développement en comprenant les bases, les interfaces et la logique d’un produit.",
  },
  {
    title: "Données qui racontent quelque chose",
    level: "Systèmes",
    text: "Modélisation, SQL et lecture de données pour concevoir des outils plus justes.",
    details:
      "Une porte d’entrée vers les bases de données, la rigueur des modèles et les questions que les données permettent de poser.",
  },
  {
    title: "Réseaux, sécurité, responsabilité",
    level: "Infrastructure",
    text: "Comprendre les connexions, les protocoles et les réflexes de sécurité numérique.",
    details:
      "Pour découvrir l’infrastructure qui rend les produits fiables et les pratiques qui protègent les personnes.",
  },
];
export default function Formation() {
  const [open, setOpen] = useState(null);
  const t = useT();
  return (
    <>
      <PageMeta
        title="STEM Academy"
        description="Des parcours courts et pratiques pour transformer une curiosité technologique en capacité d’action. Dates et modalités à confirmer."
        path="/formation"
      />
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow reveal">{t("Innotech STEM Academy")}</p>
          <h1 className="reveal reveal--2">
            {t("Apprendre en fabriquant ce qui compte pour soi.")}
          </h1>
          <p className="reveal reveal--3">
            {t(
              "Des parcours courts, concrets et progressifs pour transformer une curiosité technologique en capacité d’action.",
            )}
          </p>
          <div className="page-hero__line" />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div data-reveal="rise" className="section-head">
            <div>
              <p className="eyebrow">{t("Parcours à préciser")}</p>
              <h2>{t("Le programme est le début de la conversation.")}</h2>
            </div>
            <p className="section-copy">
              {t(
                "Les dates, prérequis, formats et modalités d’inscription doivent être confirmés avec l’équipe avant publication.",
              )}
            </p>
          </div>
          <div data-reveal="rise" data-reveal-stagger className="academy-grid">
            {courses.map((x, i) => (
              <article className="academy-card" key={x.title}>
                <span>
                  0{i + 1} · {t(x.level)}
                </span>
                <h3>{t(x.title)}</h3>
                <p>{t(x.text)}</p>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`academy-details-${i}`}
                >
                  {open === i ? t("Réduire") : t("Voir le contenu")}
                </button>
                {open === i && (
                  <p
                    id={`academy-details-${i}`}
                    className="academy-card__details"
                  >
                    {t(x.details)}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div data-reveal="rise" className="shell section-head">
          <div>
            <p className="eyebrow">{t("Intéressé·e ?")}</p>
            <h2>{t("Nous préparons les prochains parcours avec vous.")}</h2>
          </div>
          <Link to="/contact" className="button button--lime">
            {t("Manifester son intérêt")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
