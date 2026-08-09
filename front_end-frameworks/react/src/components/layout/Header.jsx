import Button from "../ui/Button";
import Brand from "../ui/Brand";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-slate-950">
      <div className="mx-auto flex items-center justify-between px-4 py-4 md:px-8 lg:px-20">
        {/* Logo + Titre */}
        <Brand size="lg" />
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
          <Button>Enroll now</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
