import { useEffect, useId, useState } from "react";
import { Plus } from "lucide-react";
import { useT } from "../../i18n";

/**
 * Questions fréquentes.
 *
 * C'est la section de réassurance qui manquait au parcours de conversion : le
 * visiteur arrive au formulaire sans savoir ce qui se passe après l'envoi, ni si
 * son cas relève d'Innotech. Un accordéon posé juste au-dessus du formulaire
 * lève ces objections au moment où elles se posent.
 *
 * Chaque réponse est tirée de ce que le site affirme déjà. Aucune promesse
 * nouvelle : ni délai de réponse, ni tarif, ni calendrier — ces trois éléments
 * demandent une décision de l'équipe et sont signalés comme tels dans le
 * rapport plutôt qu'inventés ici.
 *
 * Le JSON-LD FAQPage est injecté par le même composant : Google lit les
 * questions et peut les afficher directement dans ses résultats.
 */

const QUESTIONS = [
  {
    q: "Que se passe-t-il après l’envoi du formulaire ?",
    a: "Votre message arrive directement à l’équipe. Nous commençons par lire le contexte que vous décrivez, puis nous revenons vers vous pour un premier échange — l’objectif est de comprendre le problème avant de proposer quoi que ce soit. Si le formulaire échoue, un message vous le dit et vous donne notre adresse directe.",
  },
  {
    q: "Faut-il déjà savoir ce que l’on veut construire ?",
    a: "Non. Le formulaire de projet demande volontairement de décrire le besoin plutôt que la solution attendue. Une idée à clarifier est un point de départ valable ; c’est même le cas le plus fréquent.",
  },
  {
    q: "Sur quels types de projets travaillez-vous ?",
    a: "Des produits web et mobiles, des outils métiers et des parcours numériques, construits avec vos équipes de l’idée au déploiement. La page Solutions détaille la manière dont un projet se déroule, du premier échange à l’autonomie.",
  },
  {
    q: "Les formations STEM ont-elles des dates ?",
    a: "Pas encore de calendrier publié. Les trois parcours présentés — web, données, réseaux et sécurité — existent dans leur contenu, mais les dates, formats, prérequis et modalités d’inscription se décident avec les personnes intéressées. Manifester son intérêt, c’est participer à ce cadrage.",
  },
  {
    q: "Travaillez-vous en dehors du Burundi ?",
    a: "L’équipe est établie à Bujumbura et son terrain est le Burundi. Écrivez-nous en décrivant votre contexte : la question de la distance se traite au cas par cas, pas par principe.",
  },
  {
    q: "Que devient ce que je vous écris ?",
    a: "Uniquement le traitement de votre demande. Le site ne dépose aucun cookie et n’utilise aucun outil de mesure d’audience. Les mentions légales détaillent les champs collectés et la manière d’en demander la correction ou la suppression.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(null);
  const t = useT();
  const id = useId();

  // Le balisage structuré permet à Google d'afficher les questions directement
  // dans ses résultats. Il est retiré au démontage : la FAQ ne vaut que pour
  // les routes qui la portent.
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: QUESTIONS.map(({ q, a }) => ({
        "@type": "Question",
        name: t(q),
        acceptedAnswer: { "@type": "Answer", text: t(a) },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [t]);

  return (
    <section className="section">
      <div className="shell">
        <div className="section-head" data-reveal="rise">
          <div>
            <p className="eyebrow">{t("Avant d’écrire")}</p>
            <h2>{t("Les questions qui reviennent.")}</h2>
          </div>
          <p className="section-copy">
            {t(
              "Si la vôtre n’y est pas, elle a toute sa place dans le formulaire.",
            )}
          </p>
        </div>

        <div className="faq" data-reveal="rise" data-reveal-stagger>
          {QUESTIONS.map(({ q, a }, i) => {
            const expanded = open === i;
            return (
              <article
                className={`faq__item ${expanded ? "is-open" : ""}`}
                key={q}
              >
                <h3>
                  <button
                    type="button"
                    className="faq__trigger"
                    aria-expanded={expanded}
                    aria-controls={`${id}-answer-${i}`}
                    onClick={() => setOpen(expanded ? null : i)}
                  >
                    <span>{t(q)}</span>
                    <Plus size={18} aria-hidden="true" />
                  </button>
                </h3>
                {expanded && (
                  <div className="faq__answer" id={`${id}-answer-${i}`}>
                    <p>{t(a)}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
