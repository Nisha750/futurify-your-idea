import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight } from "lucide-react";
import { generateConceptFn } from "@/lib/futura/concept.functions";
import { generateConcept } from "@/lib/futura/generator";
import type { Concept, IdeaInput, Remix, Tone } from "@/lib/futura/types";
import { ConceptSections } from "./ConceptSections";
import { Action, AiBadge, Chip, Eyebrow, Reveal, Section, SectionHeading } from "./ui";

const IDEA_CHIPS = [
  "Luxury café",
  "Boutique hotel",
  "Fashion brand",
  "AI startup",
  "Interior studio",
  "Restaurant",
  "Creative agency",
  "Online store",
];

const TONES: Tone[] = [
  "Luxury",
  "Minimal",
  "Playful",
  "Elegant",
  "Traditional",
  "Futuristic",
  "Warm",
  "Bold",
];

const AUDIENCES = [
  "Young professionals",
  "Families",
  "Creators",
  "Tourists",
  "Premium customers",
  "Students",
  "Businesses",
];

const PRIORITIES = [
  "Brand",
  "Growth",
  "Sales",
  "Customer experience",
  "Automation",
  "Online presence",
];

export function Experience() {
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState<Tone>("Luxury");
  const [audience, setAudience] = useState(AUDIENCES[0]!);
  const [priority, setPriority] = useState(PRIORITIES[0]!);
  const [status, setStatus] = useState<"idle" | "building" | "ready">("idle");
  const [concept, setConcept] = useState<Concept | null>(null);
  const [mode, setMode] = useState<"demo" | "ai">("demo");
  const [remix, setRemix] = useState<Remix | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const generate = useServerFn(generateConceptFn);

  const run = useCallback(
    async (input: IdeaInput, nextRemix?: Remix) => {
      setStatus("building");
      setError(null);
      const base = generateConcept(input, nextRemix);
      let next: Concept = base;
      let nextMode: "demo" | "ai" = "demo";
      try {
        const res = await generate({
          data: { ...input, ...(nextRemix ? { remix: nextRemix } : {}) },
        });
        if (res.mode === "ai" && res.overlay) {
          nextMode = "ai";
          next = { ...base, ...res.overlay, source: "ai" } as Concept;
        }
      } catch {
        setError("Live generation unavailable — showing demo mode output.");
      }
      await new Promise((r) => setTimeout(r, 1400));
      setConcept(next);
      setMode(nextMode);
      setStatus("ready");
    },
    [generate],
  );

  useEffect(() => {
    if (status === "ready" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const build = () => {
    if (idea.trim().length < 4) {
      setError("Describe your idea in a few words to continue.");
      return;
    }
    setRemix(undefined);
    void run({ idea, tone, audience, priority });
  };

  const applyRemix = (r: Remix) => {
    setRemix(r);
    void run({ idea, tone, audience, priority }, r);
  };

  return (
    <>
      <Section id="experience" className="grain">
        <Reveal>
          <SectionHeading
            eyebrow="Idea Portal"
            title="Start with an idea."
            lede="Tell FUTURA what you're imagining."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="glass mt-12 rounded-md p-6 sm:p-10">
            <label htmlFor="futura-idea" className="eyebrow">
              Your idea
            </label>
            <textarea
              id="futura-idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={3}
              maxLength={400}
              placeholder="I want to build a…"
              className="mt-4 w-full resize-none bg-transparent font-display text-2xl leading-snug tracking-tight text-foreground outline-none placeholder:text-muted-foreground/60 sm:text-4xl"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Example: “A luxury Italian restaurant with a modern cinematic atmosphere.”
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {IDEA_CHIPS.map((c) => (
                <Chip key={c} label={c} onClick={() => setIdea(`I want to build a ${c.toLowerCase()}`)} />
              ))}
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <fieldset>
                <legend className="eyebrow">What should it feel like?</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TONES.map((t) => (
                    <Chip key={t} label={t} active={tone === t} onClick={() => setTone(t)} />
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="eyebrow">Who is it for?</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {AUDIENCES.map((a) => (
                    <Chip key={a} label={a} active={audience === a} onClick={() => setAudience(a)} />
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="eyebrow">What matters most?</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {PRIORITIES.map((p) => (
                    <Chip key={p} label={p} active={priority === p} onClick={() => setPriority(p)} />
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Action onClick={build} disabled={status === "building"}>
                {status === "building" ? "Shaping…" : "Build my future"}
                <ArrowRight className="size-3.5" />
              </Action>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                {mode === "ai" && status === "ready" ? "Live AI generation" : "Demo mode — sample concept output"}
              </span>
            </div>
            {error ? (
              <p role="alert" className="mt-4 text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        </Reveal>

        {status === "building" ? (
          <div className="mt-10 flex flex-col items-center gap-4 py-16 text-center" aria-live="polite">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 animate-pulse rounded-full bg-accent"
                  style={{ animationDelay: `${i * 180}ms` }}
                />
              ))}
            </div>
            <p className="font-display text-3xl tracking-tight sm:text-4xl">
              FUTURA is shaping your concept…
            </p>
            <AiBadge />
          </div>
        ) : null}
      </Section>

      <div ref={resultRef} />

      {concept && status === "ready" ? (
        <ConceptSections
          concept={concept}
          mode={mode}
          remix={remix}
          onRemix={applyRemix}
          onRegenerate={() => void run({ idea, tone, audience, priority }, remix)}
        />
      ) : null}
    </>
  );
}
