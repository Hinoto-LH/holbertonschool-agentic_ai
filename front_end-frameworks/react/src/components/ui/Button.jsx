/**
 * Bouton ou lien d'action, selon les classes du style guide §5.
 *
 * - `href`     : fourni → rend un <a> ; absent → un <button>.
 * - `variant`  : "primary" (violet) ou "secondary" (bordure).
 * - `external` : ajoute target/rel pour les liens sortants.
 * - `disabled` : n'a de sens que pour un <button>.
 * - `...rest`  : laisse passer type="submit", onClick, etc.
 */
function Button({
  children,
  href,
  variant = "primary",
  external = false,
  disabled = false,
  className = "",
  ...rest
}) {
  const Tag = href ? "a" : "button";

  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-50 transition";

  const variants = {
    primary: "bg-violet-500 shadow-lg shadow-violet-500/40",
    secondary: "border border-slate-800 bg-slate-950",
  };

  const hover = {
    primary: "cursor-pointer hover:bg-violet-600",
    secondary: "cursor-pointer hover:bg-slate-900",
  };

  const interaction = disabled ? "cursor-not-allowed opacity-60" : hover[variant];

  return (
    <Tag
      href={href}
      // `disabled` n'existe pas sur <a> : on ne le pose que sur <button>
      disabled={href ? undefined : disabled}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`${base} ${variants[variant]} ${interaction} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Button;
