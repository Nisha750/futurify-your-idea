import { useMemo, useState } from "react";
import { ArrowRight, Check, Download, RefreshCw, Save, Shuffle } from "lucide-react";
import type { Concept, Remix } from "@/lib/futura/types";
import { REMIX_OPTIONS } from "@/lib/futura/generator";
import { Action, AiBadge, Chip, Eyebrow, Reveal, Section, SectionHeading } from "./ui";
import { cn } from "@/lib/utils";

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("glass rounded-md p-6 sm:p-8", className)}>{children}</div>;
}

function Attr({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="hairline-t py-5">
      <Eyebrow>{label}</Eyebrow>
      <p className="mt-2 font-display text-2xl leading-snug tracking-tight sm:text-3xl">
        {values.join(" · ")}
      </p>
    </div>
  );
}

function BusinessDna({ concept }: { concept: Concept }) {
  return (
    <Section id="business-dna">
      <Reveal>
        <SectionHeading
          eyebrow="Business DNA"
          title="Your business has a personality."
          lede="Every idea carries a temperament. This is how FUTURA reads yours."
        />
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-12 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <Panel>
            <AiBadge />
            <div className="mt-6">
              <Attr label="Concept" values={[concept.businessConcept]} />
              <Attr label="Personality" values={concept.brandPersonality} />
              <Attr label="Audience" values={concept.targetAudience} />
              <Attr label="Experience" values={concept.experience} />
              <Attr label="Visual direction" values={[concept.visualDirection]} />
            </div>
          </Panel>
          <Panel className="flex flex-col justify-between gap-8">
            <div>
              <Eyebrow>Signal map</Eyebrow>
              <div className="mt-6 space-y-5">
                {[
                  { k: "Craft", v: 92 },
                  { k: "Warmth", v: concept.brandPersonality.includes("Warm") ? 88 : 64 },
                  { k: "Restraint", v: concept.brandPersonality.includes("Minimal") ? 94 : 72 },
                  { k: "Innovation", v: concept.brandPersonality.includes("Futuristic") ? 95 : 70 },
                ].map((r) => (
                  <div key={r.k}>
                    <div className="flex justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                      <span>{r.k}</span>
                      <span>{r.v}</span>
                    </div>
                    <div className="mt-2 h-px w-full bg-border">
                      <div
                        className="h-px bg-accent transition-all duration-1000"
                        style={{ width: `${r.v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              A directional read of the concept, not verified market research.
            </p>
          </Panel>
        </div>
      </Reveal>
    </Section>
  );
}

function BrandStudio({
  concept,
  onRegenerate,
  onRemix,
}: {
  concept: Concept;
  onRegenerate: () => void;
  onRemix: () => void;
}) {
  return (
    <Section id="brand-studio">
      <Reveal>
        <SectionHeading
          eyebrow="Brand Studio"
          title="Your brand, visualized."
          lede="A conceptual identity direction you can push in any direction."
        />
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Panel className="lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Eyebrow>Brand name</Eyebrow>
                <h3 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">
                  {concept.brandName}
                </h3>
                <p className="mt-3 text-muted-foreground">{concept.tagline}</p>
              </div>
              <AiBadge />
            </div>

            <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {[
                ["Logo direction", concept.logoDirection],
                ["Typography", `${concept.typography.display} / ${concept.typography.body} — ${concept.typography.note}`],
                ["Packaging", concept.packagingDirection],
                ["Storefront", concept.storefrontDirection],
                ["Social", concept.socialDirection],
                ["Visual direction", concept.visualDirection],
              ].map(([k, v]) => (
                <div key={k} className="hairline-t pt-4">
                  <Eyebrow>{k}</Eyebrow>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">{v}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="flex flex-col">
            <Eyebrow>Colour system</Eyebrow>
            <div className="mt-5 grid gap-3">
              {concept.palette.map((c) => (
                <div key={c.hex} className="flex items-center gap-4">
                  <span
                    className="size-12 rounded-sm border border-hairline"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm">{c.name}</p>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                      {c.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Action variant="line" onClick={onRegenerate}>
                <RefreshCw className="size-3.5" /> Regenerate
              </Action>
              <Action variant="line" onClick={onRemix}>
                <Shuffle className="size-3.5" /> Remix
              </Action>
            </div>
          </Panel>
        </div>
      </Reveal>
    </Section>
  );
}

function FutureWorld({ concept }: { concept: Concept }) {
  const [active, setActive] = useState(concept.world[0]?.id ?? "store");
  const area = concept.world.find((w) => w.id === active) ?? concept.world[0]!;

  return (
    <Section id="world">
      <Reveal>
        <SectionHeading
          eyebrow="Enter your future"
          title="Step inside your future."
          lede="A miniature world of your business. Choose an area and move through it."
        />
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-12 overflow-hidden rounded-md border border-hairline">
          <div className="flex flex-wrap gap-1 border-b border-hairline bg-elevated/60 p-2">
            {concept.world.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setActive(w.id)}
                aria-pressed={active === w.id}
                className={cn(
                  "rounded-sm px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-colors",
                  active === w.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {w.label}
              </button>
            ))}
          </div>

          <div className="grain relative grid min-h-[380px] gap-8 p-8 sm:p-12 md:grid-cols-2">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(90% 70% at 30% 10%, ${concept.palette[1]!.hex}22, transparent 60%)`,
              }}
              aria-hidden
            />
            <div className="relative flex flex-col justify-center">
              <Eyebrow>{area.label}</Eyebrow>
              <h3 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
                {area.headline}
              </h3>
              <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{area.detail}</p>
              <div className="mt-6">
                <AiBadge />
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div
                key={area.id}
                className="float-slow relative aspect-4/3 w-full max-w-sm rounded-sm border border-hairline"
                style={{
                  background: `linear-gradient(135deg, ${concept.palette[0]!.hex}, ${concept.palette[3]!.hex})`,
                  boxShadow: "var(--shadow-float)",
                }}
              >
                <div className="absolute inset-6 rounded-sm border border-white/12" />
                <div
                  className="absolute bottom-8 left-8 h-2 w-24"
                  style={{ backgroundColor: concept.palette[2]!.hex }}
                />
                <div
                  className="absolute bottom-14 left-8 h-2 w-16 opacity-70"
                  style={{ backgroundColor: concept.palette[1]!.hex }}
                />
                <p className="absolute right-6 top-6 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/70">
                  {area.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function ProductStudio({ concept }: { concept: Concept }) {
  const [choices, setChoices] = useState<Record<string, string>>(() =>
    Object.fromEntries(concept.productOptions.map((o) => [o.label, o.values[0]!])),
  );
  const [saved, setSaved] = useState(false);

  const style = choices[concept.productOptions[0]?.label ?? "Style"] ?? "Minimal";
  const scale = choices[concept.productOptions[1]?.label ?? "Size"] ?? "Medium";
  const finish = choices[concept.productOptions[2]?.label ?? "Finish"] ?? "Cream";

  const size = scale.match(/large|villa|enterprise|full/i) ? 300 : scale.match(/small|room|starter|accent/i) ? 190 : 245;
  const radius = style.match(/minimal|technical/i) ? 4 : style.match(/luxury|organic|floral/i) ? 999 : 18;
  const tint =
    finish.match(/chocolate|dark|stone|timber/i)
      ? concept.palette[0]!.hex
      : finish.match(/fruit|citrus|signal|ember/i)
        ? concept.palette[1]!.hex
        : concept.palette[2]!.hex;

  return (
    <Section id="product">
      <Reveal>
        <SectionHeading
          eyebrow="Product Studio"
          title="Design what you sell."
          lede="Configure the signature offer and watch the concept respond."
        />
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel className="flex items-center justify-center">
            <div
              className="flex items-center justify-center transition-all duration-700"
              style={{
                width: size,
                height: size,
                borderRadius: radius,
                background: `linear-gradient(150deg, ${tint}, ${concept.palette[3]!.hex})`,
                boxShadow: "var(--shadow-float)",
              }}
            >
              <span className="px-6 text-center font-display text-2xl text-black/70">
                {concept.productName}
              </span>
            </div>
          </Panel>

          <Panel>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Eyebrow>Product</Eyebrow>
                <h3 className="mt-2 font-display text-3xl tracking-tight">{concept.productName}</h3>
              </div>
              <AiBadge />
            </div>

            <div className="mt-8 space-y-7">
              {concept.productOptions.map((opt) => (
                <div key={opt.label}>
                  <Eyebrow>{opt.label}</Eyebrow>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {opt.values.map((v) => (
                      <Chip
                        key={v}
                        label={v}
                        active={choices[opt.label] === v}
                        onClick={() => {
                          setChoices((c) => ({ ...c, [opt.label]: v }));
                          setSaved(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Action onClick={() => setSaved(true)}>
                {saved ? <Check className="size-3.5" /> : <Save className="size-3.5" />}
                {saved ? "Concept saved" : "Save concept"}
              </Action>
              <Action
                variant="line"
                onClick={() => {
                  setChoices(
                    Object.fromEntries(
                      concept.productOptions.map((o) => [
                        o.label,
                        o.values[Math.floor(Math.random() * o.values.length)]!,
                      ]),
                    ),
                  );
                  setSaved(false);
                }}
              >
                Try another product
              </Action>
            </div>
          </Panel>
        </div>
      </Reveal>
    </Section>
  );
}

const SITE_SECTIONS = [
  "Hero",
  "About",
  "Products",
  "Services",
  "Gallery",
  "Story",
  "Location",
  "Contact",
  "CTA",
];

function WebsitePreview({ concept }: { concept: Concept }) {
  const [active, setActive] = useState("Hero");
  const [full, setFull] = useState(false);

  const body = (
    <div className="overflow-hidden rounded-md border border-hairline bg-background">
      <div className="flex items-center gap-2 border-b border-hairline bg-elevated px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 truncate font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
          {concept.brandName.toLowerCase().replace(/\s+/g, "")}.com/{active.toLowerCase()}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-hairline px-3 py-2">
        {SITE_SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(s)}
            aria-pressed={active === s}
            className={cn(
              "rounded-sm px-3 py-2 text-xs transition-colors",
              active === s ? "text-accent" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div
        className="grain relative min-h-[340px] p-8 sm:p-12"
        style={{
          background: `linear-gradient(160deg, ${concept.palette[0]!.hex}, ${concept.palette[3]!.hex}55)`,
        }}
      >
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/60">
          {active}
        </p>
        <h3 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl">
          {active === "Hero"
            ? `${concept.brandName} — ${concept.tagline}`
            : active === "Contact"
              ? "Say hello."
              : `${active} at ${concept.brandName}`}
        </h3>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75">
          {active === "Products"
            ? `${concept.productName} and the wider range, shown with room to breathe.`
            : active === "Story"
              ? concept.customerExperience.join(" · ")
              : concept.visualDirection}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span
            className="rounded-sm px-5 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em]"
            style={{ backgroundColor: concept.palette[2]!.hex, color: concept.palette[0]!.hex }}
          >
            Primary action
          </span>
          <span className="rounded-sm border border-white/25 px-5 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/80">
            Secondary
          </span>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {concept.websiteFeatures.slice(0, 3).map((f) => (
            <div key={f} className="rounded-sm border border-white/15 bg-black/20 p-4">
              <p className="text-xs leading-relaxed text-white/80">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Section id="digital">
      <Reveal>
        <SectionHeading
          eyebrow="Digital Experience"
          title="Now give your business a digital home."
          lede="A conceptual website, section by section — clickable, not a screenshot."
        />
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-12">{body}</div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Action variant="line" onClick={() => setFull(true)}>
            Open full preview <ArrowRight className="size-3.5" />
          </Action>
          <AiBadge />
        </div>
      </Reveal>

      {full ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full website preview"
          className="fixed inset-0 z-[60] overflow-y-auto bg-background/95 p-4 backdrop-blur-lg sm:p-10"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-4 flex justify-end">
              <Action variant="line" onClick={() => setFull(false)}>
                Close preview
              </Action>
            </div>
            {body}
          </div>
        </div>
      ) : null}
    </Section>
  );
}

function SocialPresence({ concept, onNewDirection }: { concept: Concept; onNewDirection: () => void }) {
  const [campaign, setCampaign] = useState(0);
  const posts = useMemo(
    () =>
      concept.socialPosts.map((p, i) => ({
        ...p,
        caption: campaign > 0 ? `${p.caption} — campaign ${campaign}` : p.caption,
        hex: concept.palette[(i + campaign) % concept.palette.length]!.hex,
      })),
    [concept, campaign],
  );

  return (
    <Section id="social">
      <Reveal>
        <SectionHeading
          eyebrow="Social Presence"
          title="How your brand could look online."
          lede="A conceptual grid — not connected to any social platform."
        />
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="overflow-hidden rounded-md border border-hairline">
              <div
                className="grain flex aspect-square items-end p-5"
                style={{
                  background: `linear-gradient(150deg, ${p.hex}, ${concept.palette[0]!.hex})`,
                }}
              >
                <p className="font-display text-2xl text-white/90">{p.title}</p>
              </div>
              <div className="bg-elevated p-5">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
                  {p.tag}
                </p>
                <p className="mt-2 text-sm text-foreground/85">{p.caption}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Action onClick={() => setCampaign((c) => c + 1)}>Generate campaign</Action>
          <Action variant="line" onClick={onNewDirection}>
            New direction
          </Action>
          <AiBadge />
        </div>
      </Reveal>
    </Section>
  );
}

function Opportunities({ concept }: { concept: Concept }) {
  const groups = [
    { title: "AI opportunities", items: concept.aiOpportunities },
    { title: "Automation opportunities", items: concept.automationIdeas },
    { title: "Digital opportunities", items: concept.digitalOpportunities },
    { title: "Customer experience", items: concept.customerExperience },
    { title: "Website features", items: concept.websiteFeatures },
    { title: "Marketing directions", items: concept.marketingIdeas },
  ];
  return (
    <Section id="opportunities">
      <Reveal>
        <SectionHeading
          eyebrow="Opportunities"
          title="Where technology can take you."
          lede="Conceptual directions — no revenue promises, no invented statistics."
        />
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-hairline bg-border sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title} className="bg-background p-7">
              <Eyebrow>{g.title}</Eyebrow>
              <ul className="mt-4 space-y-3">
                {g.items.map((i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <AiBadge />
        </div>
      </Reveal>
    </Section>
  );
}

function RemixEngine({ current, onRemix }: { current?: Remix | undefined; onRemix: (r: Remix) => void }) {
  return (
    <Section id="remix">
      <Reveal>
        <SectionHeading
          eyebrow="Remix Engine"
          title="Remix your future."
          lede="Push the whole direction — colour, type, product, environment and website style move together."
        />
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-10 flex flex-wrap gap-3">
          {REMIX_OPTIONS.map((r) => (
            <Chip
              key={r}
              label={`Make it ${r.replace("more ", "more ")}`}
              active={current === r}
              onClick={() => onRemix(r)}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function blueprintText(concept: Concept, mode: "demo" | "ai") {
  return [
    `FUTURA — PROJECT BLUEPRINT`,
    `Source: ${mode === "ai" ? "AI generated concept" : "Demo mode sample concept"}`,
    ``,
    `BUSINESS CONCEPT: ${concept.businessConcept}`,
    `BRAND: ${concept.brandName} — ${concept.tagline}`,
    `PERSONALITY: ${concept.brandPersonality.join(", ")}`,
    `AUDIENCE: ${concept.targetAudience.join(", ")}`,
    `VISUAL DIRECTION: ${concept.visualDirection}`,
    `PALETTE: ${concept.palette.map((p) => `${p.name} ${p.hex}`).join(", ")}`,
    `TYPOGRAPHY: ${concept.typography.display} / ${concept.typography.body}`,
    ``,
    `CUSTOMER EXPERIENCE:\n- ${concept.customerExperience.join("\n- ")}`,
    `WEBSITE DIRECTION:\n- ${concept.websiteFeatures.join("\n- ")}`,
    `AI OPPORTUNITIES:\n- ${concept.aiOpportunities.join("\n- ")}`,
    `AUTOMATION:\n- ${concept.automationIdeas.join("\n- ")}`,
    `DIGITAL EXPERIENCE:\n- ${concept.digitalOpportunities.join("\n- ")}`,
    `TECHNOLOGY DIRECTION:\n- ${concept.technologyDirection.join("\n- ")}`,
    ``,
    `Conceptual output. No verified market research, revenue or performance claims.`,
    `Created with FUTURA — Nisha H, AI & Web Developer.`,
  ].join("\n");
}

function Blueprint({ concept, mode }: { concept: Concept; mode: "demo" | "ai" }) {
  const [saved, setSaved] = useState(false);
  const steps = ["Idea", "Identity", "Experience", "Product", "Digital", "Launch"];

  return (
    <Section id="blueprint">
      <Reveal>
        <SectionHeading
          eyebrow="Project Blueprint"
          title="Your future, mapped out."
          lede="Everything above, collected into one direction you can take away."
        />
      </Reveal>

      <Reveal delay={100}>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-hairline bg-border sm:grid-cols-3 lg:grid-cols-6">
          {steps.map((s, i) => (
            <li key={s} className="bg-background p-5">
              <p className="font-mono text-[0.6rem] tracking-[0.2em] text-accent">0{i + 1}</p>
              <p className="mt-2 font-display text-xl tracking-tight">{s}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-6 grid gap-px overflow-hidden rounded-md border border-hairline bg-border md:grid-cols-2">
          {[
            ["Business concept", concept.businessConcept],
            ["Brand direction", `${concept.brandName} — ${concept.visualDirection}`],
            ["Customer experience", concept.customerExperience.join(" · ")],
            ["Website direction", concept.websiteFeatures.slice(0, 4).join(" · ")],
            ["Recommended features", concept.digitalOpportunities.join(" · ")],
            ["AI opportunities", concept.aiOpportunities.join(" · ")],
            ["Automation", concept.automationIdeas.join(" · ")],
            ["Technology direction", concept.technologyDirection.join(" · ")],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-7">
              <Eyebrow>{k}</Eyebrow>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">{v}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={220}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Action
            onClick={() => {
              try {
                window.localStorage.setItem(
                  "futura:blueprint",
                  JSON.stringify({ concept, mode, savedAt: new Date().toISOString() }),
                );
                setSaved(true);
              } catch {
                setSaved(false);
              }
            }}
          >
            {saved ? <Check className="size-3.5" /> : <Save className="size-3.5" />}
            {saved ? "Blueprint saved" : "Save blueprint"}
          </Action>
          <Action
            variant="line"
            onClick={() => {
              const blob = new Blob([blueprintText(concept, mode)], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `futura-blueprint-${concept.brandName.toLowerCase().replace(/\s+/g, "-")}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="size-3.5" /> Download blueprint
          </Action>
          <Action variant="line" href="#contact">
            Start a project <ArrowRight className="size-3.5" />
          </Action>
        </div>
      </Reveal>

      <Reveal delay={280}>
        <div className="mt-16 hairline-t pt-12 text-center">
          <h3 className="font-display text-4xl tracking-tight sm:text-5xl">Ready to make it real?</h3>
          <div className="mt-7 flex justify-center">
            <Action href="#contact">
              Start a project <ArrowRight className="size-3.5" />
            </Action>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function ConceptSections({
  concept,
  mode,
  remix,
  onRemix,
  onRegenerate,
}: {
  concept: Concept;
  mode: "demo" | "ai";
  remix?: Remix | undefined;
  onRemix: (r: Remix) => void;
  onRegenerate: () => void;
}) {
  const cycle = () => {
    const next = REMIX_OPTIONS[Math.floor(Math.random() * REMIX_OPTIONS.length)]!;
    onRemix(next);
  };

  return (
    <>
      <BusinessDna concept={concept} />
      <BrandStudio concept={concept} onRegenerate={onRegenerate} onRemix={cycle} />
      <FutureWorld concept={concept} />
      <ProductStudio concept={concept} />
      <WebsitePreview concept={concept} />
      <SocialPresence concept={concept} onNewDirection={cycle} />
      <Opportunities concept={concept} />
      <RemixEngine current={remix} onRemix={onRemix} />
      <Blueprint concept={concept} mode={mode} />
    </>
  );
}
