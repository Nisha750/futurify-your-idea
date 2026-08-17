import { ArrowRight } from "lucide-react";
import { Action, Eyebrow, Reveal, Section, SectionHeading } from "./ui";

const STEPS = [
  { n: "01", t: "Idea", d: "Describe the business you're imagining in a sentence." },
  { n: "02", t: "Business DNA", d: "FUTURA reads its personality, audience and feeling." },
  { n: "03", t: "Brand", d: "An identity direction: name, palette, type, materials." },
  { n: "04", t: "Product", d: "Configure the signature offer and see it respond." },
  { n: "05", t: "Digital experience", d: "A conceptual website, social presence and world to walk through." },
  { n: "06", t: "Blueprint", d: "One document that maps idea to launch — then we build it." },
];

const SERVICES = [
  "AI-Powered Websites",
  "Interactive Web Applications",
  "AI Integrations",
  "Business Dashboards",
  "Automation",
  "Data Applications",
  "E-commerce Experiences",
  "Custom Digital Products",
];

const PROJECTS = [
  {
    name: "AURA",
    sub: "AI Aesthetic Studio",
    problem: "Visual direction is hard to articulate before design work begins.",
    concept: "A studio that turns a mood into a coherent aesthetic system.",
    solution: "Prompt-driven aesthetic boards with palette, type and imagery direction.",
    tech: "React · TypeScript · LLM APIs",
    experience: "Fast, tactile, visual-first exploration.",
  },
  {
    name: "TRUSTLENS",
    sub: "AI Trust & Risk Analysis",
    problem: "Signals of risk are scattered across unstructured content.",
    concept: "A lens that scores and explains trust signals in plain language.",
    solution: "Analysis pipeline with explainable scoring and review workflow.",
    tech: "Python · ML · APIs",
    experience: "Clear, evidence-linked, decision-ready.",
  },
  {
    name: "CULINA AI",
    sub: "Intelligent Cooking Platform",
    problem: "Recipes rarely adapt to what's actually in the kitchen.",
    concept: "A cooking companion that plans around constraints.",
    solution: "Ingredient-aware generation with structured, stepwise guidance.",
    tech: "React · Python · LLM APIs",
    experience: "Conversational, calm, genuinely useful mid-task.",
  },
  {
    name: "BANKWISE",
    sub: "Machine Learning Business Intelligence",
    problem: "Operational data sits unused in spreadsheets and exports.",
    concept: "A business intelligence layer with predictive views.",
    solution: "Modelling pipeline plus dashboards for segments and trends.",
    tech: "Python · SQL · Data Analytics",
    experience: "Dense where it matters, quiet everywhere else.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionHeading
          eyebrow="How it works"
          title="Idea in. Experience out."
          lede="Six moves from a sentence to a project blueprint you can actually build from."
        />
      </Reveal>
      <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-hairline bg-border sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 60}>
            <div className="h-full bg-background p-8">
              <p className="font-mono text-[0.62rem] tracking-[0.2em] text-accent">{s.n}</p>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Conversion() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="From concept to product"
          title="Your idea is only the beginning."
          lede="FUTURA helps you visualize what's possible. Nisha can help turn that concept into a real digital product."
        />
      </Reveal>
      <Reveal delay={100}>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-hairline bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <li key={s} className="bg-background p-7">
              <p className="font-display text-xl leading-snug tracking-tight">{s}</p>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={160}>
        <div className="mt-10 flex flex-wrap gap-4">
          <Action href="#contact">
            Start a project <ArrowRight className="size-3.5" />
          </Action>
          <Action href="#work" variant="line">
            Explore my work
          </Action>
        </div>
      </Reveal>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Meet the developer behind FUTURA."
            lede="“I build modern digital experiences that combine artificial intelligence, web development, data and thoughtful user experience.”"
          />
          <div className="mt-8">
            <p className="font-display text-3xl tracking-tight">Nisha H</p>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              AI &amp; Web Developer
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Python", "JavaScript", "React", "AI/ML", "SQL", "Data Analytics", "APIs", "Web Development"].map(
              (s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ),
            )}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="glass relative flex aspect-square items-center justify-center rounded-md">
            {[
              { l: "AI", x: "50%", y: "18%" },
              { l: "DESIGN", x: "82%", y: "50%" },
              { l: "CODE", x: "50%", y: "82%" },
              { l: "DATA", x: "18%", y: "50%" },
            ].map((n) => (
              <span
                key={n.l}
                className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground"
                style={{ left: n.x, top: n.y }}
              >
                {n.l}
              </span>
            ))}
            <div className="float-slow size-40 rounded-full border border-hairline sm:size-56" />
            <div className="absolute size-24 rounded-full border border-accent/40 sm:size-32" />
            <span className="absolute font-display text-xl tracking-[0.3em]">FUTURA</span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Work() {
  return (
    <Section id="work">
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Independent projects."
          lede="Built to explore what AI, data and interface can do together."
        />
      </Reveal>
      <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-hairline bg-border md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <article className="h-full bg-background p-8 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-4xl tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.sub}</p>
                </div>
                <span className="rounded-full border border-border px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Independent project
                </span>
              </div>
              <dl className="mt-8 space-y-4">
                {[
                  ["Problem", p.problem],
                  ["Concept", p.concept],
                  ["Solution", p.solution],
                  ["Technology", p.tech],
                  ["Experience", p.experience],
                ].map(([k, v]) => (
                  <div key={k} className="hairline-t pt-4">
                    <Eyebrow>{k}</Eyebrow>
                    <dd className="mt-1.5 text-sm leading-relaxed text-foreground/85">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <Action href="#contact" variant="line">
                  View project <ArrowRight className="size-3.5" />
                </Action>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
