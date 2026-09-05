import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../../Components/PageMeta/PageMeta";

/**
 * Mentions légales et traitement des données.
 *
 * Le site collecte des données personnelles par trois formulaires (contact,
 * demande de projet, newsletter) et n'avait aucune page pour dire ce qu'il en
 * fait — alors que /contact et /devis promettent déjà que « ces informations
 * servent uniquement à votre demande ». Cette page tient cette promesse par
 * écrit.
 *
 * Elle ne dit que ce que le dépôt permet d'affirmer : les endpoints existants,
 * les champs réellement envoyés, l'adresse de contact. Les points qui demandent
 * une décision de l'équipe — hébergeur, durée de conservation, immatriculation —
 * sont nommés comme à compléter plutôt que remplis au jugé.
 */

const SECTIONS = [
  {
    index: "01",
    title: "Éditeur du site",
    body: (
      <>
        <p>
          Ce site est édité par Innotech Impact, studio de développement
          logiciel et d’apprentissages STEM établi au N° 7, Av. Rweru, Kabondo,
          Mukaza, Bujumbura, Burundi.
        </p>
        <p>
          Contact :{" "}
          <a href="mailto:innotech@kit-hub.com">innotech@kit-hub.com</a>
        </p>
        <p className="notice">
          À compléter par l’équipe avant publication : forme juridique, numéro
          d’immatriculation, adresse postale complète, directeur de la
          publication et coordonnées de l’hébergeur.
        </p>
      </>
    ),
  },
  {
    index: "02",
    title: "Données que vous nous confiez",
    body: (
      <>
        <p>
          Le site ne dépose aucun cookie et n’utilise aucun outil de mesure
          d’audience. Les seules données qui nous parviennent sont celles que
          vous saisissez vous-même dans l’un des trois formulaires.
        </p>
        <ul className="value-list" data-reveal="rise" data-reveal-stagger>
          <li>
            <span>Contact</span>
            <div>
              <h3>Nom, e-mail, sujet, message</h3>
              <p>Transmis à l’équipe pour répondre à votre demande.</p>
            </div>
          </li>
          <li>
            <span>Projet</span>
            <div>
              <h3>Nom, e-mail, type de besoin, contexte</h3>
              <p>
                Utilisés pour cadrer la demande et préparer un premier échange.
              </p>
            </div>
          </li>
          <li>
            <span>Newsletter</span>
            <div>
              <h3>Adresse e-mail</h3>
              <p>
                Utilisée uniquement pour l’envoi des actualités auxquelles vous
                vous inscrivez.
              </p>
            </div>
          </li>
        </ul>
      </>
    ),
  },
  {
    index: "03",
    title: "Ce que nous en faisons",
    body: (
      <>
        <p>
          Ces informations servent exclusivement à traiter votre demande ou à
          vous envoyer les actualités demandées. Elles ne sont ni vendues, ni
          louées, ni transmises à un tiers à des fins commerciales.
        </p>
        <p className="notice">
          À compléter par l’équipe : durée de conservation des demandes,
          hébergeur de la base de données et pays d’hébergement.
        </p>
      </>
    ),
  },
  {
    index: "04",
    title: "Accès, correction, suppression",
    body: (
      <>
        <p>
          Vous pouvez à tout moment demander à consulter les informations que
          vous nous avez transmises, les faire corriger, ou en demander la
          suppression. Une demande par e-mail suffit, sans justification à
          fournir.
        </p>
        <p>
          Écrivez à{" "}
          <a href="mailto:innotech@kit-hub.com">innotech@kit-hub.com</a> en
          indiquant l’adresse utilisée lors de votre envoi.
        </p>
      </>
    ),
  },
  {
    index: "05",
    title: "Propriété du contenu",
    body: (
      <p>
        Les textes, l’identité visuelle et les visuels de ce site appartiennent
        à Innotech Impact. Les noms et logos des projets présentés restent la
        propriété de leurs détenteurs respectifs.
      </p>
    ),
  },
];

export default function Mentions() {
  return (
    <>
      <PageMeta
        title="Mentions légales"
        description="Éditeur du site, données collectées par les formulaires d’Innotech Impact, et comment demander leur correction ou leur suppression."
        path="/mentions"
      />

      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow reveal">Mentions légales</p>
          <h1 className="reveal reveal--2">
            Ce que nous faisons de ce que vous nous écrivez.
          </h1>
          <p className="reveal reveal--3">
            Trois formulaires collectent des données sur ce site. Voici
            lesquelles, à quoi elles servent, et comment en reprendre la main.
          </p>
          <div className="page-hero__line" />
        </div>
      </section>

      <section className="section">
        <div className="shell legal">
          {SECTIONS.map(({ index, title, body }) => (
            <article className="legal__block" data-reveal="rise" key={index}>
              <p className="legal__index">{index}</p>
              <div className="legal__body">
                <h2>{title}</h2>
                {body}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell section-head" data-reveal="rise">
          <div>
            <p className="eyebrow">Une question sur vos données</p>
            <h2>Écrivez-nous, nous répondons à la personne, pas au dossier.</h2>
          </div>
          <Link to="/contact" className="button button--lime">
            Nous écrire <ArrowRight size={18} />
          </Link>
        </div>
        <div className="shell" style={{ marginTop: "2rem" }}>
          <a
            className="text-link"
            href="mailto:innotech@kit-hub.com"
            style={{ color: "var(--lime)" }}
          >
            <Mail size={17} /> innotech@kit-hub.com
          </a>
        </div>
      </section>
    </>
  );
}
