import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo />
        <span className="text-xs font-semibold bg-brand-light text-brand px-3 py-1.5 rounded-full tracking-wide">
          Launching soon
        </span>
      </nav>
    </header>
  );
}
