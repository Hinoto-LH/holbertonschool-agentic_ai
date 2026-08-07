function InsightCard({ image, title, description, category, index }) {
  return (
    <article className={`group ${index === 0 ? "sm:col-span-2" : ""} relative min-h-80 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40`}>
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black "></div>
      <div className="relative z-10 min-h-80  p-6 justify-end items-start text-start flex flex-col">
        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
          {category}
        </span>
        <h3 className="text-2xl mt-2 text-slate-50 font-bold">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      </div>
    </article>
  );
}

export default InsightCard;
