<script>
  import { BrainCircuit } from "@lucide/svelte";

  /**
   * Le logo « Agentic AI », partagé par le header et le footer.
   *
   * - `size` : "lg" pour le header, "sm" (défaut) pour le footer.
   * - `href` : optionnel. Fourni, la marque devient un lien cliquable ;
   *   absent, un simple conteneur.
   */
  let { href, size = "sm", class: className = "" } = $props();

  // $derived et non const : une constante ne capturerait que la valeur
  // initiale de `size`, ce que le compilateur signale explicitement.
  let isLarge = $derived(size === "lg");
</script>

<!--
  En JSX, `Wrapper` en majuscule etait resolu vers la chaine "a" ou "div".
  Svelte n'a pas cette regle : <svelte:element this> recoit le nom de la
  balise, exactement comme dans Button.
-->
<svelte:element this={href ? "a" : "div"} {href} class={["flex items-center gap-2", className]}>
  <div
    class={[
      "flex items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40",
      isLarge ? "p-2" : "h-7 w-7",
    ]}
  >
    <BrainCircuit size={16} />
  </div>

  <span class={["text-slate-50", isLarge ? "text-xl" : "text-sm font-bold"]}>
    Agentic AI
  </span>
</svelte:element>
