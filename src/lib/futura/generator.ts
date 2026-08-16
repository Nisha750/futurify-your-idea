import type { Concept, IdeaInput, Remix, Tone } from "./types";

type Category = {
  key: string;
  match: string[];
  label: string;
  product: string;
  productOptions: { label: string; values: string[] }[];
  offering: string[];
  world: string;
};

const CATEGORIES: Category[] = [
  {
    key: "restaurant",
    match: ["restaurant", "italian", "dining", "kitchen", "bistro", "food", "pizzeria"],
    label: "Restaurant",
    product: "Signature Plate",
    productOptions: [
      { label: "Style", values: ["Minimal", "Luxury", "Rustic", "Modern", "Traditional"] },
      { label: "Portion", values: ["Small", "Medium", "Large"] },
      { label: "Finish", values: ["Herb", "Truffle", "Citrus", "Custom"] },
    ],
    offering: ["Tasting menu", "Chef's table", "Private dining", "Seasonal specials"],
    world: "dining room",
  },
  {
    key: "cafe",
    match: ["cafe", "café", "coffee", "bakery", "patisserie", "cake", "dessert"],
    label: "Café",
    product: "Cake",
    productOptions: [
      { label: "Style", values: ["Minimal", "Luxury", "Floral", "Traditional", "Modern"] },
      { label: "Size", values: ["Small", "Medium", "Large"] },
      { label: "Finish", values: ["Cream", "Chocolate", "Fruit", "Custom"] },
    ],
    offering: ["Slow-brew bar", "Pastry counter", "Seasonal boxes", "Gifting sets"],
    world: "counter",
  },
  {
    key: "hotel",
    match: ["hotel", "resort", "stay", "villa", "boutique hotel", "homestay"],
    label: "Boutique Hotel",
    product: "Suite Experience",
    productOptions: [
      { label: "Style", values: ["Minimal", "Luxury", "Heritage", "Modern", "Garden"] },
      { label: "Size", values: ["Room", "Suite", "Villa"] },
      { label: "Finish", values: ["Linen", "Stone", "Timber", "Custom"] },
    ],
    offering: ["Signature suites", "Curated stays", "Wellness ritual", "Local journeys"],
    world: "lobby",
  },
  {
    key: "fashion",
    match: ["fashion", "clothing", "apparel", "label", "jewel", "atelier", "boutique"],
    label: "Fashion Label",
    product: "Capsule Piece",
    productOptions: [
      { label: "Style", values: ["Minimal", "Luxury", "Sculptural", "Traditional", "Modern"] },
      { label: "Size", values: ["XS–S", "M", "L–XL"] },
      { label: "Finish", values: ["Matte", "Silk", "Textured", "Custom"] },
    ],
    offering: ["Capsule drops", "Made-to-measure", "Archive line", "Editorial lookbook"],
    world: "showroom",
  },
  {
    key: "ai",
    match: ["ai", "startup", "saas", "software", "platform", "app", "tech"],
    label: "AI Product Studio",
    product: "Product Surface",
    productOptions: [
      { label: "Style", values: ["Minimal", "Luxury", "Technical", "Playful", "Modern"] },
      { label: "Scale", values: ["Starter", "Team", "Enterprise"] },
      { label: "Finish", values: ["Light", "Dark", "Contrast", "Custom"] },
    ],
    offering: ["Core workspace", "Assistant layer", "Insight reports", "Integrations"],
    world: "workspace",
  },
  {
    key: "interior",
    match: ["interior", "architecture", "studio", "design studio", "furniture", "decor"],
    label: "Interior Studio",
    product: "Signature Object",
    productOptions: [
      { label: "Style", values: ["Minimal", "Luxury", "Organic", "Traditional", "Modern"] },
      { label: "Scale", values: ["Accent", "Statement", "Full space"] },
      { label: "Material", values: ["Stone", "Oak", "Brass", "Custom"] },
    ],
    offering: ["Concept design", "Turnkey build", "Styling", "Material library"],
    world: "gallery",
  },
  {
    key: "agency",
    match: ["agency", "creative", "marketing", "brand", "media", "production"],
    label: "Creative Agency",
    product: "Campaign Concept",
    productOptions: [
      { label: "Style", values: ["Minimal", "Luxury", "Editorial", "Bold", "Modern"] },
      { label: "Scope", values: ["Sprint", "Campaign", "Retainer"] },
      { label: "Finish", values: ["Film", "Print", "Digital", "Custom"] },
    ],
    offering: ["Brand systems", "Campaign films", "Content engine", "Launch strategy"],
    world: "studio floor",
  },
  {
    key: "store",
    match: ["store", "shop", "ecommerce", "e-commerce", "online store", "retail"],
    label: "Retail Experience",
    product: "Hero Product",
    productOptions: [
      { label: "Style", values: ["Minimal", "Luxury", "Playful", "Traditional", "Modern"] },
      { label: "Size", values: ["Small", "Medium", "Large"] },
      { label: "Finish", values: ["Matte", "Gloss", "Recycled", "Custom"] },
    ],
    offering: ["Hero collection", "Bundles", "Subscription", "Gifting"],
    world: "shopfloor",
  },
];

