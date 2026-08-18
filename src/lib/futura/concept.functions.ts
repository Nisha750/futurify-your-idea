import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { buildAiConcept } from "./concept.server";

const inputSchema = z.object({
  idea: z.string().min(3).max(400),
  tone: z.string().max(40),
  audience: z.string().max(60),
  priority: z.string().max(60),
  remix: z.string().max(40).optional(),
});

/**
 * Returns an AI-authored concept overlay when an LLM key is configured.
 * Otherwise returns { mode: "demo" } and the client renders clearly-labelled
 * sample output — demo output is never presented as real AI generation.
 */
export const generateConceptFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) { console.error("FUTURA: no key"); return { mode: "demo" as const, overlay: null }; }
    try {
      const overlay = await buildAiConcept(data, apiKey);
      return overlay ? { mode: "ai" as const, overlay } : { mode: "demo" as const, overlay: null };
    } catch (e) {
      console.error("FUTURA ai error", e);
      return { mode: "demo" as const, overlay: null };
    }
  });
