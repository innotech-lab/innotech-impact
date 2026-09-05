import { useT } from "../../i18n";
import "./skeleton.css";

/**
 * Les états d'attente.
 *
 * Le site a une signature de mouvement : un éclat qui traverse une surface —
 * sur les boutons, sur les portraits de l'équipe. Un chargement, c'est ce même
 * signal, mais qui repasse. La page qui attend est la page qui cherche encore
 * son signal, pas un objet étranger posé dessus.
 *
 * Les squelettes reprennent la forme de ce qu'ils remplacent : une ligne de
 * titre a la hauteur d'un titre, une carte a le rapport d'une carte. Un bloc gris
 * générique fait sauter la page au moment où le vrai contenu arrive.
 */

/** Un bloc en attente. `w` et `h` acceptent n'importe quelle longueur CSS. */
export function Skeleton({ w = "100%", h = "1rem", className = "" }) {
  return (
    <span
      className={`skeleton ${className}`}
      style={{ width: w, height: h }}
      aria-hidden="true"
    />
  );
}

/**
 * Le repli d'une route en cours de chargement.
 *
 * Reprend la charpente commune aux huit pages : surtitre, grand titre sur trois
 * lignes, filet. La page ne se réorganise pas quand le vrai contenu arrive —
 * elle se remplit.
 */
export function RouteSkeleton() {
  const t = useT();
  return (
    <div className="route-fallback" role="status" aria-busy="true">
      <span className="sr-only">{t("Chargement de la page…")}</span>
      <section className="page-hero">
        <div className="shell">
          <Skeleton w="9rem" h="0.7rem" className="skeleton--eyebrow" />
          <div className="skeleton-title">
            <Skeleton w="78%" h="clamp(2.6rem, 5.4vw, 4.6rem)" />
            <Skeleton w="62%" h="clamp(2.6rem, 5.4vw, 4.6rem)" />
          </div>
          <Skeleton w="min(46ch, 90%)" h="0.9rem" />
          <Skeleton w="min(38ch, 74%)" h="0.9rem" className="skeleton--tight" />
          <div className="skeleton-rule" />
        </div>
      </section>
    </div>
  );
}

/** Les cartes de l'équipe pendant que la base répond. */
export function MemberSkeleton({ count = 5 }) {
  const t = useT();
  return (
    <div className="marquee marquee--static" role="status" aria-busy="true">
      <span className="sr-only">{t("Chargement de l’équipe…")}</span>
      <div className="marquee__track">
        <div className="marquee__group">
          {Array.from({ length: count }, (_, i) => (
            <div className="member skeleton-member" key={i}>
              <Skeleton w="100%" h="100%" className="skeleton--flat" />
              <div className="member__plate">
                <Skeleton w="62%" h="1rem" />
                <Skeleton w="42%" h="0.62rem" className="skeleton--tight" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Les logos partenaires pendant que la base répond. */
export function PartnerSkeleton({ count = 6 }) {
  const t = useT();
  return (
    <div className="marquee marquee--static" role="status" aria-busy="true">
      <span className="sr-only">{t("Chargement des partenaires…")}</span>
      <div className="marquee__track">
        <div className="marquee__group">
          {Array.from({ length: count }, (_, i) => (
            <div className="partner skeleton-partner" key={i}>
              <Skeleton w="60%" h="0.85rem" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Le témoin d'envoi d'un formulaire, dans le bouton. */
export function Spinner() {
  return <span className="spinner" aria-hidden="true" />;
}
