"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ui } from "@/lib/ui";
import { NAV, href, site } from "@/lib/site";
import styles from "./chrome.module.css";
const focusable = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const menu = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    useEffect(() => setOpen(false), [pathname]);
    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 768px)");
        const closeOnDesktop = () => { if (desktop.matches)
            setOpen(false); };
        desktop.addEventListener("change", closeOnDesktop);
        return () => desktop.removeEventListener("change", closeOnDesktop);
    }, []);
    useEffect(() => {
        if (!open)
            return;
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
        if (event.key === "Escape") {
            event.preventDefault();
            closeMenu();
            return;
        }
        if (event.key !== "Tab")
            return;
        const items = Array.from(menu.current?.querySelectorAll<HTMLElement>(focusable) ?? []);
        if (!items.length)
            return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }
        else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
    return <header className={styles.header}>
    <div className={`shell ${styles.headerInner}`}>
      <Link href={href("/")} className={styles.brand} aria-label={`${site.name} — Home`}>
        <svg className={styles.brandMark} viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M2 12V2h10m16 0h10v10M2 28v10h10m16 0h10V28" stroke="currentColor" strokeWidth="1" opacity=".4"/>
          <path d="M8 12h16m-8 0v17m7 0V15l9 14V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
        </svg>
        <span className={styles.brandName}>{site.name}</span>
      </Link>
      <nav className={styles.desktopNav} aria-label={"Primary navigation"}>
        {NAV.map((item) => {
            const target = href(item.href);
            const active = pathname === target || pathname.startsWith(`${target}/`);
            return <Link key={item.key} href={target} aria-current={active ? "page" : undefined} className={styles.navLink}>{ui.nav[item.key]}</Link>;
        })}
        <a href={site.cv} download={site.cvFileName} className={styles.cvLink}>{ui.common.cvPdf} <span aria-hidden="true">↓</span></a>
      </nav>
      <div className={styles.mobileControls}>
        <a href={site.cv} download={site.cvFileName} className={styles.quickCv} aria-label="Download CV (PDF)">CV <span aria-hidden="true">↓</span></a>
        <button ref={trigger} type="button" onClick={() => open ? closeMenu() : setOpen(true)} aria-expanded={open} aria-controls="mobile-nav" aria-haspopup="dialog" aria-label={open ? ui.common.closeMenu : ui.common.openMenu} className={styles.menuTrigger}>
          <span aria-hidden="true" className={open ? styles.cross : ""}><i /><i /></span>
        </button>
      </div>
    </div>
    {open && <div ref={menu} id="mobile-nav" role="dialog" aria-modal="true" aria-label={"Navigation menu"} onKeyDown={onMenuKeyDown} className={styles.mobileMenu}>
      <div className={`shell ${styles.mobileMenuInner}`}>
        <button type="button" onClick={closeMenu} className={styles.menuClose}>{ui.common.closeMenu} <span aria-hidden="true">×</span></button>
        <nav aria-label={"Mobile primary navigation"}>
          {NAV.map((item, index) => {
                const target = href(item.href);
                const active = pathname === target || pathname.startsWith(`${target}/`);
                return <Link key={item.key} href={target} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={styles.mobileLink}><span>{ui.nav[item.key]}</span><span className={styles.menuNumber} aria-hidden="true">0{index + 1}</span></Link>;
            })}
        </nav>
        <a href={site.cv} download={site.cvFileName} onClick={() => setOpen(false)} className={styles.mobileCv}>{ui.common.downloadCv} <span aria-hidden="true">↓</span></a>
        <div className={styles.menuBottom}><a href={`mailto:${site.email}`} dir="ltr">{site.email}</a></div>
      </div>
    </div>}
  </header>;
}
