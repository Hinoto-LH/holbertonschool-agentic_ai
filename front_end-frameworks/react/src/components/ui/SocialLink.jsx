/**
 * Un lien vers un réseau social, rendu sous forme d'icône seule.
 *
 * `name` sert d'aria-label : sans lui, le lien n'aurait aucun nom
 * accessible et un lecteur d'écran annoncerait seulement « lien ».
 * `path` est un tracé SVG plein (voir src/data/socials.js).
 */
function SocialLink({ name, href, path }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-950 text-slate-50 shadow-xl shadow-slate-950/40 transition hover:bg-violet-500 hover:shadow-violet-500/40"
    >
      {/* Logos de marque : formes pleines (fill), pas des traits (stroke) */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <path d={path} />
      </svg>
    </a>
  );
}

export default SocialLink;
