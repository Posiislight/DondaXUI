// Prerenders every route to static HTML so crawlers that don't run JS still get
// the title, meta tags, JSON-LD and page content. Runs as the last step of
// `npm run build`, after the client build (dist/) and the SSR build (dist-ssr/).
//
// Output (served by Vercel with `cleanUrls`, and by `vite preview`):
//   /                   -> dist/index.html
//   /products           -> dist/products.html
//   /products/gn-model  -> dist/products/gn-model.html
//   unknown URLs        -> dist/404.html
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const { render, routes } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

// The template's fallback <title>/description would duplicate each page's own.
const template = readFileSync(path.join(dist, 'index.html'), 'utf8')
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/\s*<meta name="description"[^>]*>/, '');

// React 19 renders <title>/<meta>/<link> as a run of tags ahead of the app
// markup (it hoists them to <head> itself only when it renders <html>). Move
// that run into <head>; on hydration React adopts the tags it finds there.
const HOISTED = /^(?:<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)/;

function renderPage(url) {
  let body = render(url);
  const head = [];
  for (let m; (m = HOISTED.exec(body)); body = body.slice(m[0].length)) head.push(m[0]);

  if (!head.some((tag) => tag.startsWith('<title'))) throw new Error(`prerender ${url}: no <title> rendered`);
  if (!body.startsWith('<div class="App">')) throw new Error(`prerender ${url}: unexpected markup start`);

  return template
    .replace('</head>', `  ${head.join('\n    ')}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
}

const pages = [
  ...routes.map((url) => [url, url === '/' ? 'index.html' : `${url.slice(1)}.html`]),
  ['/404', '404.html'], // no route matches, so the app renders its not-found page
];

for (const [url, file] of pages) {
  const out = path.join(dist, file);
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, renderPage(url));
  console.log(`prerendered ${url} -> dist/${file}`);
}
