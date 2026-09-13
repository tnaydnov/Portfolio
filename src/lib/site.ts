export const site = {
  name: "Tomer Naydnov",
  role: "EdTech Project Leader & Content Developer",
  positioning: "Software Engineer & Product Builder",
  url: "https://tomer-naydnov.com",
  description: "I'm Tomer, a software engineer who loves building products from scratch: understanding people's needs, shaping ideas and turning them into useful apps.",
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
