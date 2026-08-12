<script setup>
defineProps({
  // Contient un composant lucide, pas une chaine.
  // Un composant Vue est un objet ; certains sont des fonctions.
  icon: { type: [Object, Function], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});
</script>

<template>
  <article
    class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
  >
    <!-- Pastille -->
    <div
      class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40"
    >
      <component
        :is="icon"
        :size="20"
      />
    </div>

    <h3 class="mt-4 text-sm font-bold text-slate-50">
      {{ title }}
    </h3>
    <p class="mt-1 text-sm text-slate-500">
      {{ description }}
    </p>
  </article>
</template>
