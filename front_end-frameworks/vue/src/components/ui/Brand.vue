<script setup>
import { computed } from "vue";
import { BrainCircuit } from "lucide-vue-next";

const props = defineProps({
  // Fourni : la marque devient un lien. Absent : un simple conteneur.
  href: { type: String, default: undefined },
  // "lg" pour le header, "sm" pour le footer.
  size: { type: String, default: "sm" },
});

const isLarge = computed(() => props.size === "lg");
</script>

<template>
  <!-- <component :is> remplace l'idiome React `const Wrapper = href ? "a" : "div"` -->
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    class="flex items-center gap-2"
  >
    <div
      :class="[
        'flex items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40',
        isLarge ? 'p-2' : 'h-7 w-7',
      ]"
    >
      <BrainCircuit :size="16" />
    </div>

    <span :class="['text-slate-50', isLarge ? 'text-xl' : 'text-sm font-bold']">
      Agentic AI
    </span>
  </component>
</template>
