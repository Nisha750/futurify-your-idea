import { ArrowRight } from "lucide-react";
import { HeroScene } from "./HeroScene";
import { Action, Reveal } from "./ui";

export function Hero() {
  return (
    <section id="top" className="grain relative flex min-h-[100svh] items-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-veil)" }}
        aria-hidden
      />
      <HeroScene />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-36 sm:px-10">
        <Reveal>
          <p className="eyebrow">AI • Design • Web • Digital Experiences</p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-8 max-w-4xl text-balance text-[2.6rem] leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            Don't just
            <br />
            imagine your business.
            <br />
            <span className="metal-text">Experience it.</span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            FUTURA transforms your business idea into an interactive digital concept — from brand
            identity and products to customer experience and digital presence.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Action href="#experience">
              Create my future <ArrowRight className="size-3.5" />
            </Action>
            <Action href="#how-it-works" variant="line">
              Explore FUTURA
            </Action>
          </div>
        </Reveal>

        <Reveal delay={420}>
          <div className="mt-20 flex flex-wrap gap-x-10 gap-y-3 hairline-t pt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Idea</span>
            <span>Business DNA</span>
            <span>Brand</span>
            <span>Product</span>
            <span>Digital experience</span>
            <span>Blueprint</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
