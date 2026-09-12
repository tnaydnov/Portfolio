import { wordmarkLines } from "./wordmark";

/** The same vector outlines as the 3D title, ready in the server-rendered page. */
export function IdentityFallback() {
  return <svg viewBox="0 0 1500 720" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="identity-face" x1="200" y1="60" x2="1120" y2="660" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f7f7ed" /><stop offset=".36" stopColor="#d9e2e6" /><stop offset=".63" stopColor="#aabdcf" /><stop offset="1" stopColor="#e5ede8" />
      </linearGradient>
      <linearGradient id="identity-edge" x1="240" y1="200" x2="1160" y2="690" gradientUnits="userSpaceOnUse">
        <stop stopColor="#53697c" /><stop offset=".36" stopColor="#182740" /><stop offset=".72" stopColor="#608cd8" /><stop offset="1" stopColor="#101b30" />
      </linearGradient>
      <g id="identity-outlines">
        {wordmarkLines.map((line, row) => {
          const scale = 1360 / line.width;
          return <g key={line.word} transform={`translate(70 ${row ? 610 : 370}) scale(${scale} ${-scale})`}>
            {line.letters.map((letter, i) => <path key={i} d={letter.path} transform={`translate(${letter.x} 0)`} />)}
          </g>;
        })}
      </g>
    </defs>
    <g transform="translate(7 28) skewY(-2)">
      <use href="#identity-outlines" transform="translate(20 28)" fill="#070e20" opacity=".55" />
      {Array.from({ length: 12 }, (_, i) => <use key={i} href="#identity-outlines" transform={`translate(${(12 - i) * 1.15} ${(12 - i) * 1.65})`} fill="url(#identity-edge)" />)}
      <use href="#identity-outlines" fill="url(#identity-face)" stroke="#d8e6ee" strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  </svg>;
}
