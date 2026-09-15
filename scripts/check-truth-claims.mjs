import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const textExtensions = new Set([".ts", ".tsx", ".html", ".json", ".py"]);
const scanTargets = ["src"];

const globalBlocks = [
  { id: "normal-dashes-only", pattern: /(?!-)\p{Dash_Punctuation}|[\u00ad\u00af\u203e\u2212]|&(?:m|n)dash;|&#(?:0*821[0-5]|x0*201[0-5]);|\\u(?:201[0-5]|2212)/iu },
  { id: "english-only-publication", pattern: /[\u0590-\u05ff\ufb1d-\ufb4f]/u },
  { id: "arc-650", pattern: /650\+|650\s+students?/i },
  { id: "arc-uncleared-scale", pattern: /1,?300\+|50\+\s+instructors?|80\+\s+schools?/i },
  { id: "arc-three-years", pattern: /three years of classroom|3\s*yrs?/i },
  // The owner confirmed both products are live on 2026-09-13. The 3,000+
  // audience is combined across Arc and Browser Coder and includes staff.
  { id: "unsupported-organization-coverage", pattern: /continuous use across|organisation-wide|organization-wide/i },
  { id: "combined-audience-not-students-only", pattern: /3,?000\+?\s+(?:active\s+)?students?\b(?!,?\s+instructors)/i },
  { id: "combined-audience-not-per-product", pattern: /\b(?:each|per (?:app|product|platform))\b.{0,24}3,?000\+?/i },
  { id: "arc-sole-creator", pattern: /\bI (created|built) Arc\b|\bsole (creator|developer) of Arc\b/i },
  { id: "unsupported-classroom-count", pattern: /hundreds of live explanations|thirty faces/i },
  { id: "seasonal-timezone", pattern: /GMT\+3/i },
  { id: "eventa-current-status", pattern: /actively developed|still in build|listed here as in-progress/i },
  { id: "applytide-request-claim", pattern: /most[- ]requested (idea|feature)/i },
  { id: "obsolete-current-teaching-role", pattern: /currently.{0,60}teaching at Nitzanim|\bI teach programming\b/i },
  { id: "browser-coder-sole-creator", pattern: /\bsole (creator|developer) of Browser Coder\b|\bI created Browser Coder\b/i },
];

const fileBlocks = [
  {
    file: "src/content/work/applytide.ts",
    id: "applytide-uncleared-start",
    pattern: /started:\s*["']2025-01["']/i,
  },
  {
    file: "src/content/work/applytide.ts",
    id: "applytide-stale-counts",
    pattern: /six services|20\s+(data\s+)?models?|14\s+(api\s+)?routers?/i,
  },
  {
    file: "src/content/work/eventa.ts",
    id: "eventa-uncleared-status",
    pattern: /status:\s*["']ongoing["']|value:\s*["']In build["']/i,
  },
  {
    file: "src/content/work/eventa.ts",
    id: "eventa-repository-not-archived",
    pattern: /status:\s*["']archived["']/i,
  },
];

async function collect(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  const info = await stat(absolutePath).catch(() => null);
  if (!info) return [];
  if (info.isFile()) {
    return textExtensions.has(path.extname(relativePath)) ? [relativePath] : [];
  }

  const entry = await readdir(absolutePath, { withFileTypes: true });

  const files = [];
  for (const item of entry) {
    const child = path.join(relativePath, item.name);
    if (item.isDirectory()) files.push(...(await collect(child)));
    else if (textExtensions.has(path.extname(item.name))) files.push(child);
  }
  return files;
}

const files = (await Promise.all(scanTargets.map(collect))).flat();
const violations = [];

for (const relativePath of files) {
  const normalizedPath = relativePath.replaceAll("\\", "/");
  const source = await readFile(path.join(projectRoot, relativePath), "utf8");
  const lines = source.split(/\r?\n/);

  for (const rule of globalBlocks) {
    lines.forEach((line, index) => {
      if (rule.pattern.test(line)) {
        violations.push({ file: normalizedPath, line: index + 1, rule: rule.id, text: line.trim() });
      }
    });
  }

  for (const rule of fileBlocks.filter((candidate) => candidate.file === normalizedPath)) {
    lines.forEach((line, index) => {
      if (rule.pattern.test(line)) {
        violations.push({ file: normalizedPath, line: index + 1, rule: rule.id, text: line.trim() });
      }
    });
  }
}

if (violations.length > 0) {
  console.error("Truth gate failed. Blocked publication claims were found:\n");
  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line} [${violation.rule}] ${violation.text}`);
  }
  process.exit(1);
}

console.log(`Truth gate passed (${files.length} publication-source files scanned).`);
