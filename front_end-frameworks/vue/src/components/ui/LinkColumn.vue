<script setup>
defineProps({
  title: { type: String, required: true },
  // Tableau d'objets { label, href }
  links: { type: Array, required: true },
  // false par defaut : les ancres internes ne doivent pas ouvrir un onglet.
  external: { type: Boolean, default: false },
});
</script>

<!--
  En React, LinkColumn etait une fonction declaree dans Footer.jsx.
  Un SFC ne contient qu'un composant par fichier : il devient donc
  un fichier a part entiere.
-->
<template>
  <div>
    <h3 class="mb-4 text-sm font-bold text-slate-50">
      {{ title }}
    </h3>

    <ul class="flex flex-col items-start gap-2 text-xs text-slate-500">
      <li
        v-for="link in links"
        :key="link.label"
      >
        <a
          :href="link.href"
          :target="external ? '_blank' : undefined"
          :rel="external ? 'noopener noreferrer' : undefined"
          class="hover:text-slate-50"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>
