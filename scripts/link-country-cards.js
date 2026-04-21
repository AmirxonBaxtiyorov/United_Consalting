#!/usr/bin/env node
/* Rewrites 10 country-link anchors in index.html to point to /countries/<slug>.html
   Idempotent — re-running is a no-op when already linked. */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = resolve(__dirname, '..', 'index.html');
const data = JSON.parse(readFileSync(resolve(__dirname, '..', 'data/countries.json'), 'utf8'));

let html = readFileSync(file, 'utf8');
let count = 0;

for (const c of data.countries) {
  const re = new RegExp(
    `(<article class="country-card[^"]*" [^>]*data-country="${c.slug}"[\\s\\S]*?)<a href="#contact" class="country-link"`,
    'g'
  );
  html = html.replace(re, (match, head) => {
    count++;
    return head + `<a href="countries/${c.slug}.html" class="country-link"`;
  });
}

writeFileSync(file, html, 'utf8');
console.log('Rewrote', count, 'country links');
