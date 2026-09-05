import { useEffect, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { apiBase } from "../../lib/api";
import { useT } from "../../i18n";
import { MemberSkeleton, PartnerSkeleton } from "../Skeleton/Skeleton";
import { useDelayed } from "../Skeleton/useDelayed";
import "./team.css";

/**
 * L'équipe et les organisations partenaires.
 *
 * Les deux sections lisent la base par `/api/team/` et `/api/partners/`, donc se
 * gèrent depuis l'admin Django (`/admin/`) : ajouter une personne, changer une
 * photo ou retirer un partenaire ne demande aucune modification de code.
 *
 * Rien n'est inventé en attendant : tant qu'une ressource est vide, sa section
 * ne s'affiche pas du tout plutôt que de montrer des cartes fantômes.
 *
 * Le défilement continu remplace la grille à filets : une grille range des
 * cellules, un ruban fait circuler des personnes. Chaque carte est un objet
 * autonome — sa propre bordure, son propre survol — au lieu d'une case dans un
 * tableau partagé.
 */

function useCollection(path) {
  const [items, setItems] = useState(null); // null = en cours, [] = vide

  useEffect(() => {
    let alive = true;
    fetch(`${apiBase}/api/${path}/`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (!alive) return;
        // DRF renvoie soit un tableau, soit un objet paginé.
        setItems(Array.isArray(data) ? data : (data.results ?? []));
      })
      .catch(() => alive && setItems([]));
    return () => {
      alive = false;
    };
  }, [path]);

  return items;
}

/** Initiales, pour tenir la place d'une photo qui n'a pas encore été versée. */
function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Le ruban.
 *
 * Deux copies de la liste défilent côte à côte ; la piste recule exactement
 * d'une copie, donc la boucle ne montre aucune couture. La seconde copie est
 * retirée de l'arbre d'accessibilité : elle est là pour l'œil, pas pour être
 * annoncée deux fois.
 *
 * En dessous de `minToScroll` cartes, le ruban ne remplirait pas la largeur et
 * tournerait dans le vide : il redevient une simple rangée. Le contenu vient de
 * l'admin, ce cas arrivera.
 *
 * WCAG 2.2.2 demande un moyen d'arrêter tout mouvement automatique qui dure
 * plus de cinq secondes — d'où le bouton, en plus de la pause au survol et au
 * focus clavier.
 */
function Marquee({
  items,
  render,
  keyOf,
  duration,
  reverse,
  label,
  minToScroll = 4,
}) {
  const t = useT();
  const [paused, setPaused] = useState(false);
  const scrolls = items.length >= minToScroll;

  const group = (hidden) => (
    <ul className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={keyOf(item)}>{render(item)}</li>
      ))}
    </ul>
  );

  if (!scrolls) {
    return (
      <div className="marquee marquee--static">
        <div className="marquee__track">{group(false)}</div>
      </div>
    );
  }

  return (
    <>
      <div
        className="marquee"
        data-paused={paused || undefined}
        data-reverse={reverse || undefined}
        style={{ "--marquee-duration": duration }}
      >
        <div className="marquee__track">
          {group(false)}
          {group(true)}
        </div>
      </div>
      <div className="shell marquee__controls">
        <button
          type="button"
          className="marquee__pause"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? (
            <Play size={14} aria-hidden="true" />
          ) : (
            <Pause size={14} aria-hidden="true" />
          )}
          {paused ? t("Reprendre le défilement") : t("Suspendre le défilement")}
          <span className="sr-only"> — {label}</span>
        </button>
      </div>
    </>
  );
}

function MemberCard({ m }) {
  const t = useT();
  return (
    <article className="member">
      <div className={`member__portrait ${m.image ? "" : "is-empty"}`}>
        {m.image ? (
          <img
            src={m.image}
            alt=""
            loading="lazy"
            decoding="async"
            data-fade
            onLoad={(e) => e.currentTarget.setAttribute("data-loaded", "")}
          />
        ) : (
          <span className="member__initials" aria-hidden="true">
            {initials(m.name)}
          </span>
        )}
      </div>

      {/* La légende est posée sur le portrait, pas rangée dessous : la carte
          reste un objet unique. Le nom et le rôle restent toujours lisibles ;
          seuls la bio et le lien montent au survol. */}
      <div className="member__plate">
        <h3>{m.name}</h3>
        <p className="member__role">{m.role}</p>
        <div className="member__more">
          {m.bio && <p className="member__bio">{m.bio}</p>}
          {m.linkedin && (
            <a
              className="member__link"
              href={m.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">LinkedIn</span>
              <ArrowUpRight size={13} aria-hidden="true" />
              <span className="sr-only">
                {t("Profil LinkedIn de")} {m.name}
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function TeamSection() {
  const members = useCollection("team");
  const t = useT();
  // `null` = la requête est en cours, `[]` = la base est vide. Distinguer les
  // deux évite de promettre une équipe qui n'arrivera jamais.
  const waiting = useDelayed(members === null);

  if (members !== null && !members.length) return null;

  return (
    <section className="section team-section">
      <div className="shell">
        <div className="section-head" data-reveal="rise">
          <div>
            <p className="eyebrow">{t("Celles et ceux qui construisent")}</p>
            <h2>{t("Une équipe, des rôles clairs.")}</h2>
          </div>
          <p className="section-copy">
            {t("Chaque poste a un nom. C’est la personne à qui vous parlerez.")}
          </p>
        </div>
      </div>

      {members === null ? (
        waiting ? (
          <MemberSkeleton />
        ) : null
      ) : (
        <Marquee
          items={members}
          keyOf={(m) => m.id ?? m.name}
          render={(m) => <MemberCard m={m} />}
          duration="64s"
          label={t("Une équipe, des rôles clairs.")}
        />
      )}
    </section>
  );
}

export function PartnersSection() {
  const partners = useCollection("partners");
  const t = useT();
  const waiting = useDelayed(partners === null);

  if (partners !== null && !partners.length) return null;

  return (
    <section className="section section--dark partners-section">
      <div className="shell">
        <div className="section-head" data-reveal="rise">
          <div>
            <p className="eyebrow">{t("Ils nous ont fait confiance")}</p>
            <h2>{t("Des organisations avec qui nous avons travaillé.")}</h2>
          </div>
        </div>
      </div>

      {/* Sens inverse de celui de l'équipe : les deux rubans se croisent au
          lieu de glisser ensemble, et la page cesse de dériver d'un seul côté. */}
      {partners === null ? (
        waiting ? (
          <PartnerSkeleton />
        ) : null
      ) : (
        <Marquee
          items={partners}
          keyOf={(p) => p.id ?? p.name}
          duration="46s"
          reverse
          minToScroll={5}
          label={t("Des organisations avec qui nous avons travaillé.")}
          render={(p) => (
            <div className="partner">
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  data-fade
                  onLoad={(e) =>
                    e.currentTarget.setAttribute("data-loaded", "")
                  }
                />
              ) : (
                <span>{p.name}</span>
              )}
            </div>
          )}
        />
      )}
    </section>
  );
}
