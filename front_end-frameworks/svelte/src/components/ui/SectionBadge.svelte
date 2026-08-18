<script>
  /**
   * Le petit badge violet en tête de chaque section.
   *
   * `class` reste à la main de l'appelant : le badge possède les classes
   * de son apparence, pas celles de son placement (marges), qui dépendent
   * de la section où il est posé.
   */
  let { children, class: className = "" } = $props();

  const BASE =
    "inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300";
</script>

<p class={[BASE, className]}>
  <span aria-hidden="true" class="text-[8px]">✦</span>
  {@render children?.()}
  <span aria-hidden="true" class="text-[8px]">✦</span>
</p>
