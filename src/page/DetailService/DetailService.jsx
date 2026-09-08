import { createElement } from "react";
import {
  ArrowRight,
  Boxes,
  Code2,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../../Components/PageMeta/PageMeta";
import { useT } from "../../i18n";
const services = [
  {
    title: "Développement de logiciels et applications",
    text: "Des outils numériques conçus autour de vos usages, de vos équipes et de la réalité de votre activité.",
    topics: ["Applications web", "Applications mobiles", "Outils métiers"],
    icon: Code2,
  },
  {
    title: "Création de sites web",
    text: "Des sites clairs, rapides et faciles à faire évoluer pour présenter votre organisation et vos projets.",
    topics: ["Site vitrine", "Plateforme institutionnelle", "Refonte et maintenance"],
    icon: Boxes,
  },
  {
    title: "Formation informatique",
    text: "Des parcours progressifs pour apprendre les fondamentaux, programmer et découvrir les nouveaux usages de l’intelligence artificielle.",
    topics: ["Informatique de base", "Programmation", "Intelligence artificielle"],
    icon: GraduationCap,
  },
];
const process = [
  "Comprendre le terrain",
  "Choisir une première version utile",
  "Construire avec des retours courts",
  "Transmettre et faire évoluer",
];
export default function DetailService() {
  const t = useT();
  return (
    <>
      <PageMeta
        title="Solutions"
        description="Stratégie, design et ingénierie pour transformer une intention claire en une solution réellement adoptée."
        path="/services"
      />
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow reveal">{t("Solutions Innotech")}</p>
          <h1 className="reveal reveal--2">
            {t(
              "Des systèmes qui font avancer les personnes qui les utilisent.",
            )}
          </h1>
          <p className="reveal reveal--3">
            {t(
              "Nous associons stratégie, design et ingénierie pour transformer une intention claire en une solution réellement adoptée.",
            )}
          </p>
          <div className="page-hero__line" />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div data-reveal="rise" className="section-head">
            <div>
              <p className="eyebrow">{t("L’offre")}</p>
              <h2>{t("Une réponse, puis une capacité.")}</h2>
            </div>
            <p className="section-copy">
              {t(
                "Chaque intervention laisse quelque chose de concret : un produit, un outil, une méthode ou de nouvelles compétences.",
              )}
            </p>
          </div>
          <div data-reveal="rise" data-reveal-stagger className="service-map">
            <div className="service-map__title">
              {t(
                "Ce qui devient possible quand la technique sert le contexte.",
              )}
            </div>
            <div>
              {services.map(({ title, text, topics, icon }, i) => (
                <article className="service-map__row" key={title}>
                  <span>0{i + 1}</span>
                  <h3>{t(title)}</h3>
                  {createElement(icon, { size: 22 })}
                  <p>{t(text)}</p>
                  <ul className="service-topics">
                    {topics.map((topic) => (
                      <li key={topic}>{t(topic)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="shell">
          <div data-reveal="rise" className="section-head">
            <div>
              <p className="eyebrow">{t("Notre manière de faire")}</p>
              <h2>
                {t("Un mouvement lisible, du premier échange à l’autonomie.")}
              </h2>
            </div>
          </div>
          <div data-reveal="rise" data-reveal-stagger className="process">
            {process.map((title, i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{t(title)}</h3>
                <p>
                  {t(
                    "Une étape tangible, partagée et utile pour prendre la décision suivante.",
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark service-cta">
        <div data-reveal="wipe" className="shell service-cta__inner">
          <div>
            <p className="eyebrow">{t("Parlons de votre besoin")}</p>
            <h2>
              {t("Une première conversation pour choisir la bonne direction.")}
            </h2>
          </div>
          <div className="service-cta__action">
            <p>
              {t(
                "Décrivez votre contexte, les personnes concernées et ce que vous souhaitez rendre possible.",
              )}
            </p>
            <Link className="button button--lime" to="/devis">
              {t("Décrire mon besoin")} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
