import Link from "next/link";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";
import styles from "@/components/about/editorial-pages.module.css";
export default function NotFound() {
    return <div className={`shell ${styles.notFound}`}>
    <div className={styles.lostSignal} aria-hidden="true"><span>404</span><i /><i /></div>
    <p className="label">404 / {"Page not found"}</p>
    <h1>{"No page at these coordinates."}</h1>
    <p>{"This link doesn't lead to a page. Head home or pick up with the work."}</p>
    <div className={styles.actions}><Link href={href("/work")} className={styles.primaryButton}>{ui.notFound.cta}</Link><Link href={href("/")} className={styles.secondaryButton}>{ui.notFound.home}</Link></div>
  </div>;
}
