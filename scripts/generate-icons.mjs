// Rebuild the browser and device icons from the portfolio's existing TN mark.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const source = await readFile(new URL("../src/app/icon.svg", import.meta.url));
const destination = new URL("../public/icons/", import.meta.url);
await mkdir(destination, { recursive: true });

for (const size of [32, 192, 512]) {
  const image = await sharp(source).resize(size, size).png().toBuffer();
  await writeFile(new URL(`icon-${size}.png`, destination), image);
}

const apple = await sharp(source).resize(180, 180).flatten({ background: "#0b0e11" }).png().toBuffer();
await writeFile(new URL("../src/app/apple-icon.png", import.meta.url), apple);

// Keep the whole mark inside the central safe area for circular device masks.
const maskable = await sharp(source).resize(320, 320).extend({ top: 96, bottom: 96, left: 96, right: 96, background: "#0b0e11" }).flatten({ background: "#0b0e11" }).png().toBuffer();
await writeFile(new URL("icon-maskable-512.png", destination), maskable);

const sizes = [16, 32, 48];
const images = [];
for (const size of sizes) images.push(await sharp(source).resize(size, size).png().toBuffer());
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(new URL("../src/app/favicon.ico", import.meta.url), Buffer.concat([header, ...images]));
console.log("Generated favicon, Apple touch icon and four device icons.");
