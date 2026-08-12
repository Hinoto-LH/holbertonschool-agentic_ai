<script setup>
import { ref, onMounted } from "vue";

import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import InsightCard from "../cards/InsightCard.vue";
import getInsights from "../../services/insightsService";

// ref remplace useState : une reference reactive dont on lit et ecrit
// la propriete .value dans le script (mais pas dans le template).
const insights = ref([]);
const erreur = ref("");

// onMounted remplace useEffect(..., []) : execute une fois, apres le montage.
// Il accepte directement une fonction async, contrairement a useEffect.
onMounted(async () => {
  try {
    insights.value = await getInsights();
  } catch (error) {
    erreur.value = "Unable to load the insights.";
    console.error(error);
  }
});
</script>

<template>
  <section
    id="insights-section"
    class="bg-black py-24"
  >
    <div class="mx-auto max-w-6xl px-6">
      <!-- En-tete centre -->
      <div class="text-center">
        <SectionBadge class="mb-6">
          Insights
        </SectionBadge>

        <SectionTitle highlight="Through real-world scenes">
          Explore Agentic AI
        </SectionTitle>
      </div>

      <!-- Zone de message d'erreur -->
      <p
        v-if="erreur"
        class="text-sm text-slate-50"
      >
        {{ erreur }}
      </p>

      <!-- Grille -->
      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <InsightCard
          v-for="(insight, index) in insights"
          :key="insight.category"
          :index="index"
          :image="insight.image"
          :category="insight.category"
          :title="insight.title"
          :description="insight.description"
        />
      </div>
    </div>
  </section>
</template>
