import { ArrowRight, BookOpen, Code2, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../PageMeta/PageMeta";
import { PartnersSection } from "../Team/Team";
import { useT } from "../../i18n";
import hero from "../../assets/innotech-lab-hero.webp";
import "./home.css";

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
            <p className="eyebrow reveal">{t("Qui sommes-nous")}</p>
            <h1 className="reveal reveal--2">
              {t("Un studio qui construit et transmet.")}
            </h1>
            <p className="landing-hero__lede reveal reveal--3">
              {t(
                "Innotech Impact est une entreprise technologique burundaise. Nous concevons des logiciels utiles pour les organisations et nous transmettons les compétences qui permettent à davantage de personnes de prendre part au numérique.",
              )}
            </p>
            <div className="landing-hero__actions reveal reveal--3">
              <Link className="button button--lime" to="/about">
                {t("Découvrir notre histoire")} <ArrowRight size={18} />
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
              <p className="eyebrow">{t("Nos services")}</p>
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

      <PartnersSection />
    </>
  );
}
