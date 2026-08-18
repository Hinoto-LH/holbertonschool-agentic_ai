<script>
  import Brand from "../ui/Brand.svelte";
  import SocialLink from "../ui/SocialLink.svelte";
  import LinkColumn from "../ui/LinkColumn.svelte";
  import socials from "../../data/socials.js";

  const navLinks = [
    { label: "Hero section", href: "#hero-section" },
    { label: "About", href: "#about-section" },
    { label: "Features", href: "#features-section" },
    { label: "Insights", href: "#insights-section" },
    { label: "Contact", href: "#contact-section" },
  ];

  const schoolLinks = [
    { label: "About", href: "https://www.holbertonschool.fr/" },
    {
      label: "Methodology",
      href: "https://www.holbertonschool.fr/methodologie",
    },
    { label: "Story", href: "https://www.holbertonschool.fr/a-propos" },
    { label: "Agenda", href: "https://www.holbertonschool.fr/" },
  ];

  const BACHELOR_URL =
    "https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering";

  const curriculumLinks = [
    { label: "Bachelor", href: BACHELOR_URL },
    { label: "Program", href: `${BACHELOR_URL}#programme` },
  ];

  // const suffit : la date ne depend d'aucune donnee reactive, et l'annee
  // ne changera pas pendant la visite. Jamais codee en dur, donc jamais perimee.
  const year = new Date().getFullYear();
</script>

<footer class="bg-black px-6">
  <div class="mx-auto grid max-w-6xl gap-8 pt-24 pb-12 md:grid-cols-5">
    <!-- Marque -->
    <div class="flex flex-col items-start gap-4 md:col-span-2">
      <Brand href="#hero-section" />

      <p class="text-xs text-slate-500">
        Explore the future of development with Agentic AI.
      </p>

      <!-- sans aria-label, un lecteur d'écran annoncerait quatre fois « lien » -->
      <div class="flex items-center gap-2">
        {#each socials as social (social.name)}
          <SocialLink {...social} />
        {/each}
      </div>
    </div>

    <LinkColumn title="Navigation" links={navLinks} />
    <LinkColumn title="Holberton School" links={schoolLinks} external />
    <LinkColumn title="Curriculum" links={curriculumLinks} external />
  </div>

  <!-- Barre de copyright, séparée par un filet -->
  <div
    class="mx-auto flex max-w-6xl flex-col items-start justify-center gap-2 border-t border-slate-900 pt-6 pb-24 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:gap-0"
  >
    <p>
      © {year}
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
