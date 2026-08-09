import SectionTitle from "../ui/SectionTitle";
import SectionBadge from "../ui/SectionBadge";
import FeatureCard from "../cards/FeatureCard";
import features from "../../data/features";

function Features() {
  return (
    <section id="features-section" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* En-tête centré */}
        <div className="text-center">
          {/* Eyebrow */}
          <SectionBadge className="mb-6">Features</SectionBadge>

          {/* Title */}
          <SectionTitle highlight="With powerful AI agents">
            Everything You Need to Build
          </SectionTitle>
        </div>
        {/* Features */}
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
