import { useState, useEffect } from "react";
import InsightCard from "../components/InsightCard";
import getInsights from "../services/insightsService";


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
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
            <span aria-hidden="true" className="text-[8px]">
              ✦
            </span>
            Insights
            <span aria-hidden="true" className="text-[8px]">
              ✦
            </span>
          </p>

          {/* Title */}
          <h2 className="text-4xl leading-none font-black tracking-tight md:text-5xl">
            <span className="block text-slate-50">
              Explore Agentic AI
            </span>
            <span className="block text-violet-300">
              Through real-world scenes
            </span>
          </h2>
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