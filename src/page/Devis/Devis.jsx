import { useRef, useState } from "react";
import { apiBase } from "../../lib/api";
import { ClipboardPenLine, Mail, ShieldCheck } from "lucide-react";
import PageMeta from "../../Components/PageMeta/PageMeta";
import { Spinner } from "../../Components/Skeleton/Skeleton";
import { useT } from "../../i18n";

const base = apiBase;

const SERVICES = [
  "Produit web ou mobile",
  "Outil métier / digitalisation",
  "Atelier ou formation STEM",
  "Autre besoin",
];

/** Mêmes règles que le formulaire de contact : message du problème + sortie. */
function validate({ name, email, service, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Indiquez le nom sous lequel vous répondre.";
  if (!email.trim())
    errors.email = "Indiquez une adresse e-mail pour la réponse.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email =
      "Cette adresse semble incomplète. Vérifiez le @ et le nom de domaine.";
  if (!service)
    errors.service = "Choisissez la piste la plus proche de votre besoin.";
  if (message.trim().length < 10)
    errors.message =
      "Décrivez le contexte en au moins dix caractères, pour que la réponse soit utile.";
  return errors;
}

export default function Devis() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
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
          "La demande n’a pas été envoyée : corrigez les champs signalés ci-dessus.",
        ),
      );
      noteRef.current?.focus();
      return;
    }

    setErrors({});
    setState("sending");
    setNote(t("Transmission de votre demande…"));
    try {
      const r = await fetch(`${base}/api/quotes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw Error();
      setForm({ name: "", email: "", service: "", message: "" });
      setState("success");
      setNote(
        t(
          "Votre demande a bien été reçue. Nous revenons vers vous prochainement.",
        ),
      );
    } catch {
      setState("error");
      setNote(
        t("L’envoi n’a pas abouti. Écrivez-nous à innotech@kit-hub.com."),
      );
      noteRef.current?.focus();
    }
  };

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
        title="Demande de projet"
        description="Décrivez votre besoin, les personnes concernées et ce que vous souhaitez rendre possible."
        path="/devis"
      />

      <section className="section">
        <div className="shell">
          <div data-reveal="rise" className="quote-intro">
            <div className="page-intro">
              <p className="eyebrow">{t("Demande de projet")}</p>
              <h1>{t("Mettons un premier contour sur votre idée.")}</h1>
            </div>
            <p>
              {t(
                "Quelques éléments suffisent pour démarrer : le besoin, les personnes concernées et ce que vous souhaitez rendre possible.",
              )}
            </p>
          </div>

          <div data-reveal="rise" className="form-shell">
            <aside className="form-shell__aside">
              <div>
                <p className="eyebrow">{t("Une demande utile")}</p>
                <h2>
                  {t("Un bon projet commence par une question bien posée.")}
                </h2>
              </div>
              <div className="contact-points">
                <span>
                  <ClipboardPenLine size={17} />
                  {t("Décrivez le besoin, pas la solution attendue.")}
                </span>
                <span>
                  <ShieldCheck size={17} />
                  {t("Vos informations servent uniquement à votre demande.")}
                </span>
                <a href="mailto:innotech@kit-hub.com">
                  <Mail size={17} />
                  innotech@kit-hub.com
                </a>
              </div>
            </aside>

            <form className="form" onSubmit={submit} noValidate>
              <p className="form-legend">
                {t("Tous les champs sont nécessaires pour cadrer la demande.")}
              </p>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="quote-name">{t("Votre nom")}</label>
                  <input {...field("quote-name", "name")} />
                  {errors.name && (
                    <p className="field-error" id="quote-name-error">
                      {t(errors.name)}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="quote-email">{t("Votre e-mail")}</label>
                  <input type="email" {...field("quote-email", "email")} />
                  {errors.email && (
                    <p className="field-error" id="quote-email-error">
                      {t(errors.email)}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <label htmlFor="quote-service">
                  {t("Ce qui vous intéresse")}
                </label>
                <select {...field("quote-service", "service")}>
                  <option value="">{t("Choisir une piste")}</option>
                  {SERVICES.map((s) => (
                    <option key={s}>{t(s)}</option>
                  ))}
                </select>
                {errors.service && (
                  <p className="field-error" id="quote-service-error">
                    {t(errors.service)}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="quote-message">{t("Votre contexte")}</label>
                <textarea
                  placeholder={t(
                    "Le problème à résoudre, les personnes concernées, une échéance éventuelle…",
                  )}
                  {...field("quote-message", "message")}
                />
                {errors.message && (
                  <p className="field-error" id="quote-message-error">
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
                  t("Envoyer la demande")
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
