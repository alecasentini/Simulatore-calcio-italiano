const { chromium } = require('playwright');
const path = require('path');
const OUT = process.env.SHOT_DIR || __dirname;
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 2100, height: 750 } });
  const errors = [];
  page.on('pageerror', err => errors.push('pageerror: ' + err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://localhost:8976/Simulatore%20Calcio%20Italiano%20Design%20System/mockup-portrait-corner-v3.html', { waitUntil: 'load' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'portrait_v3.png'), fullPage: true });
  console.log('CONSOLE ERRORS:', JSON.stringify(errors, null, 2));
  await browser.close();
})();
