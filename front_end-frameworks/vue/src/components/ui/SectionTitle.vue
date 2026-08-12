<script setup>
import { computed } from "vue";

const props = defineProps({
  // La seconde ligne, affichee en violet.
  highlight: { type: String, required: true },
  // "h2" par defaut : la page ne doit contenir qu'un seul h1, dans le Hero.
  as: { type: String, default: "h2" },
  size: { type: String, default: "md" },
});

const sizeClasses = computed(() =>
  props.size === "lg" ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl",
);
</script>

<template>
  <component
    :is="as"
    :class="['leading-none font-black tracking-tight', sizeClasses]"
  >
    <span class="block text-slate-50"><slot /></span>
    <span class="block text-violet-300">{{ highlight }}</span>
  </component>
</template>
