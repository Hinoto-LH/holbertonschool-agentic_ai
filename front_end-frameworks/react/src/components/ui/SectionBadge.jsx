/**
 * Le petit badge violet en tête de chaque section.
 *
 * `className` reste à la main de l'appelant : le badge possède les classes
 * de son apparence, pas celles de son placement (marges), qui dépendent
 * de la section où il est posé.
 */
function SectionBadge({ children, className = "" }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300 ${className}`}
    >
      <span aria-hidden="true" className="text-[8px]">
        ✦
      </span>
      {children}
      <span aria-hidden="true" className="text-[8px]">
        ✦
      </span>
    </p>
  );
}

export default SectionBadge;
