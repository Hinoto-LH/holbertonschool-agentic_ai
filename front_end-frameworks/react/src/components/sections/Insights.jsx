import SectionTitle from "../ui/SectionTitle";
import SectionBadge from "../ui/SectionBadge";
import { useState, useEffect } from "react";
import InsightCard from "../cards/InsightCard";
import getInsights from "../../services/insightsService";


function Insights() {
    const [insights, setInsights] = useState([]);
    const [erreur, setErreur] = useState("");

    useEffect(() => {
        async function charger() {
            try {
                const data = await getInsights();
                setInsights(data);
            } catch (error) {
                setErreur("Unable to load the insights.");
                console.error(error);
            }
        }
        charger();
    }, []);

    return (
        <section id="insights-section" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* En-tête centré */}
        <div className="text-center">
          {/* Eyebrow */}
          <SectionBadge className="mb-6">Insights</SectionBadge>

          {/* Title */}
          <SectionTitle highlight="Through real-world scenes">
            Explore Agentic AI
          </SectionTitle>
        </div>

        {erreur && <p className="text-slate-50 text-sm ">{erreur}</p>}
        {/* Insights */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, index) => (
            <InsightCard
              key={insight.category}
              index={index}
              image={insight.image}
              category={insight.category}
              title={insight.title}
              description={insight.description}
            />
          ))}
        </div>
      </div>
    </section>
    );
}

export default Insights;