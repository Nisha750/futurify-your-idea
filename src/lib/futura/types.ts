export type Tone =
  | "Luxury"
  | "Minimal"
  | "Playful"
  | "Elegant"
  | "Traditional"
  | "Futuristic"
  | "Warm"
  | "Bold";

export type Remix =
  | "more luxurious"
  | "more minimal"
  | "more futuristic"
  | "more youthful"
  | "more traditional"
  | "more playful"
  | "more premium"
  | "more bold";

export interface IdeaInput {
  idea: string;
  tone: Tone;
  audience: string;
  priority: string;
}

export interface Swatch {
  name: string;
  hex: string;
}

export interface ProductOption {
  label: string;
  values: string[];
}

export interface Concept {
  source: "demo" | "ai";
  businessConcept: string;
  brandName: string;
  tagline: string;
  brandPersonality: string[];
  targetAudience: string[];
  experience: string[];
  visualDirection: string;
  palette: Swatch[];
  typography: { display: string; body: string; note: string };
  logoDirection: string;
  packagingDirection: string;
  storefrontDirection: string;
  socialDirection: string;
  productName: string;
  productOptions: ProductOption[];
  websiteFeatures: string[];
  marketingIdeas: string[];
  automationIdeas: string[];
  aiOpportunities: string[];
  digitalOpportunities: string[];
  customerExperience: string[];
  technologyDirection: string[];
  socialPosts: { title: string; caption: string; tag: string }[];
  world: { id: string; label: string; headline: string; detail: string }[];
}
