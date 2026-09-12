import { useId } from "react";

/** Code-built first paint and visual fallback. */
export function PlaygroundFallback({ engineering, teaching }: { engineering: boolean; teaching: boolean }) {
  const id = useId().replaceAll(":", "");
  return <svg viewBox="0 0 1000 760" fill="none" aria-hidden="true">
    <defs><radialGradient id={`${id}-glow`}><stop stopColor="#7cab9b" stopOpacity=".17" /><stop offset="1" stopColor="#0b0e11" stopOpacity="0" /></radialGradient><linearGradient id={`${id}-floor`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#29433f" /><stop offset="1" stopColor="#132026" /></linearGradient></defs>
    <ellipse cx="530" cy="450" rx="475" ry="285" fill={`url(#${id}-glow)`} />
    <path d="m98 459 460-205 355 223-461 230-354-222Z" fill="#111d22" /><path d="m98 459 460-205 355 223-461 211Z" fill={`url(#${id}-floor)`} stroke="#395851" /><path d="m135 463 422-181 312 199-414 185Z" stroke="#89c7b2" strokeWidth="2" />
    <g transform="translate(475 278)">{[3, 2, 1, 0].map(i => <g key={i} transform={`translate(0 ${i * (engineering ? 65 : 39) - (engineering ? 100 : 0)})`}><path d="m-113 0 110-54 133 62-111 59-132-60Z" fill="#bed8cc" /><path d="m-113 0 132 60v20l-132-59Z" fill="#8aa99e" /><path d="m19 60 111-59v21L19 80Z" fill="#547d70" /><path d="m-77-1 76-36 95 44-77 40Z" fill="#233c39" /><path d="m-29-1 29-14 43 20-30 15Z" fill="#a7ecd4" /><path d="m33 63 22-12" stroke="#c0f3df" strokeWidth="4" /></g>)}<path d="m-12-85-23 14 23 34m42-48 23 14-23 34" stroke="#a7ecd4" strokeWidth="13" strokeLinejoin="round" /></g>
    <g transform="translate(257 433)"><ellipse cy="82" rx="102" ry="42" fill="#172a2a" stroke="#79698c" />{[0, 1, 2, 3, 4, 5].map(i => <g key={i} transform={`rotate(${teaching ? -35 + i * 15 : -7 + i * 4} 0 66)`}><path d="M-3-108 72-83v163L-3 55Z" fill={i === 0 || i === 5 ? "#ceb6ff" : "#e4e7d7"} stroke="#8e9293" /><path d="m13-50 41 14m-41 1 34 12m-34 9 36 12" stroke="#586d6a" strokeWidth="3" /></g>)}</g>
    <g transform="translate(727 468)"><ellipse cy="74" rx="102" ry="42" fill="#233b3b" stroke="#ac7f6e" /><ellipse cy="48" rx="81" ry="31" fill="#abbcaf" /><ellipse cy="-19" rx="80" ry="88" transform="rotate(27)" stroke="#ffb49e" strokeWidth="19" /><ellipse cy="-14" rx="58" ry="36" transform="rotate(-32)" stroke="#dde4d5" strokeWidth="9" /><path d="m-23-20 27-20 29 14-3 30-33 10-24-19Z" fill="#a7ecd4" /></g><circle cx="357" cy="623" r="11" fill="#ffb49e" />
  </svg>;
}
