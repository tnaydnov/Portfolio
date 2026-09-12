import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import type { Decision, Feedback, Metric } from "@/lib/types";
import { CountUp } from "@/components/motion/CountUp";
import styles from "./engineering.module.css";

export function MetricBlock({ metrics, locale }: { metrics: Metric[]; locale: Locale }) {
  if (metrics.length === 0) return null;
  return <dl className={styles.metrics}>{metrics.map((metric) => <div key={t(metric.label, locale)} className={styles.metric}>
    <dd><CountUp value={t(metric.value, locale)} /></dd>
    <dt>{t(metric.label, locale)}</dt>
    {metric.note ? <p>{t(metric.note, locale)}</p> : null}
  </div>)}</dl>;
}

export function DecisionLog({ decisions, locale }: { decisions: Decision[]; locale: Locale }) {
  return <ol className={styles.decisions}>{decisions.map((decision) => <li key={decision.id}>
    <article className={styles.decision}>
      <div className={styles.decisionMeta}><p>{decision.id}</p><p>{decision.date}</p></div>
      <div><h3>{t(decision.title, locale)}</h3>
        <dl>{([[ui.common.why, decision.why], [ui.common.tradeoff, decision.tradeoff], [ui.common.revisitIf, decision.revisit]] as const).map(([term, definition]) => <div key={t(term, locale)}><dt>{t(term, locale)}</dt><dd>{t(definition, locale)}</dd></div>)}</dl>
      </div>
    </article>
  </li>)}</ol>;
}

export function FieldFeedback({ items, locale }: { items: Feedback[]; locale: Locale }) {
  return <ul className={styles.feedback}>{items.map((item) => <li key={t(item.quote, locale)}><figure>
    <div><blockquote>&ldquo;{t(item.quote, locale)}&rdquo;</blockquote><figcaption>{t(item.source, locale)}</figcaption></div>
    <div><p>{t(ui.common.whatChanged, locale)}</p><p>{t(item.change, locale)}</p></div>
  </figure></li>)}</ul>;
}

export function RebuildList({ items }: { items: string[] }) {
  return <ol className={styles.rebuild}>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>;
}
