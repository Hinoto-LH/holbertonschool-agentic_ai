/**
 * Le titre d'une section, sur deux lignes : la première en blanc,
 * la seconde en violet.
 *
 * - `children`  : la première ligne
 * - `highlight` : la seconde, mise en avant
 * - `as`        : "h2" par défaut. Seul le Hero passe "h1" — la page ne
 *                 doit en contenir qu'un, pour la hiérarchie des titres.
 * - `size`      : "lg" pour Hero et Contact, "md" pour les autres.
 */
function SectionTitle({
  children,
  highlight,
  as: Tag = "h2",
  size = "md",
  className = "",
}) {
  const sizeClasses =
    size === "lg" ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl";

  return (
    <Tag
      className={`leading-none font-black tracking-tight ${sizeClasses} ${className}`}
    >
      <span className="block text-slate-50">{children}</span>
      <span className="block text-violet-300">{highlight}</span>
    </Tag>
  );
}

export default SectionTitle;
