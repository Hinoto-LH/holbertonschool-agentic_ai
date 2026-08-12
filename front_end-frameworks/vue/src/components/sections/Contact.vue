<script setup>
import { ref, reactive, computed } from "vue";
import {
  ArrowRight,
  FolderCode,
  Users,
  Sparkles,
  User,
  AtSign,
  Mail,
} from "lucide-vue-next";

import Button from "../ui/Button.vue";
import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";

const DEFAULT_FEEDBACK = "Please fill all required fields.";

// reactive plutot que ref : formData est un objet dont on modifie les
// proprietes une par une. On evite ainsi d'ecrire formData.value.name.
const formData = reactive({ name: "", email: "", message: "" });

const isSending = ref(false);
const feedback = ref(DEFAULT_FEEDBACK);

// Valeurs derivees : computed les recalcule des que formData change.
// Une const simple resterait figee, le script ne tournant qu'une fois.
const isNameValid = computed(() => formData.name.trim().length >= 2);
const isEmailValid = computed(
  () => formData.email.includes("@") && formData.email.includes("."),
);
const isMessageValid = computed(() => formData.message.trim().length >= 10);
const isFormValid = computed(
  () => isNameValid.value && isEmailValid.value && isMessageValid.value,
);

const FIELD_CLASSES =
  "rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 shadow-xl shadow-slate-950/40 transition placeholder:text-slate-500 focus:outline-none";

// La couleur de bordure n'apparait qu'au focus (focus:border-*)
function borderClass(isValid) {
  return isValid ? "focus:border-violet-500" : "focus:border-red-500";
}

/**
 * Simule l'envoi du formulaire.
 *
 * Sequence : blocage du bouton -> message "envoi en cours" -> attente de
 * 1,5 s -> vidage des champs -> message de succes -> retour au message par
 * defaut 9 s plus tard.
 */
async function handleSubmit() {
  // Garde-fou : le bouton est deja desactive dans ces deux cas, mais la
  // touche Entree dans un champ peut aussi declencher la soumission.
  if (!isFormValid.value || isSending.value) {
    return;
  }

  isSending.value = true;
  feedback.value = "Sending message...";

  // setTimeout n'est pas awaitable : on l'emballe dans une Promise
  // que setTimeout resoudra lui-meme au bout du delai.
  await new Promise((resolve) => setTimeout(resolve, 1500));

  Object.assign(formData, { name: "", email: "", message: "" });
  isSending.value = false;
  feedback.value = "Your message has been sent successfully.";

  // Planifie, pas attendu : la fonction se termine immediatement
  setTimeout(() => {
    feedback.value = DEFAULT_FEEDBACK;
  }, 9000);
}
</script>

<template>
  <section
    id="contact-section"
    class="relative isolate overflow-hidden bg-slate-950 py-24"
  >
    <!-- Couche 1 : glow violette -->
    <div
      class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_10%_20%,rgba(139,92,246,0.25),transparent)]"
    />

    <!-- Glow bleu -->
    <div
      class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_90%_50%,rgba(56,189,248,0.18),transparent)]"
    />

    <!-- Couche 2 : grille -->
    <div
      class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px]"
    />

    <!-- Vignette -->
    <div
      class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.6))]"
    />

    <div class="relative mx-auto max-w-6xl px-6">
      <!-- En-tete centre : un seul gap uniforme entre tous les blocs -->
      <div class="flex flex-col items-center gap-8 text-center">
        <SectionBadge>Start your AI journey</SectionBadge>

        <SectionTitle
          size="lg"
          highlight="Agentic AI?"
        >
          Ready to Explore
        </SectionTitle>

        <!-- CTA -->
        <div
          class="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            href="https://www.holbertonschool.fr/rejoindre-lhippocamp"
            external
          >
            Enroll at Holberton School <ArrowRight :size="18" />
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
            <FolderCode
              :size="16"
              class="text-violet-500"
            />
            Project-based learning
          </span>
          <span class="flex items-center gap-2 text-sm">
            <Users
              :size="16"
              class="text-violet-500"
            />
            Peer learning environment
          </span>
          <span class="flex items-center gap-2 text-sm">
            <Sparkles
              :size="16"
              class="text-violet-500"
            />
            AI-powered workflows
          </span>
        </div>

        <!-- text-start annule le text-center herite du bloc d'en-tete -->
        <form
          class="mt-8 flex w-full max-w-2xl flex-col gap-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-start shadow-2xl shadow-slate-950/40 backdrop-blur"
          @submit.prevent="handleSubmit"
        >
          <!-- Full name -->
          <div class="flex w-full flex-col gap-2">
            <label
              for="name"
              class="flex items-center gap-2 text-sm font-semibold text-slate-50"
            >
              <User
                :size="16"
                class="text-violet-500"
              />
              Full name
            </label>
            <input
              id="name"
              v-model="formData.name"
              name="name"
              type="text"
              placeholder="Your full name..."
              autocomplete="off"
              :class="[FIELD_CLASSES, borderClass(isNameValid)]"
            >
          </div>

          <!-- Email -->
          <div class="flex w-full flex-col gap-2">
            <label
              for="email"
              class="flex items-center gap-2 text-sm font-semibold text-slate-50"
            >
              <AtSign
                :size="16"
                class="text-violet-500"
              />
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autocomplete="off"
              :class="[FIELD_CLASSES, borderClass(isEmailValid)]"
            >
          </div>

          <!-- Message -->
          <div class="flex w-full flex-col gap-2">
            <label
              for="message"
              class="flex items-center gap-2 text-sm font-semibold text-slate-50"
            >
              <Mail
                :size="16"
                class="text-violet-500"
              />
              Message
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              name="message"
              placeholder="Tell us about your project or learning goals!"
              autocomplete="off"
              :class="[
                'min-h-32 resize-none',
                FIELD_CLASSES,
                borderClass(isMessageValid),
              ]"
            />
          </div>

          <Button
            type="submit"
            :disabled="!isFormValid || isSending"
            class="w-full"
          >
            {{ isSending ? "Sending..." : "Send message" }}
          </Button>

          <!-- min-h-5 reserve la hauteur : le texte change sans decaler la carte -->
          <p class="min-h-5 text-sm text-slate-500">
            {{ feedback }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
