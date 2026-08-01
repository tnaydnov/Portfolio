"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        lifted ? "border-rule bg-ink/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 font-display text-[0.95rem] font-medium tracking-tight"
        >
          <span
            aria-hidden
            className="size-1.5 shrink-0 translate-y-[-0.15em] rounded-full bg-signal transition-transform duration-300 group-hover:scale-150"
          />
          {site.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`label px-3 py-2 transition-colors hover:text-text ${
                  active ? "text-signal" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <span aria-hidden className="mx-2 h-4 w-px bg-rule" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-8 flex-col items-center justify-center gap-[5px] border border-rule"
          >
            <span
              className={`block h-px w-4 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-4 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-50 border-t border-rule bg-ink md:hidden"
        >
          <nav className="shell flex flex-col pt-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-baseline justify-between border-b border-rule py-5 font-display text-2xl tracking-tight"
              >
                {item.label}
                <span className="label">
                  {String(nav.indexOf(item) + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
