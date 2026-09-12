"use client";
import { useState } from "react";
import styles from "./editorial-pages.module.css";
export function CopyEmailButton({ email }: {
    email: string;
}) {
    const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
    async function copy() {
        try {
            await navigator.clipboard.writeText(email);
            setStatus("copied");
        }
        catch {
            setStatus("error");
        }
    }
    return <div className={styles.copyAction}><button type="button" onClick={copy} className={styles.secondaryButton}>{status === "copied" ? "Copied" : "Copy email"} <span aria-hidden="true">{status === "copied" ? "✓" : "⧉"}</span></button><span role="status" className={status === "error" ? styles.copyError : "sr-only"}>{status === "copied" ? "Email address copied" : status === "error" ? "You can select and copy the address above." : ""}</span></div>;
}
