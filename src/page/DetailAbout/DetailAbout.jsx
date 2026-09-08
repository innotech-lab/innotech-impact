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
      <section className="section about-history">
        <div className="shell">
          <div data-reveal="rise" className="section-head">
            <div>
              <p className="eyebrow">{t("Historique")}</p>
              <h2>{t("Une histoire née du terrain.")}</h2>
            </div>
            <p className="section-copy">
              {t(
                "Innotech Impact s’est construit autour d’un constat simple : les organisations ont besoin d’outils qui leur ressemblent, et les talents ont besoin d’espaces pour apprendre en pratiquant.",
              )}
            </p>
          </div>
          <div data-reveal="rise" data-reveal-stagger className="history-list">
            <article>
              <span>{t("Le point de départ")}</span>
              <p>{t("Écouter les besoins réels des organisations et des communautés.")}</p>
            </article>
            <article>
              <span>{t("La pratique")}</span>
              <p>{t("Transformer ces besoins en projets numériques compréhensibles et utiles.")}</p>
            </article>
            <article>
              <span>{t("Aujourd’hui")}</span>
              <p>{t("Relier développement logiciel, transmission et impact local dans une même équipe.")}</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div data-reveal="rise" className="shell story-grid">
          <div className="story-statement">
            {t("Notre vision : un numérique comme")}{" "}
            <em>{t("levier d’action")}</em>
            {t(" pour les organisations et les personnes.")}
          </div>
          <div className="story-body">
            <div className="about-pillars">
              <article>
                <span>{t("Vision")}</span>
                <p>{t("Un Burundi où la technologie est comprise, appropriée et mise au service des besoins locaux.")}</p>
              </article>
              <article>
                <span>{t("Mission")}</span>
                <p>{t("Créer des solutions digitales solides et ouvrir des chemins d’apprentissage accessibles.")}</p>
              </article>
            </div>
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
              <p className="value-list__label">{t("Nos valeurs")}</p>
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
