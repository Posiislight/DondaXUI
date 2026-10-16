// One-off generator for favicons and social share images.
// Usage: node scripts/generate-seo-assets.mjs
// - src/assets/dondaxlogo.jpg -> favicon.ico (16/32/48), apple-touch-icon.png, icon-192/512.png
// - public/redesign photos     -> 1200x630 JPEG og:image cards in public/og/
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const pub = path.resolve('public');
const kb = (f) => Math.round(statSync(f).size / 1024) + 'KB';
const BLACK = { r: 0, g: 0, b: 0 };

// The source JPEG has a stray white corner, so crop to the green circle
// (measured bounding box) and pad it back out with black.
const circle = await sharp('src/assets/dondaxlogo.jpg')
  .extract({ left: 105, top: 115, width: 355, height: 355 })
  .toBuffer();

/** square logo PNG; `pad` is the black margin as a fraction of the circle size */
const logo = (size, pad) => {
  const margin = Math.round(355 * pad);
  return sharp(circle)
    .extend({ top: margin, bottom: margin, left: margin, right: margin, background: BLACK })
    .resize(size, size)
    .png({ palette: true, compressionLevel: 9 })
    .toBuffer();
};

for (const [file, size, pad] of [
  ['apple-touch-icon.png', 180, 0.14], // iOS rounds the corners, so leave more room
  ['icon-192.png', 192, 0.14],
  ['icon-512.png', 512, 0.14],
]) {
  const out = path.join(pub, file);
  writeFileSync(out, await logo(size, pad));
  console.log(`${file}: ${kb(out)}`);
}

// favicon.ico holding PNG-encoded 16/32/48 images (supported by every current browser)
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map((s) => logo(s, 0.04)));
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(icoSizes[i], entry); // width
  header.writeUInt8(icoSizes[i], entry + 1); // height
  header.writeUInt8(0, entry + 2); // palette size
  header.writeUInt8(0, entry + 3); // reserved
  header.writeUInt16LE(1, entry + 4); // colour planes
  header.writeUInt16LE(32, entry + 6); // bits per pixel
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
const ico = path.join(pub, 'favicon.ico');
writeFileSync(ico, Buffer.concat([header, ...pngs]));
console.log(`favicon.ico: ${kb(ico)}`);

// og:image cards. JPEG rather than WebP so WhatsApp and older scrapers render them.
mkdirSync(path.join(pub, 'og'), { recursive: true });
const OG = { width: 1200, height: 630 };

// brand card: the logo-text artwork, cropped around the logo (centred at y≈420)
const brand = path.join(pub, 'og/dondax.jpg');
await sharp(path.join(pub, 'redesign/logo-text.webp'))
  .extract({ left: 0, top: 84, width: 1280, height: 672 })
  .resize(OG.width, OG.height)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(brand);
console.log(`og/dondax.jpg: ${kb(brand)}`);

// product card: the whole bike, contained over a blurred, darkened copy of itself
const studio = path.join(pub, 'redesign/gn-studio-black.webp');
const backdrop = await sharp(studio).resize(OG.width, OG.height, { fit: 'cover' }).blur(30).modulate({ brightness: 0.55 }).toBuffer();
const bike = await sharp(studio).resize({ height: OG.height }).toBuffer();
const { width: bikeWidth } = await sharp(bike).metadata();
const product = path.join(pub, 'og/gn-model.jpg');
await sharp(backdrop)
  .composite([{ input: bike, left: Math.round((OG.width - bikeWidth) / 2), top: 0 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(product);
console.log(`og/gn-model.jpg: ${kb(product)}`);
