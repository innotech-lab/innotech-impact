import { useRef, useState } from "react";
import { apiBase } from "../../lib/api";
import { Mail, MapPin } from "lucide-react";
import PageMeta from "../../Components/PageMeta/PageMeta";
import { Spinner } from "../../Components/Skeleton/Skeleton";
import Faq from "../../Components/Faq/Faq";
import { useT } from "../../i18n";

const base = apiBase;

/**
 * Validation côté client, en français.
 *
 * La validation native du navigateur affiche ses messages dans la langue du
 * navigateur, pas celle du site, et n'expose rien à `aria-invalid`. Chaque
 * message nomme le problème et la sortie, comme le fait déjà le message d'échec
 * global du formulaire.
 */
function validate({ name, email, subject, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Indiquez le nom sous lequel vous répondre.";
  if (!email.trim())
    errors.email = "Indiquez une adresse e-mail pour la réponse.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email =
      "Cette adresse semble incomplète. Vérifiez le @ et le nom de domaine.";
  if (!subject.trim())
    errors.subject = "Résumez votre demande en quelques mots.";
  if (message.trim().length < 10)
    errors.message =
      "Décrivez le contexte en au moins dix caractères, pour que la réponse soit utile.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState("");
  const [state, setState] = useState("");
  const noteRef = useRef(null);
  const t = useT();

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name])
      setErrors({ ...errors, [e.target.name]: undefined });
  };

  const submit = async (e) => {
    e.preventDefault();

    const found = validate(form);
    if (Object.keys(found).length) {
      setErrors(found);
      setState("error");
      setNote(
        t(
          "Le formulaire n’a pas été envoyé : corrigez les champs signalés ci-dessus.",
        ),
      );
      noteRef.current?.focus();
      return;
    }

    setErrors({});
    setState("sending");
    setNote(t("Envoi de votre message…"));
    try {
      const r = await fetch(`${base}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw Error();
      setForm({ name: "", email: "", subject: "", message: "" });
      setState("success");
      setNote(t("Merci. Votre message est bien arrivé à l’équipe."));
    } catch {
      setState("error");
      setNote(
        t(
          "L’envoi n’a pas abouti. Écrivez-nous directement à innotech@kit-hub.com.",
        ),
      );
      noteRef.current?.focus();
    }
  };

  /** Attributs communs à un champ : liaison du message d'erreur incluse. */
  const field = (id, name) => ({
    id,
    name,
    value: form[name],
    onChange: change,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-error` : undefined,
  });

  return (
    <>
      <PageMeta
        title="Contact"
        description="Un projet logiciel, une idée de formation ou une piste de partenariat : racontez-nous le contexte."
        path="/contact"
      />

      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow reveal">{t("Contact")}</p>
          <h1 className="reveal reveal--2">
            {t("Commençons par ce qui vous occupe vraiment.")}
          </h1>
          <p className="reveal reveal--3">
            {t(
              "Un projet logiciel, une idée de formation ou une piste de partenariat : racontez-nous le contexte.",
            )}
          </p>
          <div className="page-hero__line" />
        </div>
      </section>

      <Faq />

      <section className="section">
        <div data-reveal="rise" className="shell form-shell">
          <aside className="form-shell__aside">
            <div>
              <p className="eyebrow">{t("Une conversation, pas un ticket")}</p>
              <h2>{t("Écrivez ce qui mérite de bouger.")}</h2>
              <p>
                {t(
                  "Nous utiliserons ces informations uniquement pour répondre à votre demande.",
                )}
              </p>
            </div>
            <div className="contact-points">
              <a href="mailto:innotech@kit-hub.com">
                <Mail size={17} />
                innotech@kit-hub.com
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={17} />
                N° 7, Av. Rweru, Kabondo, Mukaza, Bujumbura, Burundi
              </a>
            </div>
          </aside>

          <form className="form" onSubmit={submit} noValidate>
            <p className="form-legend">
              {t("Tous les champs sont nécessaires pour vous répondre.")}
            </p>

            <div className="form-row">
              <div className="field">
                <label htmlFor="name">{t("Votre nom")}</label>
                <input {...field("name", "name")} />
                {errors.name && (
                  <p className="field-error" id="name-error">
                    {t(errors.name)}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="email">{t("Votre e-mail")}</label>
                <input type="email" {...field("email", "email")} />
                {errors.email && (
                  <p className="field-error" id="email-error">
                    {t(errors.email)}
                  </p>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="subject">{t("Sujet")}</label>
              <input
                placeholder={t("Ex. Développer une plateforme de formation")}
                {...field("subject", "subject")}
              />
              {errors.subject && (
                <p className="field-error" id="subject-error">
                  {t(errors.subject)}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="message">{t("Votre message")}</label>
              <textarea {...field("message", "message")} />
              {errors.message && (
                <p className="field-error" id="message-error">
                  {t(errors.message)}
                </p>
              )}
            </div>

            <p
              ref={noteRef}
              tabIndex={-1}
              aria-live="polite"
              className={`form-note ${state ? `form-note--${state}` : ""}`}
            >
              {note}
            </p>

            <button
              className="button button--ink"
              disabled={state === "sending"}
            >
              {state === "sending" ? (
                <>
                  <Spinner />
                  {t("Envoi…")}
                </>
              ) : (
                t("Envoyer le message")
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
