const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const FRESH = process.argv.includes('--fresh');
const LOG_FILE = path.resolve(__dirname, '_play_log.txt');
if (FRESH) fs.writeFileSync(LOG_FILE, '');
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  // Scrittura asincrona: fs.appendFileSync ha bloccato l'intero event loop
  // (watchdog incluso, perché il suo stesso log() usava la stessa chiamata
  // sincrona) durante un run precedente rimasto fermo per oltre un'ora senza
  // che nulla intercettasse il blocco.
  fs.appendFile(LOG_FILE, line + '\n', () => {});
}

let lastActivity = Date.now();
const WATCHDOG_TIMEOUT_MS = 90 * 1000;
const watchdogTimer = setInterval(() => {
  if (Date.now() - lastActivity > WATCHDOG_TIMEOUT_MS) {
    log(`WATCHDOG: no activity for ${WATCHDOG_TIMEOUT_MS / 1000}s, page/browser appears hung. Forcing exit.`);
    process.exit(1);
  }
}, 10000);
watchdogTimer.unref();

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('OP-TIMEOUT:' + label)), ms)),
  ]);
}

const USER_DATA_DIR = path.resolve(__dirname, '_play_profile');

(async () => {
  const context = await chromium.launchPersistentContext(USER_DATA_DIR, { headless: true });
  const page = context.pages()[0] || await context.newPage();
  const errors = [];
  page.on('pageerror', err => { errors.push(err.message); log('PAGEERROR: ' + err.message); });
  page.on('console', msg => { if (msg.type() === 'error') log('CONSOLE-ERROR: ' + msg.text()); });
  page.on('crash', () => { log('PAGE CRASHED. Forcing exit.'); process.exit(1); });

  const url = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  await page.goto(url);
  await page.waitForTimeout(500);

  const isVisible = async (sel) => {
    lastActivity = Date.now();
    try {
      const el = await withTimeout(page.$(sel), 5000, 'isVisible-$');
      if (!el) return false;
      return await withTimeout(el.isVisible().catch(() => false), 5000, 'isVisible-check');
    } catch (e) {
      return false;
    }
  };
  const clickIfVisible = async (sel) => {
    lastActivity = Date.now();
    try {
      const el = await withTimeout(page.$(sel), 5000, 'clickIfVisible-$');
      if (el && await withTimeout(el.isVisible().catch(() => false), 5000, 'clickIfVisible-check')) {
        try { await el.click({ timeout: 2000 }); return true; } catch (e) { return false; }
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // ── Riprendi da salvataggio (profilo persistente) se presente, altrimenti
  // avvia una carriera nuova (scelta libera, squadra di metà classifica in C) ──
  const resumeBtn = await page.$('#cs-resume');
  if (resumeBtn && await resumeBtn.isVisible().catch(() => false)) {
    await resumeBtn.click();
    await page.waitForTimeout(500);
    log('Resumed career from persisted save.');
  } else {
    await page.click('#cs-free');
    await page.waitForTimeout(300);
    await page.click('#ds-name-confirm');
    await page.waitForTimeout(300);
    const startTeam = await page.evaluate(() => 'Pescara');
    await page.click(`.ts-team-btn[data-team-name="${startTeam}"]`);
    await page.waitForTimeout(500);
    log(`Career started with ${startTeam} (Serie C)`);
  }

  const fixMarketBlockers = async () => {
    for (let attempt = 0; attempt < 25; attempt++) {
      const note = await page.evaluate(() => document.querySelector('.mm-footer-note')?.textContent || '');
      if (!note) return;
      if (note.includes('Rispondi prima')) {
        await clickIfVisible('[data-tab="offerte"]');
        await page.waitForTimeout(150);
        if (await clickIfVisible('[data-action="refuse-offer"]')) { await page.waitForTimeout(150); continue; }
        break;
      }
      if (note.includes('Scegli un allenatore')) {
        await clickIfVisible('[data-tab="panchina"]');
        await page.waitForTimeout(150);
        if (await clickIfVisible('[data-action="hire-coach"]')) { await page.waitForTimeout(150); continue; }
        if (await clickIfVisible('[data-action="hire-emerging"]')) { await page.waitForTimeout(150); continue; }
        break;
      }
      if (note.includes('Budget negativo')) {
        await clickIfVisible('[data-tab="rosa"]');
        await page.waitForTimeout(150);
        if (await clickIfVisible('[data-action="rosa-open-sell"]')) {
          await page.waitForTimeout(150);
          if (!(await clickIfVisible('[data-offer-idx="0"]'))) await clickIfVisible('#offer-picker-close');
          await page.waitForTimeout(150);
          continue;
        }
        break;
      }
      if (note.includes('giocatori in rosa')) {
        await clickIfVisible('[data-tab="acquisti"]');
        await page.waitForTimeout(150);
        if (await clickIfVisible('[data-action="buy-fa"]')) { await page.waitForTimeout(150); continue; }
        if (await clickIfVisible('[data-action="loan-in"]')) { await page.waitForTimeout(150); continue; }
        break;
      }
      break; // "Tutto a posto" or unrecognized
    }
  };

  const pickHighestBudgetOffer = async () => {
    const idx = await withTimeout(page.evaluate(() => {
      const rows = [...document.querySelectorAll('[data-offer-idx]')];
      let best = -1, bestBudget = -1;
      rows.forEach(r => {
        const i = +r.dataset.offerIdx;
        const row = r.closest('.mm-row');
        const text = row ? row.textContent : '';
        const m = text.match(/(\d+)M€/);
        const budget = m ? +m[1] : 0;
        if (budget > bestBudget) { bestBudget = budget; best = i; }
      });
      return best;
    }), 5000, 'pickHighestBudgetOffer').catch(() => -1);
    if (idx >= 0) return clickIfVisible(`[data-offer-idx="${idx}"]`);
    return clickIfVisible('#jo-decline');
  };

  let stuckCounter = 0;
  let totalTicks = 0;
  const MAX_TICKS = 200000;
  let lastSeasonCount = -1;
  let lastProgressKey = '';

  while (totalTicks < MAX_TICKS) {
    totalTicks++;
    lastActivity = Date.now();
    let acted = false;

    if (await isVisible('[data-mr-action="renew"]:not([disabled])')) {
      acted = await clickIfVisible('[data-mr-action="renew"]:not([disabled])');
    } else if (await isVisible('[data-mr-action="release"]')) {
      acted = await clickIfVisible('[data-mr-action="release"]');
    } else if (await isVisible('[data-offer-idx]') && await isVisible('#jo-decline')) {
      acted = await pickHighestBudgetOffer();
    } else if (await isVisible('[data-outcome="offers"]')) {
      acted = await clickIfVisible('[data-outcome="offers"]');
    } else if (await isVisible('[data-outcome="renew"]')) {
      acted = await clickIfVisible('[data-outcome="renew"]');
    } else if (await isVisible('[data-outcome="stay"]')) {
      acted = await clickIfVisible('[data-outcome="stay"]');
    } else if (await clickIfVisible('#previsioni-continue')) {
      acted = true;
    } else if (await clickIfVisible('#pb-close')) {
      acted = true;
    } else if (await isVisible('#mr-confirm:not([disabled])')) {
      acted = await clickIfVisible('#mr-confirm:not([disabled])');
    } else if (await clickIfVisible('#season-formation-continue')) {
      acted = true;
    } else if (await isVisible('#wm-confirm')) {
      const wmDisabled = await withTimeout(page.evaluate(() => document.getElementById('wm-confirm')?.disabled), 5000, 'wmDisabled').catch(() => false);
      if (wmDisabled) {
        if (await clickIfVisible('[data-action="buy-fa"]')) acted = true;
        else if (await clickIfVisible('[data-action="loan-in"]')) acted = true;
        else if (await clickIfVisible('[data-tab="acquisti"]')) acted = true;
        else if (await clickIfVisible('[data-tab="prestiti"]')) acted = true;
      } else {
        acted = await clickIfVisible('#wm-confirm');
      }
    } else if (await isVisible('#mm-confirm') || await isVisible('#mtc-continue')) {
      await fixMarketBlockers();
      if (await clickIfVisible('#mm-confirm')) acted = true;
      else if (await clickIfVisible('#mtc-continue')) acted = true;
    } else if (await clickIfVisible('[data-action="refuse-offer"]')) {
      acted = true;
    } else if (await clickIfVisible('#simulaTutto')) {
      acted = true;
    } else if (await clickIfVisible('#simulaStagione')) {
      acted = true;
    }

    await page.waitForTimeout(acted ? 60 : 200);

    if (errors.length) {
      log(`STOPPED due to page error. Total errors: ${errors.length}`);
      break;
    }

    if (totalTicks % 30 === 0) {
      const mdInfo = await withTimeout(page.evaluate(() => {
        let pos = null;
        if (playerTeam) {
          const table = playerTeam.leagueLevel === 'A' ? standingsA : playerTeam.leagueLevel === 'B' ? standingsB : standingsC;
          const sorted = Object.entries(table).sort((a, b) => (b[1].points - a[1].points) || ((b[1].goalsFor - b[1].goalsAgainst) - (a[1].goalsFor - a[1].goalsAgainst)));
          const idx = sorted.findIndex(([name]) => name === playerTeam.name);
          pos = idx >= 0 ? idx + 1 : null;
        }
        return { seasonPhase, currentMatchday, pos };
      }), 4000, 'mdInfo').catch(() => null);
      if (mdInfo) log(`Matchday check: phase=${mdInfo.seasonPhase} giornata=${mdInfo.currentMatchday} posizione=${mdInfo.pos || '?'}`);
    }

    const sc = await withTimeout(page.evaluate(() => typeof seasonCount !== 'undefined' ? seasonCount : -1), 5000, 'seasonCount').catch(() => lastSeasonCount);
    if (sc !== lastSeasonCount) {
      const info = await withTimeout(page.evaluate(() => {
        const h = dsCareer && dsCareer.history.length ? dsCareer.history[dsCareer.history.length - 1] : null;
        return {
          team: playerTeam ? playerTeam.name : null,
          league: playerTeam ? playerTeam.leagueLevel : null,
          budget: playerTeam ? +playerTeam.budget.toFixed(1) : null,
          rosterSize: playerTeam ? playerTeam.roster.length : null,
          reputation: dsCareer ? dsCareer.reputation : null,
          historyLen: dsCareer ? dsCareer.history.length : 0,
          lastSeason: h ? { season: h.season, team: h.team, league: h.league, rank: h.rank, objective: h.objective, fired: h.fired, notConfirmed: h.notConfirmed, note: h.note } : null,
        };
      }), 5000, 'seasonInfo').catch(() => ({}));
      log(`Season transitioned to seasonCount=${sc} | ${JSON.stringify(info)}`);
      lastSeasonCount = sc;
      await withTimeout(page.evaluate(() => { if (typeof saveGame === 'function') saveGame(); }), 5000, 'explicitSave').catch(() => {});
      if (sc >= 5) {
        log('Reached 5 seasons, stopping.');
        break;
      }
    }

    // Rilevamento blocco più granulare: seasonCount cambia una sola volta a
    // FINE stagione, ma tantissimo progresso reale avviene PRIMA (giornate,
    // mercato invernale) senza mai toccarlo — usarlo da solo come unico
    // segnale di "progresso" dichiarava falsamente "bloccato" un gioco che
    // stava semplicemente attraversando una singola stagione lunga.
    const progressKey = await withTimeout(page.evaluate(() => `${seasonPhase}|${currentMatchday}|${seasonCount}|${dsCareer ? dsCareer.history.length : 0}|${playerTeam ? playerTeam.name : 'none'}`), 5000, 'progressKey').catch(() => 'EVAL-HANG|' + Date.now());
    if (progressKey !== lastProgressKey) {
      lastProgressKey = progressKey;
      stuckCounter = 0;
    } else {
      stuckCounter++;
      if (stuckCounter > 0 && stuckCounter % 150 === 0) {
        const debugState = await withTimeout(page.evaluate(() => ({
          seasonPhase, seasonCount, currentMatchday,
          modalTitles: [...document.querySelectorAll('.mm-title')].map(e => e.textContent),
          footerNote: document.querySelector('.mm-footer-note')?.textContent || null,
          playerTeamName: playerTeam ? playerTeam.name : null,
        })), 5000, 'debugState').catch(() => ({ hung: true }));
        log(`STUCK check (counter=${stuckCounter}): ${JSON.stringify(debugState)}`);
      }
      if (stuckCounter > 400) {
        log('Appears genuinely stuck (no progress at all — phase/matchday/season/team all unchanged for 400 ticks), stopping.');
        break;
      }
    }
  }

  const finalHistory = await withTimeout(page.evaluate(() => dsCareer ? dsCareer.history : []), 5000, 'finalHistory').catch(() => []);
  clearInterval(watchdogTimer);
  log('=== FINAL DS CAREER HISTORY ===');
  finalHistory.forEach(h => log(JSON.stringify(h)));

  log(`Total errors encountered: ${errors.length}`);
  if (errors.length) errors.slice(0, 20).forEach(e => log('ERR: ' + e));

  await context.close();
  log('DONE');
  process.exit(0);
})().catch(e => {
  log('FATAL: ' + (e && e.stack || e));
  process.exit(1);
});
