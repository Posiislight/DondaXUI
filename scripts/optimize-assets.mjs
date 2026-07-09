// One-off asset optimizer for public/redesign.
// Usage: node scripts/optimize-assets.mjs
// - JPG photos -> WebP at full (max 1280w) and mobile (640w) sizes
// - hero-video.mp4 -> re-encoded H.264 (720p, CRF 28, no audio) + poster frame
import { execFileSync } from 'node:child_process';
import { statSync, renameSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const dir = path.resolve('public/redesign');
const kb = (f) => Math.round(statSync(f).size / 1024) + 'KB';

const photos = [
  { src: 'gn-green.jpg', widths: [1280, 640] },
  { src: 'gn-red.jpg', widths: [1280, 640] },
  { src: 'gn-urban.jpg', widths: [1280, 640] },
  { src: 'logo-text.jpg', widths: [1280, 640] },
  { src: 'logo.jpg', widths: [128] }, // rendered at 34px max
];

for (const { src, widths } of photos) {
  const input = path.join(dir, src);
  const base = src.replace(/\.jpg$/, '');
  for (const w of widths) {
    const suffix = widths.length > 1 && w !== widths[0] ? `-${w}` : '';
    const out = path.join(dir, `${base}${suffix}.webp`);
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(out);
    console.log(`${src} -> ${path.basename(out)}: ${kb(input)} -> ${kb(out)}`);
  }
}

// video: 720p, strip audio (it plays muted), fast start for streaming
const video = path.join(dir, 'hero-video.mp4');
const tmp = path.join(dir, 'hero-video.opt.mp4');
execFileSync(ffmpeg, [
  '-y', '-i', video,
  '-vf', "scale='min(1280,iw)':-2",
  '-c:v', 'libx264', '-crf', '28', '-preset', 'slow',
  '-an', '-movflags', '+faststart',
  tmp,
], { stdio: 'inherit' });
const before = kb(video);
renameSync(tmp, video);
console.log(`hero-video.mp4: ${before} -> ${kb(video)}`);

// poster frame for the video (used by <video poster> so layout paints instantly)
const poster = path.join(dir, 'hero-poster.webp');
const posterJpg = path.join(dir, 'hero-poster-tmp.jpg');
execFileSync(ffmpeg, ['-y', '-i', video, '-vframes', '1', '-q:v', '3', posterJpg], { stdio: 'inherit' });
await sharp(posterJpg).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 70 }).toFile(poster);
const { unlinkSync } = await import('node:fs');
unlinkSync(posterJpg);
console.log(`hero-poster.webp: ${kb(poster)}`);
