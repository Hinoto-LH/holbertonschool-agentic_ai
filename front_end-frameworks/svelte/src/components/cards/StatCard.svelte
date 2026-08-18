<script>
  /**
   * Une carte de statistique du Hero : un chiffre mis en avant,
   * son intitulé en dessous. Style guide §6, « Statistics card ».
   */
  let { value, label } = $props();
</script>

<div
  class="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/40"
>
  <p class="text-3xl font-bold text-violet-300">{value}</p>
  <p class="text-sm text-slate-500">{label}</p>
</div>
