<script setup>
import Brand from "../ui/Brand.vue";
import LinkColumn from "../ui/LinkColumn.vue";
import SocialLink from "../ui/SocialLink.vue";
import socials from "../../data/socials";

const navLinks = [
  { label: "Hero section", href: "#hero-section" },
  { label: "About", href: "#about-section" },
  { label: "Features", href: "#features-section" },
  { label: "Insights", href: "#insights-section" },
  { label: "Contact", href: "#contact-section" },
];

const schoolLinks = [
  { label: "About", href: "https://www.holbertonschool.fr/" },
  { label: "Methodology", href: "https://www.holbertonschool.fr/methodologie" },
  { label: "Story", href: "https://www.holbertonschool.fr/a-propos" },
  { label: "Agenda", href: "https://www.holbertonschool.fr/" },
];

const BACHELOR_URL =
  "https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering";

const curriculumLinks = [
  { label: "Bachelor", href: BACHELOR_URL },
  { label: "Program", href: `${BACHELOR_URL}#programme` },
];

// Calcule une seule fois au montage : une annee ne change pas pendant
// qu'on consulte la page. Pas besoin de computed ici.
const year = new Date().getFullYear();
</script>

<template>
  <footer class="bg-black px-6">
    <div class="mx-auto grid max-w-6xl gap-8 pt-24 pb-12 md:grid-cols-5">
      <!-- Marque : occupe 2 colonnes sur 5 -->
      <div class="flex flex-col items-start gap-4 md:col-span-2">
        <Brand href="#hero-section" />

        <p class="text-xs text-slate-500">
          Explore the future of development with Agentic AI.
        </p>

        <!-- Sans aria-label, un lecteur d'ecran annoncerait 4 fois "lien" -->
        <div class="flex items-center gap-2">
          <SocialLink
            v-for="social in socials"
            :key="social.name"
            v-bind="social"
          />
        </div>
      </div>

      <LinkColumn
        title="Navigation"
        :links="navLinks"
      />
      <LinkColumn
        title="Holberton School"
        :links="schoolLinks"
        external
      />
      <LinkColumn
        title="Curriculum"
        :links="curriculumLinks"
        external
      />
    </div>

    <!-- Barre de copyright, separee par un filet -->
    <div
      class="mx-auto flex max-w-6xl flex-col items-start justify-center gap-2 border-t border-slate-900 pt-6 pb-24 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:gap-0"
    >
      <p>
        © {{ year }}
        <a
          href="https://github.com/Hinoto-LH"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-slate-50"
        >
          Hinoto-LH
        </a>
      </p>
      <p>Built for the Holberton School Front-end Frameworks curriculum.</p>
    </div>
  </footer>
</template>
