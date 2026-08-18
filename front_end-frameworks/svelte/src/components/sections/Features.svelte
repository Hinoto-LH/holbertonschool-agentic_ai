<script>
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
  import FeatureCard from "../cards/FeatureCard.svelte";
  import features from "../../data/features.js";
</script>

<section id="features-section" class="bg-black py-24">
  <div class="mx-auto max-w-6xl px-6">
    <!-- En-tête centré -->
    <div class="text-center">
      <!-- Eyebrow -->
      <SectionBadge class="mb-6">Features</SectionBadge>

      <!-- Title -->
      <SectionTitle highlight="With powerful AI agents">
        Everything You Need to Build
      </SectionTitle>
    </div>

    <!-- Features -->
    <div class="mt-12 grid gap-8 md:grid-cols-3">
      {#each features as feature (feature.title)}
        <FeatureCard
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      {/each}
    </div>
  </div>
</section>
