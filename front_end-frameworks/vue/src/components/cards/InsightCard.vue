<script setup>
defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  // Sert uniquement a distinguer la premiere carte, qui occupe 2 colonnes.
  index: { type: Number, required: true },
});
</script>

<template>
  <article
    :class="[
      'group relative min-h-80 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40',
      index === 0 ? 'sm:col-span-2' : '',
    ]"
  >
    <!-- Couche 1 : l'image, en absolu, remplit toute la carte -->
    <img
      :src="image"
      :alt="title"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover opacity-50"
    >

    <!-- Couche 2 : le degrade, pour la lisibilite du texte -->
    <div class="absolute inset-0 bg-gradient-to-t from-black" />

    <!-- Couche 3 : le contenu, au-dessus grace a relative z-10 -->
    <div
      class="relative z-10 flex min-h-80 flex-col items-start justify-end p-6 text-start"
    >
      <span
        class="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300"
      >
        {{ category }}
      </span>

      <h3 class="mt-2 text-2xl font-bold text-slate-50">
        {{ title }}
      </h3>
      <p class="mt-1 max-w-sm text-sm text-slate-500">
        {{ description }}
      </p>
    </div>
  </article>
</template>
