"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { NAV, href, site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";

export function Header({ locale }: { locale: Locale }) {
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
          href={href("/", locale)}
          className="group flex items-baseline gap-2.5 font-display text-[0.95rem] font-medium tracking-tight"
        >
          <span
            aria-hidden
            className="size-1.5 shrink-0 translate-y-[-0.15em] rounded-full bg-signal transition-transform duration-300 group-hover:scale-150"
          />
          {t(site.name, locale)}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const target = href(item.href, locale);
            const active = pathname.startsWith(target);
            return (
              <Link
                key={item.key}
                href={target}
                aria-current={active ? "page" : undefined}
                className={`label px-3 py-2 transition-colors hover:text-text ${
                  active ? "text-signal" : ""
                }`}
              >
                {t(ui.nav[item.key], locale)}
              </Link>
            );
          })}
          <span aria-hidden className="mx-2 h-4 w-px bg-rule" />
          <LocaleToggle locale={locale} />
          <ThemeToggle locale={locale} />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleToggle locale={locale} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={
              open
                ? t(ui.common.closeMenu, locale)
                : t(ui.common.openMenu, locale)
            }
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
          className="fixed inset-x-0 bottom-0 top-16 z-50 border-t border-rule bg-ink lg:hidden"
        >
          <nav className="shell flex flex-col pt-4">
            {[...NAV, { key: "colophon" as const, href: "/colophon" }].map(
              (item, i) => (
                <Link
                  key={item.key}
                  href={href(item.href, locale)}
                  className="flex items-baseline justify-between border-b border-rule py-5 font-display text-2xl tracking-tight"
                >
                  {t(ui.nav[item.key], locale)}
                  <span className="label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              ),
            )}
            <div className="pt-8">
              <ThemeToggle locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
