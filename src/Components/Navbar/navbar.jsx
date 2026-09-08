import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import LangToggle from "../LangToggle/LangToggle";
import { useT } from "../../i18n";
import "./navbar.css";

const links = [
  ["/", "Accueil"],
  ["/about", "À propos"],
  ["/services", "Services"],
  ["/projects", "Projets"],
  ["/formation", "Formations"],
  ["/contact", "Contact"],
  ["/blog", "Blog"],
];

/**
 * La marque, en SVG plutôt qu'en image.
 *
 * Le tracé reprend celui du logo d'origine — triangle, ligne de sol, pilier —
 * mais en vectoriel : net à toute taille, recolorable par CSS, animable au
 * survol, et sans requête réseau. Le nom qui l'accompagne est du texte, pas une
 * image.
 */
function Mark() {
  return (
    <svg
      className="brand__mark"
      viewBox="0 0 100 84"
      aria-hidden="true"
      focusable="false"
    >
      <path className="brand__triangle" d="M50 6 L94 78 H6 Z" />
      <path className="brand__ground" d="M17 64 H83" />
      <path className="brand__pillar" d="M41 64 V36 H59 V64" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const trigger = useRef(null);

  // Échap ferme le menu et rend le focus au déclencheur : sans cela, un
  // utilisateur au clavier se retrouve sans repère une fois le panneau ouvert.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <nav className="site-nav shell" aria-label={t("Navigation principale")}>
        <Link
          to="/"
          className="brand"
          aria-label={t("Innotech Impact — accueil")}
        >
          <Mark />
          {/* La coupure de couleur reprend celle du logo d'origine : le nom en
              vert de signalisation, la promesse en encre. */}
          <span className="brand__word" aria-hidden="true">
            <b>INNOTECH</b>
            <i>IMPACT</i>
          </span>
        </Link>

        <div
          id="site-nav-links"
          className={`site-nav__links ${open ? "is-open" : ""}`}
        >
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className="nav-link"
            >
              {/* Deux copies empilées : au survol la pile monte d'un cran et la
                  seconde prend la place de la première. La seconde est masquée
                  aux lecteurs d'écran pour ne pas doubler l'annonce. */}
              <span className="nav-link__roll">
                <span>{t(label)}</span>
                <span aria-hidden="true">{t(label)}</span>
              </span>
            </NavLink>
          ))}
          <Link to="/devis" onClick={() => setOpen(false)} className="nav-cta">
            {t("Parler de votre projet")} <ArrowUpRight size={16} />
          </Link>
        </div>

        <LangToggle className="lang-toggle--nav" />

        <button
          ref={trigger}
          className="menu-trigger"
          aria-label={open ? t("Fermer le menu") : t("Ouvrir le menu")}
          aria-expanded={open}
          aria-controls="site-nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
}