const FALLBACK: Category = {
  key: "venture",
  match: [],
  label: "Independent Venture",
  product: "Signature Offer",
  productOptions: [
    { label: "Style", values: ["Minimal", "Luxury", "Playful", "Traditional", "Modern"] },
    { label: "Size", values: ["Small", "Medium", "Large"] },
    { label: "Finish", values: ["Soft", "Sharp", "Layered", "Custom"] },
  ],
  offering: ["Core offer", "Premium tier", "Membership", "Seasonal edition"],
  world: "space",
};

const TONE_PALETTE: Record<Tone, { hex: string; name: string }[]> = {
  Luxury: [
    { name: "Obsidian", hex: "#111013" },
    { name: "Bronze", hex: "#B98A४4".replace("४", "4") },
    { name: "Champagne", hex: "#E8DCC6" },
    { name: "Deep Wine", hex: "#4A1F26" },
  ],
  Minimal: [
    { name: "Graphite", hex: "#151517" },
    { name: "Fog", hex: "#D9D9D6" },
    { name: "Paper", hex: "#F3F2EE" },
    { name: "Slate", hex: "#6E7378" },
  ],
  Playful: [
    { name: "Ink", hex: "#17161B" },
    { name: "Coral", hex: "#E2664B" },
    { name: "Sun", hex: "#E9B949" },
    { name: "Mint", hex: "#8FC6AE" },
  ],
  Elegant: [
    { name: "Midnight", hex: "#121418" },
    { name: "Pearl", hex: "#EDE8E1" },
    { name: "Antique Gold", hex: "#C6A15B" },
    { name: "Sage", hex: "#7E8A76" },
  ],
  Traditional: [
    { name: "Espresso", hex: "#1E1712" },
    { name: "Terracotta", hex: "#A65A3A" },
    { name: "Linen", hex: "#E7DCC8" },
    { name: "Olive", hex: "#6B6B3A" },
  ],
  Futuristic: [
    { name: "Void", hex: "#0C0D10" },
    { name: "Titanium", hex: "#9FA7B0" },
    { name: "Ice", hex: "#DDE7EC" },
    { name: "Signal", hex: "#5FD3C4" },
  ],
  Warm: [
    { name: "Cocoa", hex: "#1C1613" },
    { name: "Amber", hex: "#C98A4B" },
    { name: "Cream", hex: "#F0E6D8" },
    { name: "Clay", hex: "#9A6A57" },
  ],
  Bold: [
    { name: "Carbon", hex: "#0F0F10" },
    { name: "Ember", hex: "#D8452F" },
    { name: "Bone", hex: "#EFEAE3" },
    { name: "Steel", hex: "#4C5257" },
  ],
};

const TONE_TYPE: Record<Tone, { display: string; body: string; note: string }> = {
  Luxury: { display: "High-contrast serif", body: "Neutral grotesque", note: "Wide letter-spacing on small caps" },
  Minimal: { display: "Neo-grotesque", body: "Neo-grotesque", note: "One family, three weights, generous leading" },
  Playful: { display: "Rounded geometric", body: "Humanist sans", note: "Oversized headlines, soft counters" },
  Elegant: { display: "Transitional serif", body: "Light grotesque", note: "Italic accents for quotes" },
  Traditional: { display: "Old-style serif", body: "Slab-inflected sans", note: "Classic ligatures, tight columns" },
  Futuristic: { display: "Technical sans", body: "Monospace accents", note: "Uppercase micro-labels" },
  Warm: { display: "Soft serif", body: "Humanist sans", note: "Loose tracking, hand-drawn dividers" },
  Bold: { display: "Condensed display", body: "Grotesque", note: "Editorial scale jumps" },
};

const REMIX_TONE: Record<Remix, Tone> = {
  "more luxurious": "Luxury",
  "more minimal": "Minimal",
  "more futuristic": "Futuristic",
  "more youthful": "Playful",
  "more traditional": "Traditional",
  "more playful": "Playful",
  "more premium": "Elegant",
  "more bold": "Bold",
};

export const REMIX_OPTIONS: Remix[] = [
  "more luxurious",
  "more minimal",
  "more futuristic",
  "more youthful",
  "more traditional",
  "more playful",
  "more premium",
  "more bold",
];

function detect(idea: string): Category {
  const text = idea.toLowerCase();
  return CATEGORIES.find((c) => c.match.some((m) => text.includes(m))) ?? FALLBACK;
}

function place(idea: string): string | null {
  const m = idea.match(/\bin ([A-Z][a-zA-Z]+(?: [A-Z][a-zA-Z]+)?)/);
  return m ? m[1] : null;
}

