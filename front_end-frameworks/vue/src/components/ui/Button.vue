<script setup>
import { computed } from "vue";

const props = defineProps({
  // Fourni : rend un <a>. Absent : un <button>.
  href: { type: String, default: undefined },
  variant: { type: String, default: "primary" },
  external: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-50 transition";

const VARIANTS = {
  primary: "bg-violet-500 shadow-lg shadow-violet-500/40",
  secondary: "border border-slate-800 bg-slate-950",
};

const HOVER = {
  primary: "cursor-pointer hover:bg-violet-600",
  secondary: "cursor-pointer hover:bg-slate-900",
};

const classes = computed(() => [
  BASE,
  VARIANTS[props.variant],
  props.disabled ? "cursor-not-allowed opacity-60" : HOVER[props.variant],
]);
</script>

<template>
  <!--
    Pas de `...rest` comme en React : Vue transmet automatiquement les
    attributs non declares (type="submit", @click...) a l'element racine.
  -->
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :disabled="href ? undefined : disabled"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="classes"
  >
    <slot />
  </component>
</template>
