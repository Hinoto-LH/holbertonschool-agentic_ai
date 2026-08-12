<script setup>
defineProps({
  name: { type: String, required: true },
  href: { type: String, required: true },
  path: { type: String, required: true },
});
</script>

<!--
  Lien vers un reseau social, rendu sous forme d'icone seule.
  `name` sert d'aria-label : sans lui, le lien n'aurait aucun nom accessible.
-->
<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="name"
    class="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-950 text-slate-50 shadow-xl shadow-slate-950/40 transition hover:bg-violet-500 hover:shadow-violet-500/40"
  >
    <!-- Logos de marque : formes pleines (fill), pas des traits (stroke) -->
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      class="h-4 w-4"
    >
      <path :d="path" />
    </svg>
  </a>
</template>
