import { BrainCircuit } from "lucide-react";

/**
 * Le logo « Agentic AI », partagé par le header et le footer.
 *
 * - `size` : "lg" pour le header, "sm" (défaut) pour le footer.
 * - `href` : optionnel. Fourni, la marque devient un lien cliquable ;
 *   absent, un simple conteneur.
 */
function Brand({ href, size = "sm", className = "" }) {
  const isLarge = size === "lg";

  // Le nom de balise est une variable : JSX résout `Wrapper` (majuscule)
  // vers son contenu, ici la chaîne "a" ou "div" — donc une balise HTML.
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper href={href} className={`flex items-center gap-2 ${className}`}>
      <div
        className={`flex items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40 ${
          isLarge ? "p-2" : "h-7 w-7"
        }`}
      >
        <BrainCircuit size={16} />
      </div>

      <span
        className={`text-slate-50 ${isLarge ? "text-xl" : "text-sm font-bold"}`}
      >
        Agentic AI
      </span>
    </Wrapper>
  );
}

export default Brand;
