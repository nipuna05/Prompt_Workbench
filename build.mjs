// Builds index.html (a standalone page for browsers and GitHub Pages)
// from src/prompt-workbench.html (the source published as the Claude artifact).
//
// Usage: node build.mjs
//
// The artifact runtime wraps the source in its own <!doctype>, <head> and <body>,
// so the source starts at <title>. This script adds that wrapper for everywhere else:
// everything up to the end of the first <style> block goes into <head>, the rest into <body>.
import { readFileSync, writeFileSync } from 'node:fs';

const srcUrl = new URL('./src/prompt-workbench.html', import.meta.url);
const outUrl = new URL('./index.html', import.meta.url);

const src = readFileSync(srcUrl, 'utf8').replace(/\r\n/g, '\n');
const marker = '\n</style>\n';
const cut = src.indexOf(marker);
if (cut < 0) {
  console.error('Could not find the end of the first <style> block in src/prompt-workbench.html.');
  process.exit(1);
}
const head = src.slice(0, cut + marker.length);
const body = src.slice(cut + marker.length);

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- Generated from src/prompt-workbench.html by build.mjs. Edit the source, not this file. -->
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}img{max-width:100%}[hidden]{display:none!important}</style>
${head}</head>
<body>
${body}</body>
</html>
`;

writeFileSync(outUrl, page);
console.log(`Built index.html (${page.length.toLocaleString()} characters).`);
