<script>
  /**
   * Une colonne de liens du footer.
   *
   * En React, LinkColumn était une fonction déclarée dans Footer.jsx.
   * Un fichier .svelte ne contient qu'un composant : il devient donc un
   * fichier à part entière, comme en Vue.
   *
   * `links` est un tableau d'objets { label, href }.
   * `external` vaut false par défaut : les ancres internes (#about-section)
   * ne doivent pas ouvrir un nouvel onglet. Quand il est vrai, on ajoute
   * les deux attributs exigés pour les liens sortants.
   */
  let { title, links, external = false } = $props();
</script>

<div>
  <h3 class="mb-4 text-sm font-bold text-slate-50">{title}</h3>

  <ul class="flex flex-col items-start gap-2 text-xs text-slate-500">
    {#each links as link (link.label)}
      <li>
        <a
          href={link.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          class="hover:text-slate-50"
        >
          {link.label}
        </a>
      </li>
    {/each}
  </ul>
</div>
