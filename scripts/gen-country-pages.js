#!/usr/bin/env node
/* eslint-disable no-console */
/* Generates 10 country landing pages under /countries/<slug>.html
   from /data/countries.json. Idempotent — overwrites each time.
*/

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const data = JSON.parse(readFileSync(resolve(root, 'data/countries.json'), 'utf8'));

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const seoText = {
  korea: `South Korea has become one of Asia's top study destinations thanks to its globally ranked universities, rich culture, and generous government scholarships (GKS, KGSP). Programs in Seoul National University, Yonsei, Korea University, Sungkyunkwan, and KAIST combine rigorous academics with English-taught tracks suited for international students. Cost of living is moderate compared to Western countries, and part-time work after six months is allowed on D-2 visa.`,
  singapore: `Singapore is a compact powerhouse with two universities in the world's QS top 20 — NUS and NTU — and English as the medium of instruction everywhere. The island connects east and west, pays graduates some of Asia's highest starting salaries, and offers generous tuition grants that cut real costs by up to 50% in exchange for a 3-year work commitment after graduation.`,
  usa: `Studying in the USA means choosing from over 4,000 accredited institutions, from Ivy League schools with need-blind financial aid to large public research universities that offer excellent value. STEM-OPT extensions let international graduates work for up to three years post-degree. Financial aid packages can cover 80–100% of costs for strong applicants; we help you find and apply to the right ones.`,
  italy: `Italy offers one of Europe's best price-to-prestige ratios: tuition ranges from €1,000 to €5,000 per year at state universities, plus scholarships (DSU, INPS, Invest Your Talent) can fully cover costs. English-taught degrees in Politecnico di Milano, Bocconi, Sapienza, and Bologna welcome international students. Plus you get full Schengen access and Europe's richest cultural backdrop.`,
  luxembourg: `Luxembourg is Europe's best-kept secret: extremely low tuition (€400/semester), a trilingual environment, one of the highest average salaries in the EU, and a Schengen-zone location close to France, Germany, and Belgium. The University of Luxembourg specialises in finance, law, and computer science.`,
  finland: `Finland is the global leader in education quality and research, with free PhD programs and generous scholarships covering full bachelor/master tuition for top applicants. Programs at Aalto, University of Helsinki, and Tampere are fully English-taught and research-active. Students may stay and work up to two years after graduation to seek employment.`,
  turkey: `Türkiye combines world-class English-medium universities (Boğaziçi, METU, Koç, Bilkent) with affordable tuition and a low cost of living. Türkiye Bursları — one of the world's most generous government scholarships — covers tuition, monthly stipend, housing, insurance, and a roundtrip ticket. A convenient geography lets students enjoy Europe, the Middle East, and Asia all at once.`,
  japan: `Japan hosts some of the world's most prestigious universities — Tokyo, Kyoto, Osaka, Tohoku, Keio, Waseda — with dedicated English-taught programs like PEAK, GLP, SILS. The MEXT scholarship offered by the Japanese government is one of the most comprehensive in the world, covering tuition, monthly allowance, and travel. Post-graduation job opportunities are strong, especially in tech.`,
  latvia: `Latvia offers an EU degree at a budget-friendly price. Riga Stradins University is the most popular European destination for English-medium MD, drawing students from over 50 countries. Riga Technical University and the University of Latvia offer affordable engineering, business, and CS programs. EU Schengen access included.`,
  malaysia: `Malaysia is a hidden gem — QS Top-100 universities (Universiti Malaya), English as the working language of higher education, and a warm, multicultural setting at a fraction of the cost of Singapore or Australia. Branch campuses of Monash, Nottingham, and others deliver globally recognised degrees.`
};

