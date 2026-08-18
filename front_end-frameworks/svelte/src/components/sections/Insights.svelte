<script>
  import { onMount } from "svelte";

  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
  import InsightCard from "../cards/InsightCard.svelte";
  import getInsights from "../../services/insightsService.js";

  let insights = $state([]);
  let erreur = $state("");

  // onMount remplace useEffect(..., []) : execute une fois, apres l'insertion
  // dans le DOM. Le callback peut etre async directement, ce que React
  // interdisait — d'ou la fonction `charger()` imbriquee dans la version JSX.
  onMount(async () => {
    try {
      insights = await getInsights();
    } catch (error) {
      erreur = "Unable to load the insights.";
      console.error(error);
    }
  });
</script>

<section id="insights-section" class="bg-black py-24">
  <div class="mx-auto max-w-6xl px-6">
    <!-- En-tête centré -->
    <div class="text-center">
      <!-- Eyebrow -->
      <SectionBadge class="mb-6">Insights</SectionBadge>

      <!-- Title -->
      <SectionTitle highlight="Through real-world scenes">
        Explore Agentic AI
      </SectionTitle>
    </div>

    {#if erreur}
      <p class="text-sm text-slate-50">{erreur}</p>
    {/if}

    <!-- Insights -->
    <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {#each insights as insight, index (insight.category)}
        <InsightCard
          {index}
          image={insight.image}
          category={insight.category}
          title={insight.title}
          description={insight.description}
        />
      {/each}
    </div>
  </div>
</section>
