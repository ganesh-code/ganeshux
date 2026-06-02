import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Divider */}
      <div className="container-custom">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      <Work />

      <div className="container-custom">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      <About />

      <div className="container-custom">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      <Contact />

      {/* Grain texture overlay */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
