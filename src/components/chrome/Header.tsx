"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { NAV, href, site } from "@/lib/site";
import { LocaleToggle } from "./LocaleToggle";

const focusable =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("#main, footer"),
    );

    if (!open) {
      document.body.style.overflow = "";
      background.forEach((element) => element.removeAttribute("inert"));
      return;
    }

    document.body.style.overflow = "hidden";
    background.forEach((element) => element.setAttribute("inert", ""));
    const first = menu.current?.querySelector<HTMLElement>(focusable);
    first?.focus();

    return () => {
      document.body.style.overflow = "";
      background.forEach((element) => element.removeAttribute("inert"));
    };
  }, [open]);

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      window.requestAnimationFrame(() => trigger.current?.focus());
      return;
    }
    if (event.key !== "Tab") return;

    const items = Array.from(
      menu.current?.querySelectorAll<HTMLElement>(focusable) ?? [],
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        lifted || open
          ? "border-rule bg-ink/92 backdrop-blur-xl"
          : "border-transparent bg-ink/60 backdrop-blur-sm"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-5">
        <Link
          href={href("/", locale)}
          className="group flex min-w-0 items-center gap-3"
          aria-label={`${t(site.name, locale)} — ${t(site.role, locale)}`}
        >
          <span
            aria-hidden
            className="size-2 shrink-0 rounded-full bg-signal shadow-[0_0_18px_rgba(255,90,47,0.45)] transition-transform duration-300 group-hover:scale-150"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-[0.98rem] font-medium tracking-tight">
              {t(site.name, locale)}
            </span>
            <span className="label mt-1 hidden text-[0.58rem] text-faint sm:block">
              {t(site.role, locale)}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={locale === "he" ? "ניווט ראשי" : "Primary navigation"}>
          {NAV.map((item) => {
            const target = href(item.href, locale);
            const active = pathname === target || pathname.startsWith(`${target}/`);
            return (
              <Link
                key={item.key}
                href={target}
                aria-current={active ? "page" : undefined}
                className={`label flex min-h-11 items-center px-3 transition-colors hover:text-text ${
                  active ? "text-signal" : ""
                }`}
              >
                {t(ui.nav[item.key], locale)}
              </Link>
            );
          })}
          <a
            href={site.cv}
            download={site.cvFileName}
            className="label flex min-h-11 items-center px-3 transition-colors hover:text-text"
          >
            {t(ui.common.cvPdf, locale)}
          </a>
          <span aria-hidden className="mx-2 h-4 w-px bg-rule" />
          <LocaleToggle locale={locale} />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleToggle locale={locale} />
          <button
            ref={trigger}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={
              open
                ? t(ui.common.closeMenu, locale)
                : t(ui.common.openMenu, locale)
            }
            className="flex size-11 flex-col items-center justify-center gap-[6px] border border-rule transition-colors hover:border-rule-strong"
          >
            <span
              className={`block h-px w-4 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-4 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={menu}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={t(ui.common.openMenu, locale)}
          onKeyDown={onMenuKeyDown}
          className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rule bg-ink/98 pb-[max(2rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <nav className="shell flex min-h-full flex-col py-4" aria-label={locale === "he" ? "ניווט ראשי בנייד" : "Mobile primary navigation"}>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                window.requestAnimationFrame(() => trigger.current?.focus());
              }}
              className="label mb-2 flex min-h-11 items-center justify-between self-stretch border-b border-rule text-start text-muted"
            >
              {t(ui.common.closeMenu, locale)}
              <span aria-hidden className="text-lg text-signal">×</span>
            </button>
            {NAV.map((item, index) => {
              const target = href(item.href, locale);
              return (
                <Link
                  key={item.key}
                  href={target}
                  className="group flex min-h-16 items-center justify-between border-b border-rule font-display text-[clamp(1.7rem,8vw,2.6rem)] tracking-tight"
                >
                  {t(ui.nav[item.key], locale)}
                  <span className="label transition-colors group-hover:text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              );
            })}
            <a
              href={site.cv}
              download={site.cvFileName}
              className="group flex min-h-16 items-center justify-between border-b border-rule font-display text-[clamp(1.7rem,8vw,2.6rem)] tracking-tight"
            >
              {t(ui.common.cvPdf, locale)}
              <span className="label transition-colors group-hover:text-signal">04</span>
            </a>

            <div className="mt-auto grid gap-3 pt-10 text-sm text-muted">
              <a href={`mailto:${site.email}`} dir="ltr" className="inline-flex min-h-11 w-fit items-center hover:text-text">
                {site.email}
              </a>
              <div className="flex flex-wrap gap-5">
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-text">
                  LinkedIn ↗
                </a>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-text">
                  GitHub ↗
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
