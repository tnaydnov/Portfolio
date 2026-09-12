import styles from "./engineering-study.module.css";

function SetCard({ count, color, shape }: { count: number; color: string; shape: number }) {
  return <div className={styles.setCard}>{Array.from({length:count},(_,i) => <svg key={i} viewBox="0 0 80 45" fill={color} aria-hidden="true">{shape===0?<ellipse cx="40" cy="22" rx="28" ry="15"/>:shape===1?<path d="m10 22 30-19 30 19-30 19Z"/>:<path d="M10 17C25-8 30 31 52 7s36 30 11 32S40 14 22 35 2 30 10 17Z"/>}</svg>)}</div>;
}

export function EngineeringVisual({ slug, compact=false }: { slug: string; compact?: boolean }) {
  return <div className={styles.visual} data-kind={slug} data-compact={compact || undefined}>
    <div className={styles.visualBar}><span>ENGINEERING / EXPLAINED</span><span aria-hidden="true">○ ○ ●</span></div>
    {slug==="hr-organization" ? <div className={styles.dispatch}><div className={styles.shiftStrip}><p>PEOPLE & TIME</p>{["Available for the trip","Licensed for the vehicle","Assigned through HR"].map((s,i)=><div key={s}><span>0{i+1}</span>{s}<i aria-hidden="true">✓</i></div>)}</div><div className={styles.bridge}><span aria-hidden="true">⇄</span><strong>Integration<br/>contracts</strong></div><div className={styles.deliveryStrip}><p>VEHICLE & LOAD</p><svg viewBox="0 0 190 100" fill="none" aria-hidden="true"><path d="M15 20h105v58H15zM120 45h30l25 22v11h-55"/><circle cx="43" cy="80" r="12"/><circle cx="143" cy="80" r="12"/><path d="M35 37h63M35 50h40"/></svg><span>Type + capacity</span><div className={styles.constraint}>Overloaded? → Replan</div></div></div>:
    slug==="kanban" ? <div className={styles.boardDiagram}>{["Backlog","In progress","Done"].map((name,i)=><div key={name}><p><span>0{i+1}</span>{name}</p><div className={styles.diagramTask}><span>{["Ready to begin","Assigned to a member","Completed work"][i]}</span><i/><i/><small>{["Validate input","Check column limit","Further edits refused"][i]}</small></div>{i===1&&<div className={styles.limit}>CAPACITY IS A DOMAIN RULE</div>}</div>)}</div>:
    slug==="set-card-game" ? <div className={styles.setDiagram}>
      <div className={styles.contenders}><span>Player A · thread 1</span><span>Player B · thread 2</span></div>
      <div className={styles.setCards}><SetCard count={1} color="#bf607c" shape={0}/><SetCard count={2} color="#557dc1" shape={1}/><SetCard count={3} color="#64906a" shape={2}/></div>
      <div className={styles.setRule}><span>THE SAME THREE CARDS</span><p>Independent selections.<br/><strong>One dealer decides what happens next.</strong></p></div>
      <div className={styles.threadRail}><span>Submit</span><b>→</b><span>Queue + validate</span><b>→</b><span>Score + refill</span></div>
    </div>:
    slug==="dungeons-and-dragons" ? <div>
      <div className={styles.dungeon}><div className={styles.tileMap} aria-label="Illustrative dungeon map">{["#########","#..@....#","#..#....#","#..#.s..#","#.......#","#########"].join('').split('').map((c,i)=><span key={i} data-tile={c}>{c==='#'?'':c==='.'?'·':c}</span>)}</div>
        <div className={styles.combat}><p>ONE MOVE. THREE OUTCOMES.</p>{[["·","Empty → move"],["#","Wall → stay"],["s","Enemy → battle"]].map(([symbol,label])=><div key={label}><span>{symbol}</span>{label}</div>)}<small>Behavior belongs to the tile you reach.</small></div>
      </div>
      <div className={styles.resourceClasses}>{[["Warrior","Cooldown"],["Mage","Mana"],["Rogue","Energy"],["Hunter","Arrows"]].map(([name,resource])=><div key={name}><span>{name}</span><strong>{resource}</strong></div>)}</div>
    </div>:
    slug==="the-coalition-race" ? <div className={styles.coalition}>
      <div className={styles.traceHeading}><span>RECORDED FIXTURES</span><strong>Two ways to finish.</strong><p>Majority threshold: 61 of 120 mandates.</p></div>
      {[["01",[50,70],"A majority forms."],["03",[60,60],"Everyone joins. No majority."]].map(([fixture,values,caption])=><div className={styles.trace} key={String(fixture)}><div><span>TRACE {String(fixture)}</span><strong>{String(caption)}</strong></div><div className={styles.mandates}>{(values as number[]).map((value,i)=><div key={i} className={styles.mandateRow}><span>{i===0?'A':'B'}</span><div className={styles.mandateTrack}><i style={{width:`${value/120*100}%`}}/><b aria-label="61-mandate threshold"/></div><strong>{value}</strong></div>)}</div></div>)}
      <small>Final states from committed tests/01.out and tests/03.out.<br/>Parsed source records, not a new simulation.</small>
    </div>:
    slug==="license-plate-recognition" ? <div className={styles.lprDiagram}>
      <div className={styles.vehicleFrame}><svg viewBox="0 0 600 190" fill="none" role="img" aria-label="Illustrative motion contours and a tracked vehicle"><path className={styles.motionContour} d="m68 117 45-57h158l75 39 90 22M54 129l48-78h172l77 39 98 25"/><path className={styles.carOutline} d="M100 136v-32l35-10 39-45h140l64 48 71 11 21 28H100ZM174 57l-31 38h75V57m14 0v38h130l-54-38"/><circle className={styles.carWheel} cx="171" cy="140" r="22"/><circle className={styles.carWheel} cx="394" cy="140" r="22"/><rect className={styles.trackingBox} x="92" y="33" width="390" height="142" rx="4"/><rect x="436" y="113" width="24" height="9" fill="#f1d584"/><path d="M461 114 529 83" stroke="#547784"/><text x="96" y="23">TRACK 04</text><text x="514" y="72">PLATE</text></svg></div>
      <div className={styles.pipeline}>{[["Motion","Find candidates"],["Track","Keep an identity"],["Read","Crop → OCR"],["Refine","Compare readings"]].map(([title,detail],i)=><div key={title}><span>0{i+1}</span><strong>{title}</strong><p>{detail}</p></div>)}</div>
    </div>:
    <div className={styles.marketDiagram}>
      <div className={styles.authority}><p>WHO CAN ACT?</p><div><span>Creator</span><b>→</b><span>Owner</span><b>→</b><span>Manager</span></div><small>Revoking an owner also revokes their descendant appointments.</small></div>
      <div className={styles.ruleExpression}><p>WHICH RULES APPLY?</p><div><span>Product</span><b>AND / OR</b><span>Category</span><b>→</b><strong>Basket policy</strong></div><small>Discounts compose separately with MAX or PLUS.</small></div>
      <div className={styles.checkoutFlow}><p>WHAT IF A STEP FAILS?</p><div>{["Reserve","Payment","Supply","Orders"].map((step,i)=><span key={step}><b>0{i+1}</b>{step}</span>)}</div><small>↶ Compensating cancellation after a failed external step</small></div>
    </div>}
    <p className={styles.visualNote}>{slug==="the-coalition-race" ? "Visualized from committed fixture data. Source review below." : "Code-native explanation of the implementation. Illustrative data."}</p>
  </div>;
}
