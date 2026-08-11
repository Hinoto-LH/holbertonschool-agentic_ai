<script setup>
import { BrainCircuit } from "lucide-vue-next";
</script>

<template>
  <main
    class="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950"
  >
    <BrainCircuit
      :size="48"
      class="text-violet-500"
    />
    <h1 class="text-4xl font-black tracking-tight text-slate-50 md:text-5xl">
      Agentic AI
    </h1>
    <h2 class="text-xl text-slate-300">
      Holberton School
    </h2>
  </main>
</template>
