<script>
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
  let {
    children,
    highlight,
    as: tag = "h2",
    size = "md",
    class: className = "",
  } = $props();

  const BASE = "leading-none font-black tracking-tight";

  // $derived et non const : une constante ne capturerait que la valeur
  // initiale de `size`, ce que le compilateur signale explicitement.
  let sizeClasses = $derived(
    size === "lg" ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl",
  );
</script>

<svelte:element this={tag} class={[BASE, sizeClasses, className]}>
  <span class="block text-slate-50">{@render children?.()}</span>
  <span class="block text-violet-300">{highlight}</span>
</svelte:element>
