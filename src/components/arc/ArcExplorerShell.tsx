"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  arcExplorerHref,
  type ArcExplorerPage,
  type ArcPortalDefinition,
  type ArcPortalId,
} from "@/content/arc-explorer/types";
import styles from "./arc-explorer.module.css";

const portals: { id: ArcPortalId; label: string; symbol: string }[] = [
  { id: "admin", label: "Admin", symbol: "◈" },
  { id: "instructor", label: "Instructor", symbol: "⌘" },
  { id: "student", label: "Student", symbol: "✧" },
];
const themes = [
  { id: "space", label: "Space", color: "#5367ea" },
  { id: "magic-forest", label: "Magic Forest", color: "#60c397" },
  { id: "neon-hacker", label: "Neon Hacker", color: "#b3ee50" },
  { id: "aurora", label: "Aurora", color: "#bd98ed" },
  { id: "aurora-light", label: "Aurora Light", color: "#ede5ff" },
];

export function ArcExplorerShell({
  portal,
  page,
  children,
  evidence,
}: {
  portal: ArcPortalDefinition;
  page: ArcExplorerPage;
  children: ReactNode;
  evidence: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("space");
  const menu = useRef<HTMLDetailsElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const pageKey = `${portal.id}/${page.id}`;
  const previousPage = useRef(pageKey);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("arc-portfolio-theme");
      if (themes.some((item) => item.id === saved)) setTheme(saved!);
    } catch {
      /* The demo also works without browser storage. */
    }
  }, []);
  useEffect(() => {
    if (previousPage.current !== pageKey) {
      setQuery("");
      if (menu.current) menu.current.open = false;
      heading.current?.focus({ preventScroll: true });
      previousPage.current = pageKey;
    }
  }, [pageKey]);
  const navigation = portal.pages.filter((item) => !item.parentId);
  const groups = [...new Set(navigation.map((item) => item.group))];
  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? portal.pages.filter((item) =>
        `${item.label} ${item.title} ${item.description} ${item.features.join(" ")}`
          .toLowerCase()
          .includes(normalized),
      )
    : [];
  const currentIndex = portal.pages.findIndex((item) => item.id === page.id);
  const parent = page.parentId
    ? portal.pages.find((item) => item.id === page.parentId)
    : undefined;
  const next = portal.pages[(currentIndex + 1) % portal.pages.length];

  const navContents = (
    <>
      <div className={styles.navIntro}>
        <span className={styles.overline}>LOOK AROUND</span>
        <p>{portal.pages.length} places to explore</p>
      </div>
      {groups.map((group) => (
        <div className={styles.navGroup} key={group}>
          <p>{group}</p>
          {navigation
            .filter((item) => item.group === group)
            .map((item) => (
              <Link
                key={item.id}
                href={arcExplorerHref(portal.id, item.id)}
                prefetch={false}
                onClick={() => {
                  if (menu.current) menu.current.open = false;
                  setQuery("");
                }}
                aria-current={item.id === page.id ? "page" : undefined}
                data-parent={item.id === page.parentId || undefined}
              >
                <span>{item.label}</span>
                <span aria-hidden="true">
                  {item.id === page.id ? "●" : "↗"}
                </span>
              </Link>
            ))}
        </div>
      ))}
      <Link className={styles.backToArc} href="/work/arc">
        ← Back to the Arc story
      </Link>
    </>
  );

  return (
    <article
      className={styles.explorer}
      data-testid="arc-explorer"
      data-portal={portal.id}
      data-theme={portal.id === "student" ? theme : undefined}
    >
      <div className={styles.explorerAtmosphere} aria-hidden="true" />
      <div className={styles.demoBar}>
        <Link href="/work/arc" className={styles.wordmark}>
          <ArcMark />
          arc<span> / explorer</span>
        </Link>
        <p>
          <i aria-hidden="true" />
          Read-only portfolio demo <span>· Fictional data</span>
        </p>
        <Link href="/work/arc/recordings">
          Original app recordings <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className={styles.portalBar}>
        <nav className={styles.portalSwitch} aria-label="Choose an Arc portal">
          {portals.map((item) => (
            <Link
              key={item.id}
              href={arcExplorerHref(item.id)}
              aria-current={item.id === portal.id ? "page" : undefined}
            >
              <span aria-hidden="true">{item.symbol}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div
          className={styles.searchBox}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setQuery("");
              search.current?.focus();
            }
          }}
        >
          <label className="sr-only" htmlFor="arc-explorer-search">
            Search the {portal.label.toLowerCase()} portal
          </label>
          <svg viewBox="0 0 20 20" aria-hidden="true" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="m13 13 4 4" />
          </svg>
          <input
            id="arc-explorer-search"
            ref={search}
            type="search"
            placeholder={`Find something in ${portal.label.toLowerCase()}…`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-controls={normalized ? "arc-search-results" : undefined}
          />
          {normalized && (
            <div className={styles.searchResults} id="arc-search-results">
              <p role="status">
                {results.length
                  ? `${results.length} places found`
                  : "No matches. Try a task, tool or topic."}
              </p>
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={arcExplorerHref(portal.id, item.id)}
                  onClick={() => setQuery("")}
                >
                  <strong>{item.label}</strong>
                  <span>
                    {item.group} {item.parentId ? " / Detail" : ""}
                  </span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  search.current?.focus();
                }}
              >
                Close search
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.explorerLayout}>
        <nav
          className={styles.sidebar}
          aria-label={`${portal.label} portal sections`}
        >
          {navContents}
        </nav>
        <div className={styles.mainArea}>
          <details className={styles.mobileNavigation} ref={menu}>
            <summary>
              <span>
                Explore {portal.label.toLowerCase()}{" "}
                <small> / {parent?.label ?? page.label}</small>
              </span>
              <span aria-hidden="true">⌄</span>
            </summary>
            <nav aria-label={`${portal.label} portal sections on mobile`}>
              {navContents}
            </nav>
          </details>
          <nav
            className={styles.breadcrumbs}
            aria-label="Arc explorer breadcrumbs"
          >
            <Link href="/work/arc">Arc</Link>
            <span aria-hidden="true">/</span>
            <Link href={arcExplorerHref(portal.id)}>{portal.label}</Link>
            {parent && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={arcExplorerHref(portal.id, parent.id)}>
                  {parent.label}
                </Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.label}</span>
          </nav>
          {portal.id === "student" && (
            <fieldset className={styles.themePicker}>
              <legend>Your world, your style</legend>
              <div>
                {themes.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    aria-pressed={theme === item.id}
                    onClick={() => {
                      setTheme(item.id);
                      try {
                        localStorage.setItem("arc-portfolio-theme", item.id);
                      } catch {}
                    }}
                  >
                    <i style={{ background: item.color }} aria-hidden="true" />
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          <header className={styles.pageHeading}>
            <div>
              <p className={styles.overline}>{portal.subtitle}</p>
              <h1 ref={heading} tabIndex={-1}>
                {page.title}
              </h1>
              <p>{page.description}</p>
            </div>
            <span className={styles.pageNumber}>
              {String(currentIndex + 1).padStart(2, "0")}
              <small> / {String(portal.pages.length).padStart(2, "0")}</small>
            </span>
          </header>
          <div className={styles.demoContent}>{children}</div>
          <details className={styles.pageContext}>
            <summary>
              <span>What this part of Arc does</span>
              <span aria-hidden="true">+</span>
            </summary>
            <div>
              <ul>
                {page.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p>
                This is a browsable portfolio interpretation of Arc’s workflows
                with fictional examples. Navigation, filtering and theme
                previews work here; editing, execution and platform services
                belong to the original application.
              </p>
            </div>
          </details>
          {evidence}
          <nav className={styles.nextArea} aria-label="Continue exploring Arc">
            <Link href={arcExplorerHref(portal.id, next.id)}>
              <span className={styles.overline}>KEEP EXPLORING</span>
              <strong>
                {next.label} <span aria-hidden="true">→</span>
              </strong>
            </Link>
            <Link href="/work/arc#engineering">How it is built ↗</Link>
          </nav>
        </div>
      </div>
    </article>
  );
}

export function ArcMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M7 31 20 6l13 25M12 23h16"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="8" r="3" fill="currentColor" />
    </svg>
  );
}
