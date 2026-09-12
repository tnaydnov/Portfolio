export const site = {
  name: "Tomer Naydnov",
  role: "EdTech Project Leader & Content Developer",
  url: "https://tomer-naydnov.com",
  description: "Software engineer and EdTech project leader. I develop learning content, lead educational projects and build useful digital products.",
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
