<script>
  /**
   * Bouton ou lien d'action, selon les classes du style guide §5.
   *
   * - `href`     : fourni → rend un <a> ; absent → un <button>.
   * - `variant`  : "primary" (violet) ou "secondary" (bordure).
   * - `external` : ajoute target/rel pour les liens sortants.
   * - `disabled` : n'a de sens que pour un <button>.
   * - `...rest`  : laisse passer type="submit", onclick, etc.
   *
   * `class` est un mot réservé en JavaScript : on le renomme à la
   * déstructuration, alors que l'attribut garde son nom HTML.
   */
  let {
    children,
    href,
    variant = "primary",
    external = false,
    disabled = false,
    class: className = "",
    ...rest
  } = $props();

  const BASE =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-50 transition";

  const VARIANTS = {
    primary: "bg-violet-500 shadow-lg shadow-violet-500/40",
    secondary: "border border-slate-800 bg-slate-950",
  };

  const HOVER = {
    primary: "cursor-pointer hover:bg-violet-600",
    secondary: "cursor-pointer hover:bg-slate-900",
  };

  // $derived, et non const : le <script> ne s'execute qu'une fois, donc une
  // constante figerait l'apparence initiale. Contact fait varier `disabled`
  // a chaque frappe, le bouton doit suivre.
  let interaction = $derived(
    disabled ? "cursor-not-allowed opacity-60" : HOVER[variant],
  );
</script>

<!--
  <svelte:element> remplace la variable `Tag` de JSX : `this` recoit le nom
  de la balise sous forme de chaine. Un attribut valant undefined est omis
  du HTML, ce qui evite `disabled` sur un <a> et target/rel sur un bouton.
-->
<svelte:element
  this={href ? "a" : "button"}
  {href}
  disabled={href ? undefined : disabled}
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
  class={[BASE, VARIANTS[variant], interaction, className]}
  {...rest}
>
  <!-- Le contenu entre les balises est un snippet : il s'appelle, il ne
       s'affiche pas. Le `?.` reproduit la tolerance de React quand le
       composant est utilise sans enfants. -->
  {@render children?.()}
</svelte:element>