const NAME_PREFIX = ["Casa", "Studio", "Maison", "Atelier", "Nova", "Terra", "Aurea", "Lumen", "Voce", "Onda"];
const NAME_SUFFIX = ["Nero", "Alta", "Sette", "Vero", "Sol", "Mira", "Aura", "Nord", "Vita", "Lume"];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function generateConcept(input: IdeaInput, remix?: Remix): Concept {
  const category = detect(input.idea);
  const tone = remix ? REMIX_TONE[remix] : input.tone;
  const city = place(input.idea);
  const seed = hash(input.idea + tone + (remix ?? ""));
  const brandName = `${NAME_PREFIX[seed % NAME_PREFIX.length]} ${NAME_SUFFIX[(seed >> 3) % NAME_SUFFIX.length]}`;
  const palette = TONE_PALETTE[tone];
  const typography = TONE_TYPE[tone];
  const where = city ? ` in ${city}` : "";

  const concept = `${tone} ${category.label}${where}`;

  return {
    source: "demo",
    businessConcept: concept,
    brandName,
    tagline:
      tone === "Minimal"
        ? "Less, but better."
        : tone === "Futuristic"
          ? "Built for what comes next."
          : tone === "Playful"
            ? "Made to be enjoyed."
            : "Crafted to be remembered.",
    brandPersonality: [tone, "Considered", category.key === "ai" ? "Precise" : "Cinematic"],
    targetAudience: [input.audience, category.key === "hotel" ? "Travellers" : "Discerning locals", "Repeat guests"],
    experience: [
      tone === "Warm" ? "Welcoming" : "Composed",
      "Premium",
      input.priority === "Customer experience" ? "Effortless" : "Memorable",
    ],
    visualDirection: `${palette[0].name.toLowerCase()} base • ${typography.display.toLowerCase()} headlines • ${tone.toLowerCase()} material language`,
    palette,
    typography,
    logoDirection: `A restrained wordmark in ${typography.display.toLowerCase()}, paired with a single geometric mark derived from the ${category.world}.`,
    packagingDirection: `Uncoated stock, ${palette[2].name.toLowerCase()} ground, blind-deboss mark, ${palette[1].name.toLowerCase()} foil accent.`,
    storefrontDirection: `Low ambient light, ${palette[1].name.toLowerCase()} signage, layered depth through glass and stone at the ${category.world}.`,
    socialDirection: `Editorial grid: one wide hero frame, two detail crops, one motion loop. ${tone} tone of voice, minimal copy.`,
    productName: category.product,
    productOptions: category.productOptions,
    websiteFeatures: [
      "Cinematic hero with scroll narrative",
      category.key === "restaurant" || category.key === "cafe" ? "Live menu + reservations" : "Catalogue with rich detail pages",
      "Story / craft section",
      "Location & hours with map",
      "Enquiry form with routing",
      "Journal or campaign archive",
    ],
    marketingIdeas: [
      `Launch film built around the ${category.world}`,
      "Founder-voice newsletter, twice monthly",
      `${category.offering[0]} as the signature entry point`,
      "Collaboration series with local makers",
    ],
    automationIdeas: [
      "Enquiry triage and auto-response",
      "Booking / order confirmations",
      "Review request sequence",
      "Weekly performance digest to inbox",
    ],
    aiOpportunities: [
      "AI assistant answering questions in brand voice",
      "Smart recommendations based on past choices",
      "Automated enquiry summarisation",
      "Content drafting for campaigns",
    ],
    digitalOpportunities: [
      "Customer dashboard for orders or bookings",
      "Analytics on demand and drop-off",
      "Personalised returning-visitor experience",
      "Loyalty layer tied to the core offer",
    ],
    customerExperience: [
      "Discover through a single, striking frame",
      "Understand the offer in one scroll",
      "Act with one obvious next step",
      "Return through a reason to come back",
    ],
    technologyDirection: [
      "React + TypeScript front end",
      "Server functions for AI and form handling",
      "Managed database for enquiries and saved concepts",
      "Edge hosting with image optimisation",
    ],
    socialPosts: [
      { title: "Opening frame", caption: `${brandName}. ${concept}.`, tag: "Launch" },
      { title: "Detail crop", caption: `The ${category.product.toLowerCase()}, up close.`, tag: "Product" },
      { title: "Behind the scenes", caption: "Process over polish — for one post a week.", tag: "Story" },
      { title: "Guest moment", caption: "The room, at its best hour.", tag: "Lifestyle" },
      { title: "Offer", caption: `${category.offering[0]} — now open.`, tag: "Campaign" },
      { title: "Quiet post", caption: typography.note + ".", tag: "Brand" },
    ],
    world: [
      { id: "store", label: "Store", headline: `The ${category.world}`, detail: category.storefrontDirection },
      { id: "products", label: "Products", headline: category.product, detail: `Range: ${category.offering.join(" • ")}.` },
      { id: "website", label: "Website", headline: "Digital home", detail: `Six sections, one narrative: ${["Hero", "Story", "Offer", "Gallery", "Location", "Contact"].join(" → ")}.` },
      { id: "social", label: "Social", headline: "Presence", detail: `${brandName} posts with restraint — quality over cadence.` },
      { id: "insights", label: "Insights", headline: "What to watch", detail: "Enquiry volume, repeat rate, top entry pages, drop-off points." },
    ],
  };
}
