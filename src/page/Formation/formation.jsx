import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../../Components/PageMeta/PageMeta";
import { useT } from "../../i18n";
import heroImage from "../../assets/innotech-lab-hero.webp";
import gnosisImage from "../../assets/Gnosis.webp";
import kithubImage from "../../assets/kithub.webp";
import comlbImage from "../../assets/comlb.webp";
import womenImage from "../../assets/Women.webp";
const courses = [
  {
    title: "Informatique de base",
    level: "Fondations",
    text: "Prendre en main un ordinateur, les outils du quotidien, Internet et les bons réflexes numériques.",
    details:
      "Un parcours d’entrée pour gagner en autonomie avant d’aborder les outils de création numérique.",
    image: heroImage,
  },
  {
    title: "Programmation",
    level: "Création",
    text: "Comprendre la logique, écrire ses premiers programmes et apprendre à résoudre un problème par étapes.",
    details:
      "Les notions sont abordées par la pratique : exercices courts, projets guidés et explications accessibles.",
    image: gnosisImage,
  },
  {
    title: "Développement web",
    level: "Web",
    text: "HTML, CSS, JavaScript et React à travers des interfaces à montrer et à expliquer.",
    details:
      "Un chemin pour passer d’une idée à un prototype web en comprenant les bases du produit et de l’interface.",
    image: kithubImage,
  },
  {
    title: "Données & outils numériques",
    level: "Systèmes",
    text: "Découvrir les données, les organiser et utiliser les outils numériques pour mieux décider.",
    details:
      "Une porte d’entrée vers la rigueur des modèles, les tableaux de bord et les questions que les données permettent de poser.",
    image: comlbImage,
  },
  {
    title: "Intelligence artificielle",
    level: "Nouveaux usages",
    text: "Comprendre les possibilités et les limites de l’IA, puis l’utiliser avec méthode et responsabilité.",
    details:
      "Des exemples concrets pour apprendre à formuler une demande, vérifier une réponse et protéger ses informations.",
    image: womenImage,
  },
  {
    title: "Réseaux & cybersécurité",
    level: "Infrastructure",
    text: "Comprendre les connexions, les protocoles et les réflexes qui rendent les usages numériques plus sûrs.",
    details:
      "Une introduction à l’infrastructure et aux pratiques de sécurité qui protègent les personnes et les organisations.",
    image: heroImage,
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
                <div className="academy-card__image">
                  <img src={x.image} alt="" loading="lazy" decoding="async" />
                </div>
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
