import { BrainCircuit } from 'lucide-react';

function Header() {
    return (
        <header className="bg-slate-950 sticky top-0 left-0 right-0">
            <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">

                // Logo + Titre
                <div className='flex items-center gap-2 text-slate-50'>
                    <div className='p-2 rounded-lg bg-violet-500 shadow-violet-500/40'>
                        <BrainCircuit />
                    </div>
                    <span className="text-xl text-slate-50">Agentic AI</span>
                </div>
                <div className="flex items-center gap-6">

                    // Navbar
                    <nav className='hidden md:flex'>
                        <ul className="flex gap-6 list-none text-slate-500">
                            <li><a href="#about-section">About</a></li>
                            <li><a href="#features-section">Features</a></li>
                            <li><a href="#insights-section">Insights</a></li>
                            <li><a href="#contact-section">Contact</a></li>
                        </ul>
                    </nav>

                    // CTA
                    <button className="px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40 text-slate-50">Enroll now</button>
                </div>
            </div>
        </header>
    );
}

export default Header;