import { ArrowRight } from "lucide-react";
import { TeamSection, PartnersSection } from "../../Components/Team/Team";
import { Link } from "react-router-dom";
import PageMeta from "../../Components/PageMeta/PageMeta";
import { useT } from "../../i18n";
const values = [
  [
    "01",
    "Partir du réel",
    "Nous faisons de la place aux contraintes, usages et aspirations avant de proposer une direction.",
  ],
  [
    "02",
    "Construire avec",
    "Une bonne solution se fabrique avec les personnes qui vont la porter, pas à distance.",
  ],
  [
    "03",
    "Laisser une trace utile",
    "Un projet doit transmettre une méthode, une compétence ou un accès qui reste après sa livraison.",
  ],
];
export default function DetailAbout() {
  const t = useT();
  return (
    <>
      <PageMeta
        title="Notre impact"
        description="Innotech Impact relie les besoins numériques des organisations aux possibilités d’apprentissage des jeunes innovateurs."
        path="/about"
      />
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow reveal">{t("Pourquoi Innotech")}</p>
          <h1 className="reveal reveal--2">
            {t(
              "Un impact qui se voit dans ce que les gens peuvent faire ensuite.",
            )}
          </h1>
          <p className="reveal reveal--3">
            {t(
              "Innotech Impact relie les besoins numériques des organisations aux possibilités d’apprentissage des jeunes innovateurs.",
            )}
          </p>
          <div className="page-hero__line" />
        </div>
      </section>
      <section className="section">
        <div data-reveal="rise" className="shell story-grid">
          <div className="story-statement">
            {t("Nous voulons que le numérique soit un")}{" "}
            <em>{t("levier d’action")}</em>
            {t(", pas une promesse distante.")}
          </div>
          <div className="story-body">
            <p>
              {t(
                "Notre travail se situe à l’endroit où un besoin d’organisation rencontre une envie d’apprendre. Nous aidons les équipes à rendre leur activité plus simple avec la technologie et nous créons des espaces où les talents peuvent comprendre, expérimenter et construire.",
              )}
            </p>
            <p>
              {t(
                "Cette double pratique n’est pas une juxtaposition : les exigences de la production nourrissent les apprentissages, et les apprentissages font grandir l’écosystème qui construira les prochaines solutions.",
              )}
            </p>
            <div data-reveal="rise" data-reveal-stagger className="value-list">
              {values.map(([n, title, desc]) => (
                <article key={n}>
                  <span>{n}</span>
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(desc)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div data-reveal="rise" className="shell story-grid">
          <div>
            <p className="eyebrow">{t("Travailler ensemble")}</p>
            <h2 className="story-statement">
              {t("Une conversation concrète vaut mieux qu’un grand discours.")}
            </h2>
          </div>
          <div className="story-body">
            <p>
              {t(
                "Vous avez un défi à résoudre, une équipe à faire grandir, ou une initiative STEM à construire ? Échangeons sur le bon point de départ.",
              )}
            </p>
            <Link to="/contact" className="button button--lime">
              {t("Écrire à l’équipe")} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <TeamSection />
      <PartnersSection />
    </>
  );
}
