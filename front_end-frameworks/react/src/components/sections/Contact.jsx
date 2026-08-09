import Button from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";
import SectionBadge from "../ui/SectionBadge";
import {
  ArrowRight,
  FolderCode,
  Users,
  Sparkles,
  User,
  AtSign,
  Mail,
} from "lucide-react";
import { useState } from "react";


const DEFAULT_FEEDBACK = "Please fill all required fields.";
const EMPTY_FORM = { name: "", email: "", message: "" };

function Contact() {
  // formData : la valeur des trois champs — c'est React qui la détient,
  //            les inputs ne font que l'afficher (inputs contrôlés).
  // isSending : vrai pendant l'envoi simulé, sert à bloquer le bouton.
  // feedback  : le texte affiché sous le bouton.
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);

  /**
   * Met à jour le champ qui vient d'être modifié.
   *
   * Un seul gestionnaire suffit pour les trois champs : on lit l'attribut
   * `name` de l'élément déclencheur pour savoir lequel mettre à jour.
   * Le spread `...prev` préserve les deux autres champs, qui seraient
   * sinon effacés puisqu'on remplace l'objet entier.
   */
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Simule l'envoi du formulaire.
   *
   * Séquence : blocage du bouton → message "envoi en cours" → attente de
   * 1,5 s → vidage des champs → message de succès → retour au message par
   * défaut 9 s plus tard.
   */
  async function handleSubmit(event) {
    // Sans ça, le navigateur rechargerait la page et détruirait l'app
    event.preventDefault();

    // Garde-fou : le bouton est déjà désactivé dans ces deux cas, mais
    // la touche Entrée dans un champ peut aussi déclencher la soumission.
    if (!isFormValid || isSending) {
      return;
    }

    setIsSending(true);
    setFeedback("Sending message...");

    // setTimeout n'est pas awaitable : on l'emballe dans une Promise
    // que setTimeout résoudra lui-même au bout du délai.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormData(EMPTY_FORM);
    setIsSending(false);
    setFeedback("Your message has been sent successfully.");

    // Planifié, pas attendu : la fonction se termine immédiatement
    setTimeout(() => setFeedback(DEFAULT_FEEDBACK), 9000);
  }

  // Valeurs dérivées : recalculées à chaque rendu depuis formData.
  // Pas de useState ici, sinon l'état pourrait se désynchroniser.
  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid =
    formData.email.includes("@") && formData.email.includes(".");
  const isMessageValid = formData.message.trim().length >= 10;
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  const fieldClasses =
    "rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 shadow-xl shadow-slate-950/40 transition placeholder:text-slate-500 focus:outline-none";

  // La couleur de bordure n'apparaît qu'au focus (focus:border-*)
  const borderClass = (isValid) =>
    isValid ? "focus:border-violet-500" : "focus:border-red-500";

  return (
    <section
      id="contact-section"
      className="relative isolate overflow-hidden bg-slate-950 py-24"
    >
      {/* Couche 1 : Glow violette */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_10%_20%,rgba(139,92,246,0.25),transparent)]" />

      {/* Glow bleu */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_90%_50%,rgba(56,189,248,0.18),transparent)]" />

      {/* Couche 2 : grille  */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Vignette */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.6))]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* En-tête centré : un seul gap uniforme entre tous les blocs */}
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Eyebrow */}
          <SectionBadge>Start your AI journey</SectionBadge>

          {/* Title */}
          <SectionTitle size="lg" highlight="Agentic AI?">
            Ready to Explore
          </SectionTitle>
          {/* CTA / Button */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="https://www.holbertonschool.fr/rejoindre-lhippocamp"
              external
            >
              Enroll at Holberton School <ArrowRight size={18} />
            </Button>

            <Button
              href="https://www.holbertonschool.fr/admission"
              variant="secondary"
              external
            >
              Need more information?
            </Button>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500">
            <span className="flex items-center gap-2 text-sm">
              <FolderCode size={16} className="text-violet-500" /> Project-based
              learning{" "}
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Users size={16} className="text-violet-500" /> Peer learning
              environment
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Sparkles size={16} className="text-violet-500" /> AI-powered
              workflows
            </span>
          </div>
          
          {/* text-start annule le text-center hérité du bloc d'en-tête */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-2xl flex-col gap-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-start shadow-2xl shadow-slate-950/40 backdrop-blur"
          >
            {/* Full name */}
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-semibold text-slate-50"
              >
                <User size={16} className="text-violet-500" />
                Full name
              </label>
              <input
                id="name"
                name="name"
                onChange={handleChange}
                value={formData.name}
                type="text"
                placeholder="Your full name..."
                autoComplete="off"
                className={`${fieldClasses} ${borderClass(isNameValid)}`}
              />
            </div>

            {/* Email */}
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-semibold text-slate-50"
              >
                <AtSign size={16} className="text-violet-500" />
                Email
              </label>
              <input
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                type="email"
                placeholder="you@example.com"
                autoComplete="off"
                className={`${fieldClasses} ${borderClass(isEmailValid)}`}
              />
            </div>

            {/* Message */}
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-semibold text-slate-50"
              >
                <Mail size={16} className="text-violet-500" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                value={formData.message}
                placeholder="Tell us about your project or learning goals!"
                autoComplete="off"
                className={`min-h-32 resize-none ${fieldClasses} ${borderClass(isMessageValid)}`}
              />
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isSending}
              className="w-full"
            >
              {isSending ? "Sending..." : "Send message"}
            </Button>

            {/* min-h-5 réserve la hauteur : le texte changera sans décaler la carte */}
            <p className="min-h-5 text-sm text-slate-500">{feedback}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
