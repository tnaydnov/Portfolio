"use client";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import styles from "./editorial-pages.module.css";

export function CopyEmailButton({ email, locale }: { email: string; locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const he = locale === "he";
  async function copy() {
    try { await navigator.clipboard.writeText(email); setStatus("copied"); }
    catch { setStatus("error"); }
  }
  return <div className={styles.copyAction}><button type="button" onClick={copy} className={styles.secondaryButton}>{status === "copied" ? (he ? "הועתק" : "Copied") : (he ? "העתקת האימייל" : "Copy email")} <span aria-hidden="true">{status === "copied" ? "✓" : "⧉"}</span></button><span role="status" className={status === "error" ? styles.copyError : "sr-only"}>{status === "copied" ? (he ? "כתובת האימייל הועתקה" : "Email address copied") : status === "error" ? (he ? "אפשר לבחור את הכתובת ולהעתיק אותה." : "You can select and copy the address above.") : ""}</span></div>;
}
