import { useState } from "react";
import { apiBase } from "../../lib/api";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-innotech-dark.webp";
import "./footer.css";
import { useT } from "../../i18n";
import LangToggle from "../LangToggle/LangToggle";
export default function Footer() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const base = apiBase;
  const subscribe = async (e) => {
    e.preventDefault();
    setNote(t("Inscription en cours…"));
    try {
      const r = await fetch(`${base}/api/newsletter/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw Error();
      setEmail("");
      setNote(t("Votre inscription est confirmée."));
    } catch {
      setNote(
        t("Le service est indisponible. Écrivez-nous à innotech@kit-hub.com."),
      );
    }
  };
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="Innotech Impact" width="360" height="272" />
          <p>
            {t(
              "Des logiciels qui servent l’économie réelle. Des apprentissages STEM qui ouvrent les prochaines possibilités.",
            )}
          </p>
          <a href="mailto:innotech@kit-hub.com">
            <ArrowRight size={17} /> {t("Écrire à Innotech")}
          </a>
        </div>
        <div>
          <p className="footer-label">{t("Explorer")}</p>
          <div className="footer-links">
            <Link to="/services">
              {t("Solutions")} <ArrowRight />
            </Link>
            <Link to="/projects">
              {t("Réalisations")} <ArrowRight />
            </Link>
            <Link to="/formation">
              {t("STEM Academy")} <ArrowRight />
            </Link>
            <Link to="/about">
              {t("Notre impact")} <ArrowRight />
            </Link>
          </div>
        </div>
        <div>
          <p className="footer-label">{t("Nous joindre")}</p>
          <div className="footer-contact">
            <a href="mailto:innotech@kit-hub.com">
              <Mail /> innotech@kit-hub.com
            </a>
            <span>
              <MapPin /> N° 7, Av. Rweru, Kabondo, Mukaza, Bujumbura, Burundi
            </span>
          </div>
        </div>
        <div>
          <p className="footer-label">{t("Le signal Innotech")}</p>
          <p className="footer-news-copy">
            {t(
              "Recevez les actualités sur nos solutions, initiatives et formations.",
            )}
          </p>
          <form onSubmit={subscribe} className="footer-form">
            <label className="sr-only" htmlFor="newsletter-email">
              {t("Votre e-mail")}
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button aria-label={t("S’inscrire à la newsletter")}>
              <ArrowRight />
            </button>
          </form>
          <p className="footer-note" aria-live="polite">
            {note}
          </p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Innotech Impact</span>
        <LangToggle className="lang-toggle--footer" />
        <span className="footer-legal">
          <Link to="/mentions">{t("Mentions légales")}</Link>
          <span aria-hidden="true">·</span>
          {t("Construire. Transmettre. Amplifier.")}
        </span>
      </div>
    </footer>
  );
}
