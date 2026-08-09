import SectionTitle from "../ui/SectionTitle";
import SectionBadge from "../ui/SectionBadge";
import steps from "../../data/steps";

function About() {
  return (
    <section id="about-section" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* En-tête centré */}
        <div className="text-center">
          {/* Eyebrow */}
          <SectionBadge className="mb-6">What is Agentic AI?</SectionBadge>

          {/* Title */}
          <SectionTitle highlight="It acts with purpose">
            AI that does more than answer
          </SectionTitle>
        </div>
        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-sm text-slate-300 md:text-base">
          Agentic AI refers to artificial intelligence systems designed to
          pursue goals, make decisions, use tools, and adapt their actions
          across multiple steps. Instead of only responding to a single prompt,
          an AI agent can break down a task, plan a strategy, execute actions,
          evaluate results, and continue until the objective is reached.
        </p>

        {/* Grille : carte comparaison + steps */}
        <div className="mt-12 grid grid-cols-1 items-center gap-8 text-left md:grid-cols-2">
          {/* Carte comparaison */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
            {/* Bloc 1 : Traditional AI */}
            <h3 className="text-lg font-semibold text-slate-50">
              Traditional AI
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Responds to direct instructions, generates content, answers
              questions, or analyzes information within a limited interaction.
            </p>

            <hr className="my-6 border-slate-800" />

            {/* Bloc 2 : Agentic AI */}
            <h3 className="text-lg font-semibold text-violet-300">
              Agentic AI
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Understands a goal, chooses actions, uses external tools, follows
              a plan, and adjusts its behavior based on feedback.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {/* Colonne pastille + trait */}
                <div className="flex flex-col items-center">
                  {/* Pastille numéro */}
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-slate-50 shadow-lg shadow-violet-500/40">
                    {step.number}
                  </div>
                  {/* Trait vertical (sauf dernière étape) */}
                  {index < steps.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-slate-800" />
                  )}
                </div>

                {/* Texte */}
                <div>
                  <h3 className="font-semibold text-slate-50">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
