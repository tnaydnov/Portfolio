export const site = {
  name: "Tomer Naydnov",
  role: "EdTech Project Leader & Content Developer",
  positioning: "Software Engineer & Product Builder",
  url: "https://tomer-naydnov.com",
  description: "Tomer Naydnov is a software engineer and product builder turning ideas into useful products. Explore his work, experience and approach to building software.",
  socialImage: {
    path: "/opengraph-image?v=20260915",
    width: 1200,
    height: 630,
    alt: "Tomer Naydnov, software engineer and product builder, with his portrait and portfolio website.",
  },
  email: "tnaydnov@gmail.com",
  location: "Israel time",
  links: {
    github: "https://github.com/tnaydnov",
    linkedin: "https://www.linkedin.com/in/tomer-naydnov/",
  },
  cv: "/Tomer Naydnov.pdf",
  cvFileName: "Tomer Naydnov.pdf",
} as const;
export const NAV = [
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;
/** Return a canonical site-relative path. */
export function href(path: string): string {
  return path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
}
