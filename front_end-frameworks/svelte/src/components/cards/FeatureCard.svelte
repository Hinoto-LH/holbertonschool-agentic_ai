<script>
  /**
   * Une carte de fonctionnalité : icône, titre, description.
   *
   * `icon` reçoit le composant lui-même (voir src/data/features.js), pas
   * une icône déjà rendue. On le renomme en `Icon` avec une majuscule :
   * en minuscule, Svelte le prendrait pour une balise HTML.
   */
  let { icon: Icon, title, description } = $props();
</script>

<article
  class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
>
  <!-- Pastille icône -->
  <div
    class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40"
  >
    <Icon size={20} />
  </div>

  <!-- Titre -->
  <h3 class="mt-4 text-sm font-bold text-slate-50">{title}</h3>

  <!-- Texte -->
  <p class="mt-1 text-sm text-slate-500">{description}</p>
</article>
