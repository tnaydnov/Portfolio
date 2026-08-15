"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * His actual hour, in his actual timezone. The only client component the home
 * page adds — a reviewer in another timezone reads 23:40 and understands that
 * the person they are looking at is asleep.
 */
export function LocalTime({ locale }: { locale: Locale }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === "he" ? "he-IL" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jerusalem",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [locale]);

  // Server and first paint render the em-dashes, so there is nothing to
  // mismatch and nothing shifts when the real value lands.
  return (
    <time dir="ltr" suppressHydrationWarning className="tnum">
      {time ?? "--:--"}
    </time>
  );
}
