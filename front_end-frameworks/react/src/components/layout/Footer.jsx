import Brand from "../ui/Brand";
import SocialLink from "../ui/SocialLink";
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

/**
 * Une colonne de liens du footer.
 *
 * `external` vaut false par défaut : les ancres internes (#about-section)
 * ne doivent pas ouvrir un nouvel onglet. Quand il est vrai, on ajoute
 * les deux attributs exigés pour les liens sortants.
 */
function LinkColumn({ title, links, external = false }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold text-slate-50">{title}</h3>
      <ul className="flex flex-col items-start gap-2 text-xs text-slate-500">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-slate-50"
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  // Recalculé à chaque rendu : jamais codé en dur, donc jamais périmé.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black px-6">
      <div className="mx-auto grid max-w-6xl gap-8 pt-24 pb-12 md:grid-cols-5">
        {/* Marque */}
        <div className="flex flex-col items-start gap-4 md:col-span-2">
          <Brand href="#hero-section" />

          <p className="text-xs text-slate-500">
            Explore the future of development with Agentic AI.
          </p>

          {/* sans aria-label, un lecteur
              d'écran annoncerait quatre fois « lien » */}
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <SocialLink key={social.name} {...social} />
            ))}
          </div>
        </div>

        <LinkColumn title="Navigation" links={navLinks} />
        <LinkColumn title="Holberton School" links={schoolLinks} external />
        <LinkColumn title="Curriculum" links={curriculumLinks} external />
      </div>

      {/* Barre de copyright, séparée par un filet */}
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-center gap-2 border-t border-slate-900 pt-6 pb-24 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:gap-0">
        <p>
          © {year}{" "}
          <a
            href="https://github.com/Hinoto-LH"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-50"
          >
            Hinoto-LH
          </a>
        </p>
        <p>Built for the Holberton School Front-end Frameworks curriculum.</p>
      </div>
    </footer>
  );
}

export default Footer;
