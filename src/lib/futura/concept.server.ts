type Input = {
  idea: string;
  tone: string;
  audience: string;
  priority: string;
  remix?: string | undefined;
};

export type ConceptOverlay = {
  businessConcept?: string;
  brandName?: string;
  tagline?: string;
  brandPersonality?: string[];
  targetAudience?: string[];
  visualDirection?: string;
  websiteFeatures?: string[];
  marketingIdeas?: string[];
  automationIdeas?: string[];
  aiOpportunities?: string[];
  digitalOpportunities?: string[];
};

const SYSTEM = `You are FUTURA, a creative technology studio engine. Given a business idea,
return a concise conceptual direction as strict JSON. Never invent revenue figures, market
statistics, customer counts or guaranteed results. Keep strings short and editorial.
Respond with JSON only, matching:
{"businessConcept":string,"brandName":string,"tagline":string,"brandPersonality":string[3],
"targetAudience":string[3],"visualDirection":string,"websiteFeatures":string[6],
"marketingIdeas":string[4],"automationIdeas":string[4],"aiOpportunities":string[4],
"digitalOpportunities":string[4]}`;

export async function buildAiConcept(input: Input, apiKey: string): Promise<ConceptOverlay | null> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: `Idea: ${input.idea}\nFeeling: ${input.tone}\nAudience: ${input.audience}\nPriority: ${input.priority}${
            input.remix ? `\nRemix direction: make it ${input.remix}` : ""
          }`,
        },
      ],
    }),
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = json.choices?.[0]?.message?.content;
  if (!content) return null;
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as ConceptOverlay;
  } catch {
    return null;
  }
}
