import PageMeta from "../../Components/PageMeta/PageMeta";
import Blog8 from "../../Components/Blog/Blog8";
import CircularTestimonials from "../../Components/Blog/CircularTestimonials";
import heroImage from "../../assets/innotech-lab-hero.webp";
import gnosisImage from "../../assets/Gnosis.webp";
import womenImage from "../../assets/Women.webp";
import kithubImage from "../../assets/kithub.webp";
import { useT } from "../../i18n";

const posts = [
  {
    id: "post-contexte",
    title: "Un logiciel utile commence par le contexte",
    summary:
      "Avant les écrans et les fonctionnalités, il y a les personnes, les contraintes et la question à résoudre. Voici notre manière de commencer un projet numérique.",
    label: "Méthode",
    author: "L’équipe Innotech",
    published: "Post récent",
    image: heroImage,
    tags: ["Produit numérique", "Terrain"],
  },
  {
    id: "post-apprendre",
    title: "Apprendre en construisant : pourquoi la pratique compte",
    summary:
      "Un parcours de formation devient plus concret quand chaque notion mène vers une expérience, un prototype ou une question nouvelle.",
    label: "Formation",
    author: "L’équipe Innotech",
    published: "À découvrir",
    image: gnosisImage,
    tags: ["STEM", "Apprentissage"],
  },
  {
    id: "post-ia",
    title: "Parler d’intelligence artificielle avec méthode",
    summary:
      "Découvrir l’IA, c’est aussi apprendre à vérifier une réponse, protéger ses informations et reconnaître les limites d’un outil.",
    label: "Usages responsables",
    author: "L’équipe Innotech",
    published: "À découvrir",
    image: womenImage,
    tags: ["Intelligence artificielle", "Numérique"],
  },
  {
    id: "post-equipes",
    title: "Faire grandir un projet avec les équipes qui le porteront",
    summary:
      "Un outil s’installe mieux quand les personnes concernées participent aux choix, comprennent les étapes et peuvent continuer à le faire évoluer.",
    label: "Collaboration",
    author: "L’équipe Innotech",
    published: "À découvrir",
    image: kithubImage,
    tags: ["Équipes", "Conception"],
  },
];

export default function Blog() {
  const t = useT();
  const recentPosts = posts.slice(0, 3).map((post) => ({
    quote: t(post.summary),
    name: t(post.title),
    designation: t(post.label) + " · " + t(post.published),
    src: post.image,
  }));

  return (
    <>
      <PageMeta
        title="Blog"
        description="Les idées d’Innotech Impact sur les produits numériques, la formation et les usages responsables de la technologie."
        path="/blog"
      />
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow reveal">{t("Le journal Innotech")}</p>
          <h1 className="reveal reveal--2">
            {t("Construire, transmettre, regarder ce qui vient.")}
          </h1>
          <p className="reveal reveal--3">
            {t(
              "Des articles courts pour partager notre manière de travailler et ouvrir des conversations autour du numérique.",
            )}
          </p>
          <div className="page-hero__line" />
        </div>
      </section>
      <section className="section section--dark recent-post">
        <div className="shell">
          <div className="section-head recent-post__head" data-reveal="rise">
            <div>
              <p className="eyebrow">{t("Post récent")}</p>
              <h2>{t("Une idée à découvrir, une conversation à ouvrir.")}</h2>
            </div>
            <p className="section-copy">
              {t(
                "Fais défiler les publications récentes et découvre les sujets qui nourrissent notre manière de construire.",
              )}
            </p>
          </div>
          <div data-reveal="rise">
            <CircularTestimonials
              testimonials={recentPosts}
              autoplay
              colors={{
                name: "var(--paper)",
                designation: "var(--lime)",
                testimony: "#b9c4bf",
                arrowBackground: "var(--lime)",
                arrowForeground: "var(--night)",
                arrowHoverBackground: "var(--paper)",
              }}
            />
          </div>
        </div>
      </section>
      <Blog8
        eyebrow="Autres articles"
        heading="Lire la suite"
        description="Des réflexions courtes sur les produits numériques, la transmission et les usages responsables de la technologie."
        posts={posts.slice(1)}
      />
    </>
  );
}
