"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { NAV, href, site } from "@/lib/site";
import { LocaleToggle } from "./LocaleToggle";
import styles from "./chrome.module.css";

const focusable = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(document.querySelectorAll<HTMLElement>("#main, footer"));
    const previousInert = background.map((element) => element.inert);
    document.body.style.overflow = "hidden";
    background.forEach((element) => { element.inert = true; });
    menu.current?.querySelector<HTMLElement>(focusable)?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  }
  function onMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") { event.preventDefault(); closeMenu(); return; }
    if (event.key !== "Tab") return;
    const items = Array.from(menu.current?.querySelectorAll<HTMLElement>(focusable) ?? []);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  return <header className={styles.header}>
    <div className={`shell ${styles.headerInner}`}>
      <Link href={href("/", locale)} className={styles.brand} aria-label={`${t(site.name, locale)} — ${locale === "he" ? "דף הבית" : "Home"}`}>
        <svg className={styles.brandMark} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M8 15 26 7v42L8 57Z" fill="currentColor" />
          <path d="m26 7 19 13v42L26 49Z" fill="#1735b9" />
          <path d="m45 20 12-6v42l-12 6Z" fill="#7892ff" />
        </svg>
        <span className={styles.brandName}>{t(site.name, locale)}</span>
      </Link>
      <nav className={styles.desktopNav} aria-label={locale === "he" ? "ניווט ראשי" : "Primary navigation"}>
        {NAV.map((item) => {
          const target = href(item.href, locale);
          const active = pathname === target || pathname.startsWith(`${target}/`);
          return <Link key={item.key} href={target} aria-current={active ? "page" : undefined} className={styles.navLink}>{t(ui.nav[item.key], locale)}</Link>;
        })}
        <a href={site.cv} download={site.cvFileName} className={styles.cvLink}>{t(ui.common.cvPdf, locale)} <span aria-hidden="true">↓</span></a>
        <LocaleToggle locale={locale} />
      </nav>
      <div className={styles.mobileControls}>
        <LocaleToggle locale={locale} />
        <button ref={trigger} type="button" onClick={() => open ? closeMenu() : setOpen(true)} aria-expanded={open} aria-controls="mobile-nav" aria-haspopup="dialog" aria-label={t(open ? ui.common.closeMenu : ui.common.openMenu, locale)} className={styles.menuTrigger}>
          <span aria-hidden="true" className={open ? styles.cross : ""}><i /><i /></span>
        </button>
      </div>
    </div>
    {open && <div ref={menu} id="mobile-nav" role="dialog" aria-modal="true" aria-label={locale === "he" ? "תפריט ניווט" : "Navigation menu"} onKeyDown={onMenuKeyDown} className={styles.mobileMenu}>
      <div className={`shell ${styles.mobileMenuInner}`}>
        <button type="button" onClick={closeMenu} className={styles.menuClose}>{t(ui.common.closeMenu, locale)} <span aria-hidden="true">×</span></button>
        <nav aria-label={locale === "he" ? "ניווט ראשי בנייד" : "Mobile primary navigation"}>
          {NAV.map((item, index) => {
            const target = href(item.href, locale);
            const active = pathname === target || pathname.startsWith(`${target}/`);
            return <Link key={item.key} href={target} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={styles.mobileLink}><span>{t(ui.nav[item.key], locale)}</span><span className={styles.menuNumber} aria-hidden="true">0{index + 1}</span></Link>;
          })}
        </nav>
        <a href={site.cv} download={site.cvFileName} onClick={() => setOpen(false)} className={styles.mobileCv}>{t(ui.common.downloadCv, locale)} <span aria-hidden="true">↓</span></a>
        <div className={styles.menuBottom}><a href={`mailto:${site.email}`} dir="ltr">{site.email}</a><LocaleToggle locale={locale} /></div>
      </div>
    </div>}
  </header>;
}
