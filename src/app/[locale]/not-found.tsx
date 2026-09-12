"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";
import styles from "@/components/about/editorial-pages.module.css";

export default function NotFound() {
  const pathname = usePathname();
  const locale: Locale = pathname === "/he" || pathname.startsWith("/he/") ? "he" : "en";
  return <div className={`shell ${styles.notFound}`}>
    <div className={styles.lostSignal} aria-hidden="true"><span>404</span><i /><i /></div>
    <p className="label">404 / {locale === "he" ? "העמוד לא נמצא" : "Page not found"}</p>
    <h1>{locale === "he" ? "אין עמוד בכתובת הזו." : "No page at these coordinates."}</h1>
    <p>{locale === "he" ? "הקישור הזה לא מוביל לעמוד. אפשר לחזור לדף הבית או להמשיך לעבודות." : "This link doesn't lead to a page. Head home or pick up with the work."}</p>
    <div className={styles.actions}><Link href={href("/work", locale)} className={styles.primaryButton}>{t(ui.notFound.cta, locale)}</Link><Link href={href("/", locale)} className={styles.secondaryButton}>{t(ui.notFound.home, locale)}</Link></div>
  </div>;
}
