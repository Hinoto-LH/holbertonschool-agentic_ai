import { ArrowRight } from "lucide-react";

function Hero() {
  const stats = [
    { value: "10K+", label: "Active agents" },
    { value: "99.9%", label: "Uptime" },
    { value: "50M+", label: "Tasks automated" },
    { value: "24/7", label: "Support" },
  ];
  return (
    <section
      id="hero-section"
      className="relative isolate overflow-hidden bg-slate-950 pt-36 pb-24"
    >
      {/* Couche 1 : Glow violette */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_10%_20%,rgba(139,92,246,0.25),transparent)]" />

      {/* Glow bleu */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_90%_50%,rgba(56,189,248,0.18),transparent)]" />

      {/* Couche 2 : grille  */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Vignette */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.6))]" />

      {/* Contenu (par-dessus les calques) */}
      <div className="relative mx-auto max-w-6xl text-center">
        {/* Eyebrow */}
        <p className="m-10 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
          <span aria-hidden="true" className="text-[8px]">
            ✦
          </span>
          The future of coding
          <span aria-hidden="true" className="text-[8px]">
            ✦
          </span>
        </p>

        {/* Title */}
        <h1 className="pb-10 text-5xl leading-none font-black tracking-tight md:text-7xl">
          <span className="block text-slate-50">Build smarter workflows</span>
          <span className="block text-violet-300">with Agentic AI</span>
        </h1>

        {/* Description */}
        <p className="pb-10 text-sm text-slate-300 md:text-base">
          Create autonomous AI agents that think, plan, and execute complex
          tasks. Transform your business with intelligent automation
        </p>

        {/* CTA / Button */}
        <div className="flex flex-col items-center justify-center gap-4 pb-20 sm:flex-row">
          <a
            href="#"
            className="inline-flex gap-2 rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 shadow-lg shadow-violet-500/40 hover:bg-violet-600"
          >
            Start learning with Holberton School <ArrowRight size={18} />
          </a>

          <a
            href="#"
            className="inline-flex rounded-md border border-slate-800 bg-slate-950 px-4 py-2 font-semibold text-slate-50 hover:bg-slate-900"
          >
            Methodology
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 pb-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/40"
            >
              <p className="text-3xl font-bold text-violet-300">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
