#!/usr/bin/env node
/**
 * Harnais de mesure UI/perf pour le site Innotech Impact.
 *
 * Ce dépôt n'a pas de suite de tests ; ce script en tient lieu pour tout ce qui
 * est mesurable sur le build de production. Il sert dist/ derrière un petit
 * serveur qui injecte une sonde dans index.html, ouvre chaque route dans Chrome
 * headless, et compare les relevés aux seuils fixés par l'audit du 2026-09-01.
 *
 *   npm run build && npm run verify
 *
 * Sort en code 1 dès qu'un seuil est franchi.
 */

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { extname, join, resolve } from "node:path";

const execFileAsync = promisify(execFile);

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const PORT = 4319;

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/formation",
  "/contact",
  "/devis",
];
const VIEWPORTS = [
  { name: "desktop", size: "1440,900" },
  { name: "mobile", size: "390,844" },
];

/* ------------------------------------------------------------------ seuils */

const LIMITS = {
  homeBytes: 200_000, // accueil, tel qu'il voyage réellement (gzip)
  largestResource: 100_000, // aucune ressource unique au-dessus, gzip
  entryChunkBytes: 80_000, // chunk JS d'entrée, gzip
  textContrast: 4.5, // WCAG 2.2 AA, texte courant
  uiContrast: 3.0, // WCAG 2.2 SC 1.4.11, limites de contrôles
  targetPx: 24, // WCAG 2.2 SC 2.5.8
  stripClipPx: 0,
};

/* ------------------------------------------------------------------ couleur */

const hexToRgb = (h) => {
  let s = h.trim().replace("#", "");
  if (s.length === 3) s = [...s].map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
};

const luminance = ([r, g, b]) => {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

const contrast = (fg, bg) => {
  const a = luminance(hexToRgb(fg));
  const b = luminance(hexToRgb(bg));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

/** Aplatit une couleur rgba() sur un fond opaque, pour mesurer une bordure. */
const flatten = (rgba, bgHex) => {
  const m = rgba.match(/rgba?\(([^)]+)\)/);
  if (!m) return rgba;
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  const [r, g, b, alpha = 1] = parts;
  const bg = hexToRgb(bgHex);
  const out = [r, g, b].map((v, i) =>
    Math.round(v * alpha + bg[i] * (1 - alpha)),
  );
  return "#" + out.map((v) => v.toString(16).padStart(2, "0")).join("");
};

/** Lit les tokens du bloc :root de src/index.css. */
function readTokens() {
  const css = readFileSync(join(ROOT, "src/index.css"), "utf8");
  const block = css.match(/:root\s*\{([^}]*)\}/);
  if (!block) throw new Error("bloc :root introuvable dans src/index.css");
  const tokens = {};
  for (const decl of block[1].split(";")) {
    const m = decl.match(/\s*(--[\w-]+)\s*:\s*(.+)/);
    if (m) tokens[m[1]] = m[2].trim();
  }
  return tokens;
}

/* ------------------------------------------------------------------- sonde */

/** Injectée dans la page ; écrit son relevé dans un <script type="application/json">. */
const PROBE = `
<script>
window.addEventListener('load', () => setTimeout(() => {
  const out = { resources: [], headings: [], targets: [], overflow: null, clip: null };

  for (const r of performance.getEntriesByType('resource')) {
    out.resources.push({ name: r.name, bytes: r.transferSize || r.encodedBodySize || 0, type: r.initiatorType });
  }

  const doc = document.documentElement;
  out.overflow = { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };

  // La bande signal déborde volontairement de la section héros pour chevaucher
  // la suivante. Ce qui compte n'est donc pas le débordement, mais qu'un ancêtre
  // le découpe : on remonte la chaîne et on mesure ce qui est réellement rogné.
  const strip = document.querySelector('.signal-strip');
  if (strip) {
    const box = strip.getBoundingClientRect();
    let clipped = 0;
    for (let el = strip.parentElement; el; el = el.parentElement) {
      const cs = getComputedStyle(el);
      if (cs.overflowY === 'visible') continue;
      const bounds = el.getBoundingClientRect();
      clipped = Math.max(clipped, box.bottom - bounds.bottom, bounds.top - box.top);
    }
    out.clip = Math.max(0, clipped);
  }

  const describe = (el) => {
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      text: (el.textContent || '').trim().slice(0, 40),
      family: cs.fontFamily.split(',')[0].replace(/["']/g, ''),
      size: parseFloat(cs.fontSize),
    };
  };
  for (const h of document.querySelectorAll('h1')) out.headings.push({ level: 1, ...describe(h) });
  for (const h of document.querySelectorAll('main h2')) out.headings.push({ level: 2, ...describe(h) });

  for (const el of document.querySelectorAll('a[href], button, input, select, textarea')) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (r.height >= ${LIMITS.targetPx} && r.width >= ${LIMITS.targetPx}) continue;
    out.targets.push({
      tag: el.tagName,
      cls: el.className && typeof el.className === 'string' ? el.className : '',
      text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30),
      w: Math.round(r.width),
      h: Math.round(r.height),
    });
  }

  const s = document.createElement('script');
  s.type = 'application/json';
  s.id = 'ui-probe';
  s.textContent = JSON.stringify(out);
  document.body.appendChild(s);
}, 1200));
</script>`;