const template = (c) => {
  const sum = c.tuition_year;
  const live = c.living_year;
  const extra = c.extra;
  const cheap = (sum.bachelor || 0) + (live.dorm || 0) + (extra.documents || 0) + (extra.visa || 0) + (extra.insurance || 0) + (extra.flight || 0);
  const mid   = (sum.master || 0)   + (live.shared || 0) + (extra.documents || 0) + (extra.visa || 0) + (extra.insurance || 0) + (extra.flight || 0);
  const high  = (sum.phd || 0)      + (live.rent || 0) + (extra.documents || 0) + (extra.visa || 0) + (extra.insurance || 0) + (extra.flight || 0);

  const cross = data.countries
    .filter(x => x.slug !== c.slug)
    .slice(0, 6)
    .map(x => `          <a href="${x.slug}.html"><img src="../assets/flags/${x.code}.svg" alt="" width="26" height="18" loading="lazy" /> <span>${escape(x.name.en)}</span></a>`)
    .join('\n');

  const unis = (c.universities || [])
    .map(u => `          <article class="country-uni">
            <strong>${escape(u.name)}</strong>
            <small>${escape(u.desc)}</small>
            <span class="chip">${escape(u.chip)}</span>
          </article>`)
    .join('\n');

  const costRows = `          <tr><th>Programme</th><th>Tuition / year</th><th>Living / year</th></tr>
          <tr><td>Bachelor + dorm (budget)</td><td>$${sum.bachelor?.toLocaleString()}</td><td>$${live.dorm?.toLocaleString()}</td></tr>
          <tr><td>Master + shared (balanced)</td><td>$${sum.master?.toLocaleString()}</td><td>$${live.shared?.toLocaleString()}</td></tr>
          <tr><td>PhD / rent (premium)</td><td>$${sum.phd?.toLocaleString()}</td><td>$${live.rent?.toLocaleString()}</td></tr>
          <tr><td>Language programme</td><td>$${sum.language?.toLocaleString()}</td><td>—</td></tr>`;

  const firstDeadline = (c.typical_deadlines && c.typical_deadlines[0]) || null;
  const deadlineBlock = firstDeadline ? `<p><strong>Nearest intake:</strong> ${escape(firstDeadline.label)} — <time datetime="${escape(firstDeadline.date)}">${escape(firstDeadline.date)}</time></p>` : '';

  return `<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#0A2540" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="#0A0E1A" media="(prefers-color-scheme: dark)" />
  <title>Study in ${escape(c.name.en)} — United Global Consulting</title>
  <meta name="description" content="Study in ${escape(c.name.en)} with United Global Consulting: ${c.universities_count}+ partner universities, scholarships, visa guidance. From admission to arrival — full support in one place." />
  <link rel="canonical" href="https://unitedglobal.uz/countries/${c.slug}.html" />
  <meta name="robots" content="index,follow" />

  <link rel="alternate" hreflang="uz" href="https://unitedglobal.uz/countries/${c.slug}.html?lang=uz" />
  <link rel="alternate" hreflang="ru" href="https://unitedglobal.uz/countries/${c.slug}.html?lang=ru" />
  <link rel="alternate" hreflang="en" href="https://unitedglobal.uz/countries/${c.slug}.html?lang=en" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="Study in ${escape(c.name.en)} — United Global Consulting" />
  <meta property="og:description" content="${c.universities_count}+ partner universities in ${escape(c.name.en)}. Scholarships, admission, visa support." />
  <meta property="og:image" content="${escape(c.image)}" />
  <meta property="og:url" content="https://unitedglobal.uz/countries/${c.slug}.html" />

  <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
  <link rel="icon" type="image/png" href="../GLODAL.png" sizes="512x512" />
  <link rel="manifest" href="../manifest.webmanifest" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="../css/animations.css" />
  <link rel="stylesheet" href="../css/enhancements.css" />

  <script src="https://unpkg.com/lucide@0.456.0/dist/umd/lucide.min.js"
          integrity="sha384-xxUH8dZ+9qK6wOz3bNViyhHSIuVBQT5jsFlZAowZsRzRDsEqGjLGMJ/Wg10MPC3H"
          crossorigin="anonymous" referrerpolicy="no-referrer" defer></script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Study in ${escape(c.name.en)} — United Global Consulting",
        "description": "${c.universities_count}+ partner universities in ${escape(c.name.en)}. Scholarships, admission, visa support.",
        "image": "${escape(c.image)}",
        "author": {"@type":"Organization","name":"United Global Consulting"},
        "publisher": {"@type":"Organization","name":"United Global Consulting","logo":{"@type":"ImageObject","url":"https://unitedglobal.uz/GLODAL.png"}},
        "datePublished": "2026-04-21"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type":"ListItem","position":1,"name":"Home","item":"https://unitedglobal.uz/"},
          {"@type":"ListItem","position":2,"name":"Countries","item":"https://unitedglobal.uz/#countries"},
          {"@type":"ListItem","position":3,"name":"${escape(c.name.en)}","item":"https://unitedglobal.uz/countries/${c.slug}.html"}
        ]
      }
    ]
  }
  </script>

  <script>
  (function(){
    try{
      var t = localStorage.getItem('ugc_theme');
      if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', t);
    }catch(_){ document.documentElement.setAttribute('data-theme','light'); }
  })();
  </script>
  <style>
    .country-hero { --hero-image: url('${escape(c.image)}'); }
  </style>
</head>
<body class="country-page-body">
  <a href="#main" class="skip-link">Skip to main content</a>

  <header class="navbar" id="navbar">
    <div class="container nav-container">
      <a href="../index.html" class="nav-logo" aria-label="United Global Consulting — home">
        <span class="logo-icon"><i data-lucide="globe-2"></i></span>
        <span class="logo-text">
          <span class="logo-line-1">United Global</span>
          <span class="logo-line-2">Consulting</span>
        </span>
      </a>
      <nav class="nav-menu" aria-label="Primary">
        <a href="../index.html" class="nav-link">Home</a>
        <a href="../index.html#countries" class="nav-link">Countries</a>
        <a href="../index.html#services" class="nav-link">Services</a>
        <a href="../index.html#contact" class="nav-link">Contact</a>
      </nav>
      <div class="nav-actions">
        <a href="../index.html#contact" class="btn btn-primary nav-cta">
          <i data-lucide="message-circle"></i>
          <span>Free consultation</span>
        </a>
      </div>
    </div>
  </header>

  <main id="main">
    <section class="country-hero">
      <div class="container">
        <span class="eyebrow gold">DESTINATION</span>
        <h1>
          <img src="../assets/flags/${c.code}.svg" alt="Flag of ${escape(c.name.en)}" width="54" height="38" />
          <span>Study in ${escape(c.name.en)}</span>
        </h1>
        <p>${escape(c.universities_count)}+ partner universities in ${escape(c.capital)} and beyond. We handle admission, scholarship hunting, documents, and visa — end-to-end.</p>
        <div class="hero-actions">
          <a href="../index.html#contact" class="btn btn-primary btn-lg" data-ga-event="country_${c.slug}_cta">
            <i data-lucide="calendar-check-2"></i>
            <span>Get a free consultation</span>
          </a>
          <a href="https://wa.me/998885263000" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg" data-ga-event="country_${c.slug}_whatsapp">
            <i data-lucide="message-circle"></i>
            <span>Ask on WhatsApp</span>
          </a>
        </div>

        <div class="country-stats">
          <div class="country-stat"><strong>${c.universities_count}+</strong><small>Partner universities</small></div>
          <div class="country-stat"><strong>${escape(c.language)}</strong><small>Instruction language</small></div>
          <div class="country-stat"><strong>$${(sum.bachelor || 0).toLocaleString()}</strong><small>Bachelor tuition / year</small></div>
          <div class="country-stat"><strong>${escape(c.currency_local)}</strong><small>Local currency</small></div>
        </div>
      </div>
    </section>

    <section class="country-section">
      <div class="container">
        <h2>Why ${escape(c.name.en)}</h2>
        <p>${seoText[c.slug] || ''}</p>
        ${deadlineBlock}
      </div>
    </section>

    <section class="country-section" style="background:var(--bg-soft);">
      <div class="container">
        <h2>Partner universities</h2>
        <p>We work directly with the admissions offices of these institutions. You get vetted programs, proof-read applications, and scholarship strategy in one workflow.</p>
        <div class="country-universities">
${unis}
        </div>
      </div>
    </section>

    <section class="country-section">
      <div class="container">
        <h2>Typical costs (USD / year)</h2>
        <p>Figures below are indicative and vary by program, city, and lifestyle. We build a personalised budget during the free consultation.</p>
        <table class="country-cost-table">
${costRows}
        </table>
        <p><small>Budget total (bachelor + dorm, incl. documents/visa/insurance/flight): <strong>~$${cheap.toLocaleString()}</strong> · Balanced (master + shared): <strong>~$${mid.toLocaleString()}</strong> · Premium (PhD or rent): <strong>~$${high.toLocaleString()}</strong></small></p>
      </div>
    </section>

    <section class="country-section" style="background:var(--bg-soft);">
      <div class="container">
        <h2>What we do for you</h2>
        <ul>
          <li><strong>University selection</strong> — 3–5 matches against your GPA, IELTS, budget, career goal.</li>
          <li><strong>Admission docs</strong> — motivation letter, CV, SoP, reference letters — all proof-read in English.</li>
          <li><strong>Scholarship strategy</strong> — merit-based, need-based, and country-specific grants.</li>
          <li><strong>Translation &amp; apostille</strong> — fully notarised, submission-ready.</li>
          <li><strong>Visa</strong> — embassy-specific dossier, appointment booking, mock interview.</li>
          <li><strong>Post-arrival</strong> — housing, SIM, banking, onboarding.</li>
        </ul>
        <div style="margin-top:18px;">
          <a href="../index.html#contact" class="btn btn-primary btn-lg"><i data-lucide="send"></i><span>Apply for ${escape(c.name.en)}</span></a>
        </div>
      </div>
    </section>

    <section class="country-section">
      <div class="container">
        <h2>Explore other countries</h2>
        <div class="country-cross">
${cross}
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-bottom-row">
      <p>© <span id="footerYear">2026</span> United Global Consulting. All rights reserved.</p>
      <div class="footer-legal">
        <a href="../privacy.html">Privacy Policy</a>
        <span>•</span>
        <a href="../terms.html">Terms of Service</a>
      </div>
    </div>
  </footer>

  <a href="https://wa.me/998885263000" target="_blank" rel="noopener noreferrer" class="float-whatsapp" aria-label="Chat on WhatsApp" data-ga-event="country_${c.slug}_floating">
    <i data-lucide="message-circle"></i>
    <span class="float-pulse"></span>
  </a>

  <script>
    document.getElementById('footerYear').textContent = new Date().getFullYear();
    (function w(){
      if (window.lucide && lucide.createIcons) lucide.createIcons({ nameAttr: 'data-lucide' });
      else setTimeout(w, 100);
    })();
  </script>
</body>
</html>
`;
};

const outDir = resolve(root, 'countries');
mkdirSync(outDir, { recursive: true });

for (const c of data.countries) {
  const html = template(c);
  const file = resolve(outDir, c.slug + '.html');
  writeFileSync(file, html, 'utf8');
  console.log('wrote', file);
}

console.log('done:', data.countries.length, 'pages');
