<script setup>
import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import steps from "../../data/steps";
</script>

<template>
  <section
    id="about-section"
    class="bg-black py-24"
  >
    <div class="mx-auto max-w-6xl px-6">
      <!-- En-tete centre -->
      <div class="text-center">
        <SectionBadge class="mb-6">
          What is Agentic AI?
        </SectionBadge>

        <SectionTitle highlight="It acts with purpose">
          AI that does more than answer
        </SectionTitle>
      </div>

      <p class="mx-auto mt-6 max-w-2xl text-sm text-slate-300 md:text-base">
        Agentic AI refers to artificial intelligence systems designed to pursue
        goals, make decisions, use tools, and adapt their actions across
        multiple steps. Instead of only responding to a single prompt, an AI
        agent can break down a task, plan a strategy, execute actions, evaluate
        results, and continue until the objective is reached.
      </p>

      <!-- Grille : carte comparaison + steps -->
      <div
        class="mt-12 grid grid-cols-1 items-center gap-8 text-left md:grid-cols-2"
      >
        <!-- Carte comparaison -->
        <div
          class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
        >
          <h3 class="text-lg font-semibold text-slate-50">
            Traditional AI
          </h3>
          <p class="mt-2 text-sm text-slate-500">
            Responds to direct instructions, generates content, answers
            questions, or analyzes information within a limited interaction.
          </p>

          <hr class="my-6 border-slate-800">

          <h3 class="text-lg font-semibold text-violet-300">
            Agentic AI
          </h3>
          <p class="mt-2 text-sm text-slate-500">
            Understands a goal, chooses actions, uses external tools, follows a
            plan, and adjusts its behavior based on feedback.
          </p>
        </div>

        <!-- Steps -->
        <div class="flex flex-col">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            class="relative flex gap-4 pb-8 last:pb-0"
          >
            <!-- Colonne pastille + trait -->
            <div class="flex flex-col items-center">
              <div
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-slate-50 shadow-lg shadow-violet-500/40"
              >
                {{ step.number }}
              </div>

              <!-- Trait vertical, sauf sur la derniere etape -->
              <div
                v-if="index < steps.length - 1"
                class="mt-2 w-px flex-1 bg-slate-800"
              />
            </div>

            <div>
              <h3 class="font-semibold text-slate-50">
                {{ step.title }}
              </h3>
              <p class="mt-1 text-sm text-slate-500">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
