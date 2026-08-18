<script>
  import {
    ArrowRight,
    FolderCode,
    Users,
    Sparkles,
    User,
    AtSign,
    Mail,
  } from "@lucide/svelte";

  import Button from "../ui/Button.svelte";
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";

  const DEFAULT_FEEDBACK = "Please fill all required fields.";
  const EMPTY_FORM = { name: "", email: "", message: "" };

  // formData  : la valeur des trois champs. bind:value la lit et l'ecrit,
  //             il n'y a plus de gestionnaire handleChange comme en React.
  // isSending : vrai pendant l'envoi simule, sert a bloquer le bouton.
  // feedback  : le texte affiche sous le bouton.
  //
  // La copie { ...EMPTY_FORM } est indispensable : $state transformerait
  // la constante elle-meme en proxy, et le vidage du formulaire l'ecraserait.
  let formData = $state({ ...EMPTY_FORM });
  let isSending = $state(false);
  let feedback = $state(DEFAULT_FEEDBACK);

  // Valeurs derivees. $derived et non const : le <script> ne s'execute qu'une
  // fois, une constante figerait la validation sur le formulaire vide.
  let isNameValid = $derived(formData.name.trim().length >= 2);
  let isEmailValid = $derived(
    formData.email.includes("@") && formData.email.includes("."),
  );
  let isMessageValid = $derived(formData.message.trim().length >= 10);
  let isFormValid = $derived(isNameValid && isEmailValid && isMessageValid);

  const FIELD_CLASSES =
    "rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 shadow-xl shadow-slate-950/40 transition placeholder:text-slate-500 focus:outline-none";

  // La couleur de bordure n'apparait qu'au focus (focus:border-*)
  const borderClass = (isValid) =>
    isValid ? "focus:border-violet-500" : "focus:border-red-500";

  /**
   * Simule l'envoi du formulaire.
   *
   * Séquence : blocage du bouton → message "envoi en cours" → attente de
   * 1,5 s → vidage des champs → message de succès → retour au message par
   * défaut 9 s plus tard.
   */
  async function handleSubmit(event) {
    // Svelte 5 n'a plus de modificateurs (|preventDefault) : sans cet appel,
    // le navigateur rechargerait la page et detruirait l'application.
    event.preventDefault();

    // Garde-fou : le bouton est déjà désactivé dans ces deux cas, mais
    // la touche Entrée dans un champ peut aussi déclencher la soumission.
    if (!isFormValid || isSending) {
      return;
    }

    isSending = true;
    feedback = "Sending message...";

    // setTimeout n'est pas awaitable : on l'emballe dans une Promise
    // que setTimeout résoudra lui-même au bout du délai.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    formData = { ...EMPTY_FORM };
    isSending = false;
    feedback = "Your message has been sent successfully.";

    // Planifié, pas attendu : la fonction se termine immédiatement
    setTimeout(() => (feedback = DEFAULT_FEEDBACK), 9000);
  }
</script>

<section
  id="contact-section"
  class="relative isolate overflow-hidden bg-slate-950 py-24"
>
  <!-- Couche 1 : Glow violette -->
  <div
    class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_10%_20%,rgba(139,92,246,0.25),transparent)]"
  ></div>

  <!-- Glow bleu -->
  <div
    class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_90%_50%,rgba(56,189,248,0.18),transparent)]"
  ></div>

  <!-- Couche 2 : grille -->
  <div
    class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px]"
  ></div>

  <!-- Vignette -->
  <div
    class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.6))]"
  ></div>

  <div class="relative mx-auto max-w-6xl px-6">
    <!-- En-tête centré : un seul gap uniforme entre tous les blocs -->
    <div class="flex flex-col items-center gap-8 text-center">
      <!-- Eyebrow -->
      <SectionBadge>Start your AI journey</SectionBadge>

      <!-- Title -->
      <SectionTitle size="lg" highlight="Agentic AI?">
        Ready to Explore
      </SectionTitle>

      <!-- CTA / Button -->
      <div
        class="flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
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

      <!-- Highlights -->
      <div
        class="flex flex-wrap items-center justify-center gap-6 text-slate-500"
      >
        <span class="flex items-center gap-2 text-sm">
          <FolderCode size={16} class="text-violet-500" /> Project-based learning
        </span>
        <span class="flex items-center gap-2 text-sm">
          <Users size={16} class="text-violet-500" /> Peer learning environment
        </span>
        <span class="flex items-center gap-2 text-sm">
          <Sparkles size={16} class="text-violet-500" /> AI-powered workflows
        </span>
      </div>

      <!-- text-start annule le text-center hérité du bloc d'en-tête -->
      <form
        onsubmit={handleSubmit}
        class="mt-8 flex w-full max-w-2xl flex-col gap-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-start shadow-2xl shadow-slate-950/40 backdrop-blur"
      >
        <!-- Full name -->
        <div class="flex w-full flex-col gap-2">
          <label
            for="name"
            class="flex items-center gap-2 text-sm font-semibold text-slate-50"
          >
            <User size={16} class="text-violet-500" />
            Full name
          </label>
          <input
            id="name"
            name="name"
            bind:value={formData.name}
            type="text"
            placeholder="Your full name..."
            autocomplete="off"
            class={[FIELD_CLASSES, borderClass(isNameValid)]}
          />
        </div>

        <!-- Email -->
        <div class="flex w-full flex-col gap-2">
          <label
            for="email"
            class="flex items-center gap-2 text-sm font-semibold text-slate-50"
          >
            <AtSign size={16} class="text-violet-500" />
            Email
          </label>
          <input
            id="email"
            name="email"
            bind:value={formData.email}
            type="email"
            placeholder="you@example.com"
            autocomplete="off"
            class={[FIELD_CLASSES, borderClass(isEmailValid)]}
          />
        </div>

        <!-- Message -->
        <div class="flex w-full flex-col gap-2">
          <label
            for="message"
            class="flex items-center gap-2 text-sm font-semibold text-slate-50"
          >
            <Mail size={16} class="text-violet-500" />
            Message
          </label>
          <textarea
            id="message"
            name="message"
            bind:value={formData.message}
            placeholder="Tell us about your project or learning goals!"
            autocomplete="off"
            class={[
              "min-h-32 resize-none",
              FIELD_CLASSES,
              borderClass(isMessageValid),
            ]}
          ></textarea>
        </div>

        <Button type="submit" disabled={!isFormValid || isSending} class="w-full">
          {isSending ? "Sending..." : "Send message"}
        </Button>

        <!-- min-h-5 réserve la hauteur : le texte changera sans décaler la carte -->
        <p class="min-h-5 text-sm text-slate-500">{feedback}</p>
      </form>
    </div>
  </div>
</section>
