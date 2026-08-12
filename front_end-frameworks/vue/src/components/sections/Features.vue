<script setup>
import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import FeatureCard from "../cards/FeatureCard.vue";
import features from "../../data/features";
</script>

<template>
  <section
    id="features-section"
    class="bg-black py-24"
  >
    <div class="mx-auto max-w-6xl px-6">
      <!-- En-tete centre -->
      <div class="text-center">
        <SectionBadge class="mb-6">
          Features
        </SectionBadge>

        <SectionTitle highlight="With powerful AI agents">
          Everything You Need to Build
        </SectionTitle>
      </div>

      <!-- Grille -->
      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </div>
  </section>
</template>
