export const site = {
  name: "Tomer Naydnov",
  role: "Technical product · end-to-end delivery",
  url: "https://tomernaydnov.com",
  description:
    "I find the need, define the shape, plan the path, build the thing, prove it works, and fix what the field says is wrong. Software Engineering for the build, Industrial Engineering for the system.",
  email: "tnaydnov@gmail.com",
  location: "Israel · GMT+3",
  links: {
    github: "https://github.com/tnaydnov",
    linkedin: "https://www.linkedin.com/in/tomer-naydnov/",
  },
  cv: "/Tomer Naydnov.pdf",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/system", label: "System" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
