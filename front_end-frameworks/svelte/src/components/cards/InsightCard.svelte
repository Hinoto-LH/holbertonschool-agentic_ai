<script>
  /**
   * Une carte d'insight : image de fond, dégradé, catégorie, titre, texte.
   *
   * `index` sert uniquement à la mise en page : la première carte occupe
   * deux colonnes à partir du breakpoint sm.
   */
  let { image, title, description, category, index } = $props();
</script>

<article
  class={[
    "group",
    index === 0 && "sm:col-span-2",
    "relative min-h-80 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40",
  ]}
>
  <img
    src={image}
    alt={title}
    loading="lazy"
    class="absolute inset-0 h-full w-full object-cover opacity-50"
  />

  <div class="absolute inset-0 bg-gradient-to-t from-black"></div>

  <div
    class="relative z-10 flex min-h-80 flex-col items-start justify-end p-6 text-start"
  >
    <span
      class="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300"
    >
      {category}
    </span>

    <h3 class="mt-2 text-2xl font-bold text-slate-50">{title}</h3>

    <p class="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
  </div>
</article>
