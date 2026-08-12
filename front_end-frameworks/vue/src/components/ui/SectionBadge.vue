<!--
  Le badge violet en tete de chaque section.

  Pas de prop `class` : Vue fusionne automatiquement le `class` pose par
  l'appelant avec celui de l'element racine (fallthrough attributes).
-->
<template>
  <p
    class="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300"
  >
    <span
      aria-hidden="true"
      class="text-[8px]"
    >✦</span>
    <slot />
    <span
      aria-hidden="true"
      class="text-[8px]"
    >✦</span>
  </p>
</template>
