import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "../../i18n";
import "./projectindex.css";

/**
 * L'index des réalisations.
 *
 * Une grille de vignettes range des objets ; un index les met en ligne et laisse
 * l'aperçu venir au curseur. Chaque ligne porte son numéro, son titre, sa
 * catégorie et sa description — tout est lisible sans survoler quoi que ce soit.
 * L'image est un supplément, jamais le seul porteur d'information.
 *
 * Trois choses que le motif d'origine ne gérait pas :
 *
 *   — Le suivi se fait en coordonnées de fenêtre sur un élément `fixed`, sans
 *     corriger par la position du conteneur. Corriger l'offset d'un élément
 *     `fixed` le fait dériver dès qu'on défile.
 *   — La boucle d'animation ne tourne que pendant le survol, et la position est
 *     écrite directement dans le DOM. Passer par un état React relancerait un
 *     rendu à chaque pixel parcouru.
 *   — Sans souris, il n'y a pas de survol : au doigt, la vignette est posée dans
 *     la ligne. On ne perd pas l'image parce qu'on n'a pas de curseur.
 */

/** Interpolation : la vignette rattrape le curseur au lieu d'y être collée. */
const lerp = (from, to, f) => from + (to - from) * f;

export default function ProjectIndex({ items }) {
  const t = useT();
  const [active, setActive] = useState(null);

  const previewRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const shown = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  // Le mouvement réduit supprime la poursuite : la vignette se pose au curseur
  // sans traîne. Elle reste utile, elle cesse d'être un mouvement continu.
  const [smooth, setSmooth] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSmooth(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
  }, []);

  // La boucle n'existe que pendant le survol, et n'écrit que dans le style du
  // nœud : aucun rendu React n'est déclenché par le déplacement du curseur.
  const start = useCallback(() => {
    if (frame.current) return;
    const tick = () => {
      const f = smooth ? 0.16 : 1;
      shown.current.x = lerp(shown.current.x, pointer.current.x, f);
      shown.current.y = lerp(shown.current.y, pointer.current.y, f);
      const el = previewRef.current;
      if (el) {
        el.style.transform = `translate3d(${shown.current.x}px, ${shown.current.y}px, 0)`;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [smooth]);

  useEffect(() => stop, [stop]);

  /*
    Coordonnées de fenêtre, pour un élément `fixed` : justes au défilement comme
    au redimensionnement, sans rien recalculer.

    La vignette bascule à gauche du curseur quand elle ne tient plus à droite,
    et reste bornée verticalement. Sans cela elle sort de l'écran dès qu'on
    survole près d'un bord — et un élément qui dépasse peut provoquer un
    défilement horizontal sur la page entière.
  */
  const track = (e) => {
    const el = previewRef.current;
    const w = el?.offsetWidth ?? 304;
    const h = el?.offsetHeight ?? 190;
    const m = 12;

    const right = e.clientX + 22;
    const x = right + w + m > window.innerWidth ? e.clientX - w - 22 : right;
    const y = Math.min(
      Math.max(e.clientY - h * 0.62, m),
      window.innerHeight - h - m,
    );

    pointer.current = { x: Math.max(m, x), y };
  };

  const enter = (i) => (e) => {
    track(e);
    // Au premier survol la vignette apparaît là où est le curseur, sans
    // traverser l'écran depuis son ancienne position.
    if (active === null) shown.current = { ...pointer.current };
    setActive(i);
    start();
  };

  const leave = () => {
    setActive(null);
    stop();
  };

  return (
    <div className="index" onMouseLeave={leave}>
      {/* Un seul nœud image, dont la source change : quatre images empilées et
          floutées en permanence coûtent quatre décodages pour un seul visible. */}
      <div
        ref={previewRef}
        className="index__preview"
        data-visible={active !== null || undefined}
        aria-hidden="true"
      >
        {active !== null && (
          <img src={items[active].image} alt="" decoding="async" />
        )}
      </div>

      <ol className="index__list">
        {items.map((item, i) => (
          <li
            key={item.title}
            className="index__row"
            data-dim={active !== null && active !== i ? "" : undefined}
            onMouseEnter={enter(i)}
            onMouseMove={track}
          >
            <span className="index__n" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Sans souris, l'aperçu ne peut pas suivre un curseur : la vignette
                se pose dans la ligne. Masquée là où le survol existe. */}
            <img
              className="index__thumb"
              src={item.image}
              alt=""
              loading="lazy"
              decoding="async"
            />

            <div className="index__body">
              <h3>
                <span>{item.title}</span>
              </h3>
              <p>{t(item.desc)}</p>
            </div>

            <span className="index__kind">{t(item.kind)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
