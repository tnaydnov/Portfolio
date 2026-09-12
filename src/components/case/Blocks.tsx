import { ui } from "@/lib/ui";
import type { Decision, Feedback, Metric } from "@/lib/types";
import styles from "./engineering.module.css";
export function MetricBlock({ metrics }: {
    metrics: Metric[];
}) {
    if (metrics.length === 0)
        return null;
    return <dl className={styles.metrics}>{metrics.map((metric) => <div key={metric.label} className={styles.metric}>
    <dt>{metric.label}</dt>
    <dd>{metric.value}{metric.note ? <p>{metric.note}</p> : null}</dd>
  </div>)}</dl>;
}
export function DecisionLog({ decisions }: {
    decisions: Decision[];
}) {
    return <ol className={styles.decisions}>{decisions.map((decision) => <li key={decision.id}>
    <article className={styles.decision}>
      <div className={styles.decisionMeta}><p>{decision.id}</p><p>{decision.date}</p></div>
      <div><h3>{decision.title}</h3>
        <dl>{([[ui.common.why, decision.why], [ui.common.tradeoff, decision.tradeoff], [ui.common.revisitIf, decision.revisit]] as const).map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
      </div>
    </article>
  </li>)}</ol>;
}
export function FieldFeedback({ items }: {
    items: Feedback[];
}) {
    return <ul className={styles.feedback}>{items.map((item) => <li key={item.quote}><figure>
    <div><blockquote>&ldquo;{item.quote}&rdquo;</blockquote><figcaption>{item.source}</figcaption></div>
    <div><p>{ui.common.whatChanged}</p><p>{item.change}</p></div>
  </figure></li>)}</ul>;
}
export function RebuildList({ items }: {
    items: string[];
}) {
    return <ol className={styles.rebuild}>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>;
}
