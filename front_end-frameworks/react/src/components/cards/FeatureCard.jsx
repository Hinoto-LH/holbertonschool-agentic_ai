function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
      {/* Pastille numéro */}
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 text-slate-50 shadow-lg shadow-violet-500/40">
        <Icon size={20} />
      </div>
      {/* Titre */}
      <h3 className="mt-4 text-sm font-bold text-slate-50">{title}</h3>
      {/* Texte */}
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </article>
  );
}

export default FeatureCard;
