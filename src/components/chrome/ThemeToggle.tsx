"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ui } from "@/lib/ui";

type Theme = "draft" | "blueprint";

export const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var t=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'blueprint':'draft');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','draft');}})();`;

export function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute(
      "data-theme",
    ) as Theme | null;
    setTheme(current ?? "draft");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "blueprint" ? "draft" : "blueprint";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode); the toggle still works this session.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "blueprint"
          ? t(ui.common.toPaper, locale)
          : t(ui.common.toInk, locale)
      }
      className="label flex h-8 items-center gap-2 border border-rule px-2.5 transition-colors hover:border-rule-strong hover:text-text"
    >
      <span
        aria-hidden
        className="block size-2 border border-current"
        style={{
          background: theme === "blueprint" ? "transparent" : "currentColor",
        }}
      />
      {theme === "blueprint"
        ? t(ui.common.ink, locale)
        : t(ui.common.paper, locale)}
    </button>
  );
}
