import FeatureCard from "../components/FeatureCard";
import features from "../data/features";

function Features() {
  return (
    <section id="features-section" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* En-tête centré */}
        <div className="text-center">
          {/* Eyebrow */}
          <p className="mb-6 inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
            ♦ Features ♦
          </p>

          {/* Title */}
          <h2 className="text-4xl leading-none font-black tracking-tight md:text-5xl">
            <span className="block text-slate-50">
              Everything You Need to Build
            </span>
            <span className="block text-violet-300">
              With powerful AI agents
            </span>
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
