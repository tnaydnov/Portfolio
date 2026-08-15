"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const COPIED = { en: "copied", he: "הועתק" } as const;

/**
 * The only JavaScript on the page.
 *
 * It progressively enhances a real `mailto:` link — with JS off, or before
 * hydration, it is still a working email link. Copying is the thing people
 * actually want from an address on a screen.
 */
export function CopyEmail({
  email,
  locale,
}: {
  email: string;
  locale: Locale;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <a
      href={`mailto:${email}`}
      dir="ltr"
      onClick={(e) => {
        if (!navigator.clipboard) return; // Let the mailto: happen instead.
        e.preventDefault();
        navigator.clipboard.writeText(email).then(
          () => setCopied(true),
          () => {
            window.location.href = `mailto:${email}`;
          },
        );
      }}
      className="link font-display text-[clamp(1.15rem,3.5vw,1.6rem)] font-semibold"
    >
      {email}
      <span
        aria-live="polite"
        className="ms-2 inline-block align-middle text-sm font-normal text-accent"
      >
        {copied ? COPIED[locale] : ""}
      </span>
    </a>
  );
}
