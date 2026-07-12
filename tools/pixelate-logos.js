// Pipeline di pixel-artizzazione stile SNES/Neo Geo per i loghi in
// assets/loghi/: rimozione sfondo (flood-fill dai bordi), downscale alla
// risoluzione target (fino a 320x224, la risoluzione nativa Neo Geo — non
// la dimensione del file esportato, ma quanti pixel DISTINTI compongono il
// disegno), quantizzazione palette (k-means semplice). Nessuna dipendenza
// nativa: tutto il lavoro sui pixel gira in un canvas dentro Chromium via
// Playwright.
//
// Uso: node tools/pixelate-logos.js [filtro1] [filtro2] ...
//   - Senza argomenti: processa tutti i file in assets/loghi/.
//   - Con argomenti: processa solo i file il cui nome contiene una delle
//     stringhe date (es. `node tools/pixelate-logos.js roma milan`).
// Alla fine stampa il manifest TEAM_LOGO_FILES aggiornato — va incollato a
// mano in assets/js/main.js (il progetto non ha uno step di build).
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const LOGHI_DIR = path.join(ROOT, 'assets', 'loghi');
const OUT_DIR = path.join(LOGHI_DIR, 'pixel');

const PALETTE = 28;   // colori massimi nella palette (4bpp, stile SNES/Neo Geo)
const BG_TOLERANCE = 40; // distanza colore massima per considerare un pixel "sfondo"
const CONTENT_PADDING = 0.06; // margine (% della griglia) tra il contenuto e il bordo, dopo il ritaglio automatico
// Risoluzione MASSIMA della griglia pixel-art (320x224, la risoluzione
// nativa dello schermo Neo Geo) — il logo (quasi sempre circa quadrato)
// viene dimensionato per starci dentro rispettando le proporzioni, quindi
// userà tipicamente ~224x224 (il lato corto), non l'intero rettangolo: non
// c'è letterbox/margine vuoto, il file esportato ha esattamente le
// dimensioni del contenuto pixelato.
const MAX_GRID_W = 320;
const MAX_GRID_H = 224;

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

