import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/futura/Nav";
import { Hero } from "@/components/futura/Hero";
import { Experience } from "@/components/futura/Experience";
import { About, Conversion, HowItWorks, Work } from "@/components/futura/Story";
import { Contact, Footer } from "@/components/futura/Contact";

const TITLE = "FUTURA — See What's Next | Nisha H";
const DESCRIPTION =
  "FUTURA transforms business ideas into interactive digital concepts. Experience your future brand, website and digital experience with AI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "FUTURA",
          description: DESCRIPTION,
          author: {
            "@type": "Person",
            name: "Nisha H",
            jobTitle: "AI & Web Developer",
            email: "nisha240106@gmail.com",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Experience />
        <HowItWorks />
        <Conversion />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
