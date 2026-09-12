import { ImageResponse } from "next/og";
import { wordmarkLines } from "@/components/identity/wordmark";
import { site } from "@/lib/site";

export const alt = "Tomer Naydnov - Software engineer, product builder and programming instructor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const lineWidth = 1080;
const baselines = [240, 435];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "44px 60px 36px",
        background: "#090e20",
        backgroundImage:
          "radial-gradient(ellipse at 50% 36%, #223b79 0%, #101c40 44%, #090e20 76%)",
        color: "#e7edfa",
        fontFamily: "sans-serif",
      }}
    >
      <svg width="1080" height="448" viewBox="0 0 1080 448" fill="none">
        <defs>
          {wordmarkLines.flatMap((line) =>
            line.letters.map((letter, index) => (
              <linearGradient
                key={`${line.word}-${index}`}
                id={`silver-${line.word}-${index}`}
                gradientUnits="userSpaceOnUse"
                x1={-letter.x}
                y1="760"
                x2={line.width - letter.x}
                y2="-160"
              >
                <stop offset="0" stopColor="#f6f8ff" />
                <stop offset="0.27" stopColor="#b0bbcf" />
                <stop offset="0.45" stopColor="#f4f7fe" />
                <stop offset="0.7" stopColor="#bdcce3" />
                <stop offset="1" stopColor="#819ac3" />
              </linearGradient>
            )),
          )}
        </defs>
        {wordmarkLines.map((line, lineIndex) => {
          const scale = lineWidth / line.width;
          const transform = `translate(0 ${baselines[lineIndex]}) scale(${scale} ${-scale})`;

          return (
            <g key={line.word}>
              <g transform="translate(3 6)">
                <g transform={transform} fill="#1a2b53" stroke="#29416e" strokeWidth="9" strokeLinejoin="round">
                  {line.letters.map((letter, index) => (
                    <path key={index} d={letter.path} transform={`translate(${letter.x} 0)`} />
                  ))}
                </g>
              </g>
              <g transform={transform} strokeLinejoin="round">
                {line.letters.map((letter, index) => (
                  <g key={index} transform={`translate(${letter.x} 0)`}>
                    <path d={letter.path} fill="#a5b9da" stroke="#607ca8" strokeWidth="11" />
                    <path
                      d={letter.path}
                      fill={`url(#silver-${line.word}-${index})`}
                      stroke="#dce6f7"
                      strokeWidth="2.2"
                    />
                  </g>
                ))}
              </g>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 23,
          letterSpacing: -0.35,
          color: "#dce6fa",
        }}
      >
        {"Software engineer \u00b7 Product builder \u00b7 Programming instructor"}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 16,
          fontSize: 18,
          letterSpacing: 0.4,
          color: "#9badcf",
        }}
      >
        {new URL(site.url).hostname}
      </div>
    </div>,
    size,
  );
}
