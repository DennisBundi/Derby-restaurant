import WaitlistForm from "./WaitlistForm";

export default function HeroSection() {
  return (
    <section className="relative bg-white min-h-screen flex items-center px-4 sm:px-6 overflow-hidden">

      {/* Decorative background blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-light rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-brand-light rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center gap-5 py-16">

        {/* Eyebrow */}
        <span className="animate-fade-in-up delay-100 inline-flex items-center gap-2 text-xs font-semibold bg-brand-light text-brand px-4 py-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block animate-pulse-dot" />
          AI Product Photography — Launching Soon
        </span>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-200 text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy leading-[1.15]">
          Skip the model.{" "}
          <span className="text-brand">Skip the studio.</span>
          {" "}Just great product photos.
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up delay-300 text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed">
          Upload your product and ShelfReady&apos;s AI places it on a realistic
          model, in a professional lifestyle scene — ready in seconds.
          Used by online sellers worldwide.
        </p>

        {/* Form */}
        <div className="animate-fade-in-up delay-400 w-full flex justify-center">
          <WaitlistForm />
        </div>

        {/* Trust line */}
        <p className="animate-fade-in delay-500 text-xs text-gray-400 flex items-center gap-2">
          <span>No credit card required</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
          <span>Free early access</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
          <span>Cancel anytime</span>
        </p>

        {/* Scroll indicator */}
        <div className="animate-fade-in delay-500 flex flex-col items-center gap-1 mt-4">
          <span className="text-[10px] text-gray-300 uppercase tracking-widest">Scroll</span>
          <svg className="animate-bounce" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </div>
    </section>
  );
}
