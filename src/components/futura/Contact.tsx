import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Action, Eyebrow, Reveal, Section, SectionHeading } from "./ui";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "Website",
  "Web Application",
  "AI Solution",
  "Dashboard",
  "Automation",
  "E-commerce",
  "Custom Digital Product",
  "Other",
];

const BUDGETS = ["Under ₹25k", "₹25k – ₹75k", "₹75k – ₹2L", "₹2L+", "Not sure yet"];
const TIMELINES = ["ASAP", "2–4 weeks", "1–3 months", "Flexible"];

type Fields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  type: string;
  description: string;
  budget: string;
  timeline: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  company: "",
  type: PROJECT_TYPES[0]!,
  description: "",
  budget: BUDGETS[0]!,
  timeline: TIMELINES[0]!,
};

function sanitize(v: string) {
  return v.replace(/[<>]/g, "").slice(0, 2000);
}

const inputClass =
  "mt-2 w-full rounded-sm border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

export function Contact() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: sanitize(e.target.value) }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.phone && !/^[+\d][\d\s-]{6,17}$/.test(values.phone)) next.phone = "Enter a valid phone number.";
    if (values.description.trim().length < 12) next.description = "Tell me a little more about the project.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setValues(EMPTY);
    }
  };

  return (
    <Section id="contact" className="grain">
      <Reveal>
        <SectionHeading
          eyebrow="Project inquiry"
          title="Let's build something unforgettable."
          lede="Have an idea, business problem or digital experience in mind? Tell me about it."
        />
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          {sent ? (
            <div className="glass flex min-h-[420px] flex-col items-center justify-center rounded-md p-10 text-center">
              <h3 className="font-display text-4xl tracking-tight">Your idea is on its way.</h3>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                Thanks for reaching out — I'll reply to your email shortly.
              </p>
              <div className="mt-8">
                <Action variant="line" onClick={() => setSent(false)}>
                  Send another
                </Action>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="glass rounded-md p-6 sm:p-9">
              <div className="grid gap-6 sm:grid-cols-2">
                {(
                  [
                    ["name", "Name", "text", "Your name"],
                    ["email", "Email", "email", "you@email.com"],
                    ["phone", "Phone", "tel", "Optional"],
                    ["company", "Business / Company", "text", "Optional"],
                  ] as const
                ).map(([key, label, type, ph]) => (
                  <div key={key}>
                    <label htmlFor={`f-${key}`} className="eyebrow">
                      {label}
                    </label>
                    <input
                      id={`f-${key}`}
                      type={type}
                      value={values[key]}
                      onChange={set(key)}
                      placeholder={ph}
                      aria-invalid={Boolean(errors[key])}
                      className={cn(inputClass, errors[key] && "border-destructive")}
                    />
                    {errors[key] ? (
                      <p className="mt-1.5 text-xs text-destructive">{errors[key]}</p>
                    ) : null}
                  </div>
                ))}

                <div>
                  <label htmlFor="f-type" className="eyebrow">
                    Project type
                  </label>
                  <select id="f-type" value={values.type} onChange={set("type")} className={inputClass}>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-background">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="f-budget" className="eyebrow">
                    Budget range
                  </label>
                  <select id="f-budget" value={values.budget} onChange={set("budget")} className={inputClass}>
                    {BUDGETS.map((t) => (
                      <option key={t} value={t} className="bg-background">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="f-timeline" className="eyebrow">
                    Timeline
                  </label>
                  <select id="f-timeline" value={values.timeline} onChange={set("timeline")} className={inputClass}>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t} className="bg-background">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="f-description" className="eyebrow">
                    Project description
                  </label>
                  <textarea
                    id="f-description"
                    rows={5}
                    value={values.description}
                    onChange={set("description")}
                    placeholder="What are you trying to build, and for whom?"
                    aria-invalid={Boolean(errors.description)}
                    className={cn(inputClass, "resize-none", errors.description && "border-destructive")}
                  />
                  {errors.description ? (
                    <p className="mt-1.5 text-xs text-destructive">{errors.description}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-8">
                <Action type="submit">
                  Send project request <ArrowRight className="size-3.5" />
                </Action>
              </div>
            </form>
          )}
        </Reveal>

        <Reveal delay={140}>
          <div className="glass h-full rounded-md p-8">
            <Eyebrow>Direct</Eyebrow>
            <p className="mt-4 font-display text-3xl tracking-tight">Nisha H</p>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              AI &amp; Web Developer
            </p>

            <div className="mt-8 space-y-6">
              <div className="hairline-t pt-5">
                <Eyebrow>Email</Eyebrow>
                <a
                  href="mailto:nisha240106@gmail.com"
                  className="mt-2 block text-lg text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  nisha240106@gmail.com
                </a>
              </div>
              <div className="hairline-t pt-5">
                <Eyebrow>Phone</Eyebrow>
                <a
                  href="tel:+917019875647"
                  className="mt-2 block text-lg text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  7019875647
                </a>
              </div>
            </div>

            <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
              Concepts generated by FUTURA are directional ideas, not verified market research.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="hairline-t px-6 py-14 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[0.34em]">FUTURA</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Don't just imagine your business. Experience it.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {[
            ["Experience", "#experience"],
            ["Projects", "#work"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="md:text-right">
          <a
            href="mailto:nisha240106@gmail.com"
            className="text-sm text-foreground transition-colors hover:text-accent"
          >
            nisha240106@gmail.com
          </a>
          <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
            © 2026 FUTURA — Nisha H
          </p>
        </div>
      </div>
    </footer>
  );
}
