import StatCard from "../cards/StatCard";
import stats from "../../data/stats";
import Button from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";
import SectionBadge from "../ui/SectionBadge";
import { ArrowRight } from "lucide-react";

function Hero() {
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
        <SectionBadge className="m-10">The future of coding</SectionBadge>

        {/* Title */}
        <SectionTitle as="h1" size="lg" className="pb-10" highlight="with Agentic AI">
          Build smarter workflows
        </SectionTitle>

        {/* Description */}
        <p className="pb-10 text-sm text-slate-300 md:text-base">
          Create autonomous AI agents that think, plan, and execute complex
          tasks. Transform your business with intelligent automation
        </p>

        {/* CTA / Button */}
        <div className="flex flex-col items-center justify-center gap-4 pb-20 sm:flex-row">
          <Button href="#">
            Start learning with Holberton School <ArrowRight size={18} />
          </Button>

          <Button href="#" variant="secondary">
            Methodology
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 pb-10 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