/* ------------------------------------------------------------------ serveur */

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
};

function startServer() {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let file = join(DIST, decodeURIComponent(url.pathname));
    let isHtml = false;

    if (!existsSync(file) || extname(file) === "") {
      file = join(DIST, "index.html");
      isHtml = true;
    } else if (extname(file) === ".html") {
      isHtml = true;
    }

    try {
      let body = await readFile(file);
      if (isHtml)
        body = Buffer.from(
          body.toString("utf8").replace("</body>", `${PROBE}</body>`),
        );
      res.writeHead(200, {
        "Content-Type": MIME[extname(file)] || "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise((ok) => server.listen(PORT, () => ok(server)));
}

/* ------------------------------------------------------------------- chrome */

function findChrome() {
  for (const bin of [
    "google-chrome-stable",
    "google-chrome",
    "chromium",
    "chromium-browser",
  ]) {
    try {
      execFileSync(bin, ["--version"], { stdio: "ignore" });
      return bin;
    } catch {
      /* suivant */
    }
  }
  throw new Error(
    "aucun binaire Chrome trouvé (google-chrome-stable, chromium…)",
  );
}

async function probe(chrome, route, size) {
  const { stdout } = await execFileAsync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--virtual-time-budget=8000",
      `--window-size=${size}`,
      "--dump-dom",
      `http://localhost:${PORT}${route}`,
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  );

  const m = stdout.match(
    /<script type="application\/json" id="ui-probe">([\s\S]*?)<\/script>/,
  );
  if (!m) throw new Error(`sonde absente sur ${route} @ ${size}`);
  return JSON.parse(
    m[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
  );
}

/* ------------------------------------------------------------------ rapport */

const results = [];
const check = (ok, label, detail) => {
  results.push({ ok, label, detail });
  console.log(
    `  ${ok ? "\x1b[32mOK  \x1b[0m" : "\x1b[31mFAIL\x1b[0m"} ${label}${detail ? ` — ${detail}` : ""}`,
  );
};

const kb = (n) => `${(n / 1000).toFixed(1)} kB`;

async function main() {
  if (!existsSync(DIST)) {
    console.error("dist/ absent — lancer `npm run build` d'abord.");
    process.exit(1);
  }

  const chrome = findChrome();
  const server = await startServer();
  console.log(`\nHarnais UI — dist/ servi sur :${PORT}, ${chrome}\n`);

  try {
    /* --- 1. poids du premier chargement de l'accueil ---------------------- */
    console.log("\x1b[1mPoids réseau\x1b[0m");
    const home = await probe(chrome, "/", "1440,900");

    // Le serveur du harnais ne compresse pas ; on recalcule ce que la ressource
    // pèserait sur un hébergeur réel. Les images sont déjà compressées, gzip ne
    // leur retire rien — la mesure reste juste pour elles aussi.
    for (const r of home.resources) {
      try {
        const local = join(DIST, new URL(r.name).pathname.replace(/^\//, ""));
        if (existsSync(local)) r.bytes = gzipSync(readFileSync(local)).length;
      } catch {
        /* ressource distante (polices) : on garde transferSize */
      }
    }

    const total = home.resources.reduce((s, r) => s + r.bytes, 0);
    const biggest = [...home.resources].sort((a, b) => b.bytes - a.bytes)[0];

    check(
      total < LIMITS.homeBytes,
      "poids accueil",
      `${kb(total)} gzip (seuil ${kb(LIMITS.homeBytes)})`,
    );
    check(
      !biggest || biggest.bytes < LIMITS.largestResource,
      "plus grosse ressource",
      biggest
        ? `${kb(biggest.bytes)} — ${biggest.name.split("/").pop()}`
        : "aucune",
    );
    for (const r of [...home.resources]
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 6)) {
      console.log(
        `       ${kb(r.bytes).padStart(9)}  ${r.name.split("/").pop()}`,
      );
    }

    /* --- 2. chunk d'entrée ----------------------------------------------- */
    const scripts = home.resources.filter(
      (r) => r.type === "script" && r.name.includes("/assets/"),
    );
    const entry = [...scripts].sort((a, b) => b.bytes - a.bytes)[0];
    if (entry) {
      check(
        entry.bytes < LIMITS.entryChunkBytes,
        "chunk JS d'entrée",
        `${kb(entry.bytes)} gzip (seuil ${kb(LIMITS.entryChunkBytes)})`,
      );
    }

    /* --- 3. hiérarchie typographique ------------------------------------- */
    console.log("\n\x1b[1mHiérarchie des titres\x1b[0m");
    const badHeadings = [];
    for (const route of ROUTES) {
      const page = await probe(chrome, route, "1440,900");
      const h1 = page.headings.find((h) => h.level === 1);
      const h2 = page.headings.find((h) => h.level === 2);
      if (!h1) {
        badHeadings.push(`${route}: aucun h1`);
        continue;
      }
      if (h2 && h1.size <= h2.size) {
        badHeadings.push(
          `${route}: h1 ${h1.family} ${h1.size}px ≤ h2 ${h2.family} ${h2.size}px`,
        );
      }
    }
    check(
      badHeadings.length === 0,
      "h1 dominant sur les 8 routes",
      badHeadings.join(" · ") || "toutes correctes",
    );

    /* --- 4. rognage de la bande signal ----------------------------------- */
    console.log("\n\x1b[1mGéométrie\x1b[0m");
    check(
      home.clip <= LIMITS.stripClipPx,
      "bande signal non rognée",
      `${home.clip.toFixed(1)} px rognés`,
    );

    /* --- 5. débordement horizontal --------------------------------------- */
    const overflows = [];
    for (const vp of VIEWPORTS) {
      for (const route of ROUTES) {
        const page = await probe(chrome, route, vp.size);
        const { scrollWidth, clientWidth } = page.overflow;
        if (scrollWidth > clientWidth)
          overflows.push(`${route} @${vp.name}: ${scrollWidth}>${clientWidth}`);
      }
    }
    check(
      overflows.length === 0,
      "aucun débordement horizontal",
      overflows.join(" · ") || "16 vues testées",
    );

    /* --- 6. cibles tactiles ---------------------------------------------- */
    const small = new Map();
    for (const vp of VIEWPORTS) {
      for (const route of ROUTES) {
        const page = await probe(chrome, route, vp.size);
        for (const t of page.targets) {
          small.set(
            `${t.tag}.${t.cls}|${t.text}`,
            `${t.text || t.cls || t.tag} ${t.w}×${t.h}`,
          );
        }
      }
    }
    check(
      small.size === 0,
      `cibles ≥ ${LIMITS.targetPx} px`,
      small.size
        ? [...small.values()].slice(0, 6).join(" · ")
        : "toutes conformes",
    );

    /* --- 7. contrastes --------------------------------------------------- */
    console.log("\n\x1b[1mContraste (WCAG 2.2)\x1b[0m");
    const t = readTokens();
    const need = (name) => {
      if (!t[name]) throw new Error(`token ${name} absent de src/index.css`);
      return t[name];
    };

    const textPairs = [
      ["--lime-deep sur --paper", need("--lime-deep"), need("--paper")],
      ["--lime-deep sur blanc", need("--lime-deep"), "#ffffff"],
      ["--lime-deep sur --lime-pale", need("--lime-deep"), need("--lime-pale")],
      ["--muted sur --paper", need("--muted"), need("--paper")],
      ["--ink sur --paper", need("--ink"), need("--paper")],
      // Les eyebrows et index vivent aussi sur --night et --ink (page-hero,
      // section--dark, cartes inversées au survol) : --lime y prend le relais.
      ["--lime sur --night", need("--lime"), need("--night")],
      ["--lime sur --ink", need("--lime"), need("--ink")],
    ];
    const textFails = [];
    for (const [label, fg, bg] of textPairs) {
      const ratio = contrast(fg, bg);
      const ok = ratio >= LIMITS.textContrast;
      if (!ok) textFails.push(label);
      console.log(
        `       ${ratio.toFixed(2).padStart(6)}:1  ${ok ? "" : "\x1b[31m← \x1b[0m"}${label}`,
      );
    }
    check(
      textFails.length === 0,
      `texte ≥ ${LIMITS.textContrast}:1`,
      textFails.join(" · ") || `${textPairs.length} paires`,
    );

    const inputLine = t["--line-input"];
    if (!inputLine) {
      check(
        false,
        `bordures de contrôles ≥ ${LIMITS.uiContrast}:1`,
        "token --line-input absent",
      );
    } else {
      const onWhite = contrast(flatten(inputLine, "#ffffff"), "#ffffff");
      const onPaper = contrast(
        flatten(inputLine, need("--paper")),
        need("--paper"),
      );
      const ok = onWhite >= LIMITS.uiContrast && onPaper >= LIMITS.uiContrast;
      console.log(
        `       ${onWhite.toFixed(2).padStart(6)}:1  --line-input sur blanc`,
      );
      console.log(
        `       ${onPaper.toFixed(2).padStart(6)}:1  --line-input sur --paper`,
      );
      check(
        ok,
        `bordures de contrôles ≥ ${LIMITS.uiContrast}:1`,
        ok ? "" : "sous le seuil",
      );
    }
  } finally {
    server.close();
  }

  const failed = results.filter((r) => !r.ok);
  console.log(
    `\n${results.length - failed.length}/${results.length} vérifications passées.\n`,
  );
  if (failed.length) process.exit(1);
}

main().catch((err) => {
  console.error(`\n\x1b[31mHarnais interrompu :\x1b[0m ${err.message}\n`);
  process.exit(1);
});
