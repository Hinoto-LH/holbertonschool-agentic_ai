import { BrainCircuit } from "lucide-react";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-slate-950">
      <div className="mx-auto flex items-center justify-between px-4 py-4 md:px-8 lg:px-20">
        {/* Logo + Titre */}
        <div className="flex items-center gap-2 text-slate-50">
          <div className="rounded-lg bg-violet-500 p-2 shadow-violet-500/40">
            <BrainCircuit />
          </div>
          <span className="text-xl text-slate-50">Agentic AI</span>
        </div>
        <div className="flex items-center gap-6">
          {/* Navbar */}
          <nav className="hidden md:flex">
            <ul className="flex list-none gap-6 text-slate-500">
              <li>
                <a href="#about-section">About</a>
              </li>
              <li>
                <a href="#features-section">Features</a>
              </li>
              <li>
                <a href="#insights-section">Insights</a>
              </li>
              <li>
                <a href="#contact-section">Contact</a>
              </li>
            </ul>
          </nav>

          {/* CTA */}
          <button className="rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 shadow-lg shadow-violet-500/40 hover:bg-violet-600">
            Enroll now
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
