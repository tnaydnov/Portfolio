"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Theme = "day" | "night";

/** Runs before paint so the page never flashes the wrong ground. */
export const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var t=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'night':'day');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','day');}})();`;

const LABEL: Record<Theme, Record<Locale, string>> = {
  day: { en: "Switch to dark", he: "מעבר לכהה" },
  night: { en: "Switch to light", he: "מעבר לבהיר" },
};

export function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "night" ? "night" : "day");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "night" ? "day" : "night";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode. The toggle still works for this session.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={LABEL[theme][locale]}
      className="grid size-8 place-items-center rounded-full text-faint transition-colors hover:bg-sunk hover:text-ink"
    >
      <span
        aria-hidden
        className="block size-3 rounded-full border-2 border-current"
        style={{ background: theme === "night" ? "currentColor" : "transparent" }}
      />
    </button>
  );
}