const PIXELATE_FN = `
async function pixelateImage(fileUrl, maxGridW, maxGridH, palette, bgTolerance, padding) {
  const img = await new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = fileUrl;
  });

  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = img.naturalWidth;
  srcCanvas.height = img.naturalHeight;
  const sctx = srcCanvas.getContext('2d');
  sctx.drawImage(img, 0, 0);
  const srcData = sctx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
  const W = srcCanvas.width, H = srcCanvas.height;
  const px = srcData.data;

  // ── Rimozione sfondo: flood-fill (BFS) da tutti i pixel di bordo, marcando
  // come sfondo ogni pixel raggiungibile entro la tolleranza colore dal
  // colore medio degli angoli — preserva regioni interne dello stesso colore
  // (es. bianco dentro lo stemma) che non sono collegate al bordo.
  const bgMask = new Uint8Array(W * H); // 1 = sfondo (da rendere trasparente)
  const idx = (x, y) => y * W + x;
  const colorAt = (x, y) => {
    const o = idx(x, y) * 4;
    return [px[o], px[o + 1], px[o + 2], px[o + 3]];
  };
  const dist = (a, b) => Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);

  const corners = [colorAt(0,0), colorAt(W-1,0), colorAt(0,H-1), colorAt(W-1,H-1)];
  const bgRef = [0,1,2].map(c => corners.reduce((s,p)=>s+p[c],0)/4);
  const visited = new Uint8Array(W * H);
  const queue = [];
  for (let x = 0; x < W; x++) { queue.push([x, 0]); queue.push([x, H - 1]); }
  for (let y = 0; y < H; y++) { queue.push([0, y]); queue.push([W - 1, y]); }
  let qi = 0;
  while (qi < queue.length) {
    const [x, y] = queue[qi++];
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const i = idx(x, y);
    if (visited[i]) continue;
    const c = colorAt(x, y);
    const isBg = c[3] < 10 || dist(c, bgRef) < bgTolerance;
    if (!isBg) { visited[i] = 1; continue; }
    visited[i] = 1;
    bgMask[i] = 1;
    if (x > 0) queue.push([x - 1, y]);
    if (x < W - 1) queue.push([x + 1, y]);
    if (y > 0) queue.push([x, y - 1]);
    if (y < H - 1) queue.push([x, y + 1]);
  }
  // Rete di sicurezza: se il flood-fill "sfonda" attraverso un disegno
  // tratteggiato/a linee sottili (es. un cavallo disegnato con trama di
  // linee nere su sfondo bianco pieno — il bianco delle fessure è
  // letteralmente identico e connesso allo sfondo, nessun metodo a colore
  // può distinguerli) e cancella quasi tutta l'immagine, è meglio NON
  // rimuovere lo sfondo affatto piuttosto che perdere il logo — meglio un
  // riquadro bianco visibile che uno stemma sparito.
  let removedCount = 0;
  for (let i = 0; i < W * H; i++) if (bgMask[i]) removedCount++;
  const bgSkipped = removedCount > W * H * 0.90;
  if (!bgSkipped) {
    for (let i = 0; i < W * H; i++) {
      if (bgMask[i]) px[i * 4 + 3] = 0;
    }
  }
  sctx.putImageData(srcData, 0, 0);

  // ── Ritaglio al contenuto: trova il bounding box del contenuto opaco
  // DIRETTAMENTE sul sorgente a piena risoluzione (non su una griglia già
  // rimpicciolita) — massima precisione per il passo successivo. ──
  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (px[idx(x, y) * 4 + 3] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const contentW = Math.max(1, maxX - minX + 1);
  const contentH = Math.max(1, maxY - minY + 1);

  // ── Dimensiona la griglia pixel-art in base al contenuto: rispetta le
  // proporzioni reali dello stemma (di solito ~quadrato) invece di forzarlo
  // in un riquadro quadrato o in un frame con bande vuote — usa fino a
  // maxGridW x maxGridH (320x224, risoluzione Neo Geo) di dettaglio VERO,
  // scalando il lato più corto in proporzione. Il margine (padding) lascia
  // un piccolo respiro dai bordi del file esportato. ──
  const usableW = maxGridW * (1 - padding * 2);
  const usableH = maxGridH * (1 - padding * 2);
  const scale = Math.min(usableW / contentW, usableH / contentH);
  const gridContentW = Math.max(1, Math.round(contentW * scale));
  const gridContentH = Math.max(1, Math.round(contentH * scale));
  const marginX = Math.round(gridContentW * padding / (1 - padding * 2));
  const marginY = Math.round(gridContentH * padding / (1 - padding * 2));
  const gridW = gridContentW + marginX * 2;
  const gridH = gridContentH + marginY * 2;

  // ── Downscale morbido dal ritaglio a piena risoluzione direttamente alla
  // griglia finale (smoothing acceso: media d'area, non nearest-neighbor
  // rumoroso) — un solo passo, niente step intermedio a bassa risoluzione. ──
  const gridCanvas = document.createElement('canvas');
  gridCanvas.width = gridW;
  gridCanvas.height = gridH;
  const gctx = gridCanvas.getContext('2d');
  gctx.imageSmoothingEnabled = true;
  gctx.imageSmoothingQuality = 'high';
  gctx.clearRect(0, 0, gridW, gridH);
  gctx.drawImage(srcCanvas, minX, minY, contentW, contentH, marginX, marginY, gridContentW, gridContentH);
  const gridData = gctx.getImageData(0, 0, gridW, gridH);
  const gd = gridData.data;

  // ── Quantizzazione palette: k-means semplice sui pixel opachi ──
  const samples = [];
  for (let i = 0; i < gridW * gridH; i++) {
    const o = i * 4;
    if (gd[o + 3] > 40) samples.push([gd[o], gd[o+1], gd[o+2]]);
  }
  let centroids = [];
  if (samples.length <= palette) {
    centroids = samples.slice();
  } else {
    // inizializzazione: campiona a passo fisso lungo l'array (semplice, deterministica)
    const step = Math.floor(samples.length / palette);
    for (let k = 0; k < palette; k++) centroids.push(samples[Math.min(samples.length - 1, k * step)].slice());
    for (let iter = 0; iter < 8; iter++) {
      const sums = centroids.map(() => [0, 0, 0, 0]);
      for (const s of samples) {
        let best = 0, bestD = Infinity;
        for (let k = 0; k < centroids.length; k++) {
          const d = (s[0]-centroids[k][0])**2 + (s[1]-centroids[k][1])**2 + (s[2]-centroids[k][2])**2;
          if (d < bestD) { bestD = d; best = k; }
        }
        sums[best][0] += s[0]; sums[best][1] += s[1]; sums[best][2] += s[2]; sums[best][3]++;
      }
      for (let k = 0; k < centroids.length; k++) {
        if (sums[k][3] > 0) centroids[k] = [sums[k][0]/sums[k][3], sums[k][1]/sums[k][3], sums[k][2]/sums[k][3]];
      }
    }
  }
  const nearestCentroid = (r, g, b) => {
    let best = 0, bestD = Infinity;
    for (let k = 0; k < centroids.length; k++) {
      const d = (r-centroids[k][0])**2 + (g-centroids[k][1])**2 + (b-centroids[k][2])**2;
      if (d < bestD) { bestD = d; best = k; }
    }
    return centroids[best];
  };
  for (let i = 0; i < gridW * gridH; i++) {
    const o = i * 4;
    if (gd[o + 3] <= 40) { gd[o]=0; gd[o+1]=0; gd[o+2]=0; gd[o+3]=0; continue; }
    const c = nearestCentroid(gd[o], gd[o+1], gd[o+2]);
    gd[o] = Math.round(c[0]); gd[o+1] = Math.round(c[1]); gd[o+2] = Math.round(c[2]); gd[o+3] = 255; // alpha binario: bordi netti
  }
  gctx.putImageData(gridData, 0, 0);

  return { dataUrl: gridCanvas.toDataURL('image/png'), bgSkipped };
}
`;

