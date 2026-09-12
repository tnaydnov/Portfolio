export type PlaygroundObject = "engineering" | "product" | "teaching";
export type PlaygroundState = { engineering: boolean; teaching: boolean; runs: number };

export const playgroundObjects = {
  engineering: {
    title: "Engineering", color: "#a7ecd4", action: "Pull it apart",
    heading: "Get underneath the surface.",
    body: "I like understanding how the pieces fit: the workflow, the data, the architecture, and the code that makes it useful.",
    link: "/work", linkLabel: "See what I've built",
  },
  product: {
    title: "Product", color: "#ffb49e", action: "Run the loop",
    heading: "Build. Learn. Make it better.",
    body: "I start with a real problem, make the trade-offs clear, and use what happens next to shape the next version.",
    link: "/work/applytide", linkLabel: "See a product decision",
  },
  teaching: {
    title: "Teaching", color: "#ceb6ff", action: "Open an idea",
    heading: "Make the complicated click.",
    body: "At Nitzanim, I teach programming, develop learning material, and co-develop Arc. Explaining an idea is part of understanding it.",
    link: "/about#teaching", linkLabel: "More about how I teach",
  },
} as const;
