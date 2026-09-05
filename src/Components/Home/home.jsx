import { createElement } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Code2,
  GraduationCap,
  Layers3,
  MoveUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import hero from "../../assets/innotech-lab-hero.webp";
import "./home.css";
import PageMeta from "../PageMeta/PageMeta";
import { useT } from "../../i18n";
const offers = [
  {
    icon: Code2,
    title: "Logiciels qui déplacent le réel",
    text: "Produits web, mobile et outils métiers construits avec vos équipes — de l’idée au déploiement.",
    to: "/services",
    action: "Explorer les solutions",
  },
  {
    icon: GraduationCap,
    title: "STEM pour celles et ceux qui bâtissent demain",
    text: "Des parcours pratiques pour apprendre, expérimenter et transformer une curiosité en capacité.",
    to: "/formation",
    action: "Découvrir la STEM Academy",
  },
];
const signals = [
  "Conception produit",
  "Développement logiciel",
  "Formation STEM",
  "Partenariats d’impact",
];
export default function Home() {
  const t = useT();
  return (
    <>
      <PageMeta
        title="Innotech Impact"
        description="Innotech Impact conçoit des solutions logicielles et développe des expériences d’apprentissage STEM au Burundi."
        path="/"
      />
      <section className="landing-hero">
        <div className="shell landing-hero__grid">
          <div className="landing-hero__copy">
            <p className="eyebrow reveal">{t("Innotech Impact · Burundi")}</p>
            <h1 className="reveal reveal--2">
              {t("La technologie devient utile quand elle circule.")}
            </h1>
            <p className="landing-hero__lede reveal reveal--3">
              {t(
                "Nous créons des solutions logicielles pour les organisations et des expériences STEM pour les personnes qui feront avancer le pays.",
              )}
            </p>
            <div className="landing-hero__actions reveal reveal--3">
              <Link className="button button--lime" to="/devis">
                {t("Démarrer un projet")} <MoveUpRight size={18} />
              </Link>
              <Link className="button button--line" to="/formation">
                {t("Voir les formations")} <ArrowDownRight size={18} />
              </Link>
            </div>
          </div>
          <div className="landing-hero__image">
            <img
              src={hero}
              alt={t(
                "Jeunes innovateurs travaillant dans un laboratoire numérique",
              )}
              width="1672"
              height="941"
              fetchPriority="high"
              decoding="async"
            />
            <span className="hero-orbit hero-orbit--one" />
            <span className="hero-orbit hero-orbit--two" />
            <p>
              {t("Un studio de produits")}
              <br />
              {t("et de transmission.")}
            </p>
          </div>
        </div>
        <ul
          data-reveal="rise"
          data-reveal-stagger
          className="shell signal-strip"
          aria-label={t("Domaines d’intervention")}
        >
          {signals.map((item, i) => (
            <li key={item}>
              <i aria-hidden="true">0{i + 1}</i>
              {t(item)}
            </li>
          ))}
        </ul>
      </section>
      <section className="section">
        <div className="shell">
          <div data-reveal="rise" className="section-head">
            <div>
              <p className="eyebrow">{t("Deux points d’entrée")}</p>
              <h2>
                {t("Venir avec une ambition. Repartir avec de la capacité.")}
              </h2>
            </div>
            <p className="section-copy">
              {t(
                "Notre modèle relie une demande concrète à une compétence durable : nous aidons à construire aujourd’hui et à transmettre ce qui permettra de construire demain.",
              )}
            </p>
          </div>
          <div data-reveal="rise" data-reveal-stagger className="pathways">
            {offers.map(({ icon, title, text, to, action }, index) => (
              <article key={title} className="pathway">
                <div className="pathway__index">0{index + 1}</div>
                {createElement(icon, { size: 33 })}
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
                <Link className="text-link" to={to}>
                  {t(action)}
                  <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark impact-block">
        <div data-reveal="rise" className="shell impact-block__grid">
          <div>
            <p className="eyebrow">{t("Le geste Innotech")}</p>
            <h2>
              {t(
                "Pas une promesse d’innovation. Un chemin pour la rendre praticable.",
              )}
            </h2>
          </div>
          <div
            data-reveal="rise"
            data-reveal-stagger
            className="impact-block__list"
          >
            <p>
              <span>01</span>
              {t("Écouter le terrain avant de dessiner la solution.")}
            </p>
            <p>
              <span>02</span>
              {t(
                "Construire avec des étapes visibles et des décisions partagées.",
              )}
            </p>
            <p>
              <span>03</span>
              {t("Transmettre les méthodes, pas seulement livrer un résultat.")}
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div data-reveal="rise" className="section-head">
            <div>
              <p className="eyebrow">{t("Ce que nous faisons")}</p>
              <h2>{t("Des briques digitales, pensées pour durer.")}</h2>
            </div>
            <Link className="text-link" to="/services">
              {t("Voir toutes nos expertises")} <ArrowRight size={17} />
            </Link>
          </div>
          <div data-reveal="rise" data-reveal-stagger className="feature-grid">
            <article className="feature">
              <span className="feature-icon">
                <Layers3 />
              </span>
              <div>
                <h3>{t("Produits numériques")}</h3>
                <p>
                  {t(
                    "Plateformes, applications et parcours digitaux conçus autour d’un besoin réel.",
                  )}
                </p>
              </div>
            </article>
            <article className="feature">
              <span className="feature-icon">
                <BookOpen />
              </span>
              <div>
                <h3>{t("Learning by building")}</h3>
                <p>
                  {t(
                    "Des formats STEM orientés pratique, prototypes et autonomie.",
                  )}
                </p>
              </div>
            </article>
            <article className="feature">
              <span className="feature-icon">
                <Code2 />
              </span>
              <div>
                <h3>{t("Renforcement d’équipes")}</h3>
                <p>
                  {t(
                    "Ateliers, accompagnement et langage commun pour faire progresser les équipes.",
                  )}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="home-close">
        <div data-reveal="wipe" className="shell home-close__inner">
          <p className="eyebrow">{t("La prochaine étape")}</p>
          <h2>{t("Une idée à rendre concrète ?")}</h2>
          <p>
            {t(
              "Parlons de votre contexte, de ce qu’il faut résoudre et de la bonne première étape.",
            )}
          </p>
          <Link to="/contact" className="button button--lime">
            {t("Écrire à l’équipe")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