async function main() {
  const onlyFiles = process.argv.slice(2); // opzionale: nomi file specifici da processare (test su un paio)
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const allFiles = fs.readdirSync(LOGHI_DIR).filter(f => {
    const full = path.join(LOGHI_DIR, f);
    return fs.statSync(full).isFile() && /\.(png|svg|webp|jpe?g)$/i.test(f);
  });
  const files = onlyFiles.length ? allFiles.filter(f => onlyFiles.some(o => f.toLowerCase().includes(o.toLowerCase()))) : allFiles;
  console.log('File da processare:', files);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.addScriptTag({ content: PIXELATE_FN });

  const MIME = { '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };

  for (const file of files) {
    const srcPath = path.join(LOGHI_DIR, file);
    // Carica il sorgente come data: URI (letto e base64-codificato in Node)
    // invece di un file:// URL: da about:blank, Chromium tratta ogni
    // risorsa file:// come cross-origin e "sporca" il canvas (getImageData
    // bloccato) — un data: URI evita del tutto il problema perché i pixel
    // sono incorporati direttamente, nessun fetch cross-origin coinvolto.
    const ext = path.extname(file).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    const dataUri = `data:${mime};base64,${fs.readFileSync(srcPath).toString('base64')}`;
    const teamKey = slugify(path.basename(file, ext));
    try {
      const { dataUrl, bgSkipped } = await page.evaluate(
        ([url, mgw, mgh, palette, tol, pad]) => pixelateImage(url, mgw, mgh, palette, tol, pad),
        [dataUri, MAX_GRID_W, MAX_GRID_H, PALETTE, BG_TOLERANCE, CONTENT_PADDING]
      );
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
      const outPath = path.join(OUT_DIR, teamKey + '.png');
      fs.writeFileSync(outPath, Buffer.from(base64, 'base64'));
      console.log('OK:', file, '->', path.relative(ROOT, outPath), bgSkipped ? '⚠️  SFONDO NON RIMOSSO (disegno a linee sottili, verifica manuale consigliata)' : '');
    } catch (e) {
      console.log('ERRORE su', file, ':', e.message);
    }
  }

  await browser.close();

  // Stampa il manifest TEAM_LOGO_FILES aggiornato (scansiona TUTTI i file
  // presenti, non solo quelli appena processati in questa run) — va
  // incollato a mano in assets/js/main.js (nessun build step nel progetto).
  const manifestFiles = fs.readdirSync(LOGHI_DIR).filter(f => {
    const full = path.join(LOGHI_DIR, f);
    return fs.statSync(full).isFile() && /\.(png|svg|webp|jpe?g)$/i.test(f);
  });
  const manifest = {};
  manifestFiles.forEach(f => {
    manifest[slugify(path.basename(f, path.extname(f)))] = f;
  });
  console.log('\n── Manifest aggiornato (incolla in TEAM_LOGO_FILES, assets/js/main.js) ──');
  console.log(
    'const TEAM_LOGO_FILES = {\n' +
    Object.entries(manifest).map(([k, v]) => `  '${k}': '${v}',`).join('\n') +
    '\n};'
  );
}

main();
