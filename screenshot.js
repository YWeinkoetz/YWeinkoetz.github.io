const puppeteer = require('../Sonderanfertigung/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'images');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

function fileUrl(p) {
  return 'file:///' + p.replace(/\\/g, '/');
}

const SHOTS = [
  // Project 01 — Sonderanfertigungsformular
  { file: '../Sonderanfertigung/order-form-snapshot.html',                    out: '01-sonderanfertigung-form.png',       wait: 1500 },
  { file: '../Sonderanfertigung/sonderanfertigung_waldviertler_v8.html',      out: '01-sonderanfertigung-standalone.png', wait: 1500 },

  // Project 02 — Produktionsplaner
  { file: '../produktionsplanner/Produktionsplanner.html',                    out: '02-produktionsplaner.png',            wait: 1500 },

  // Project 03 — Stücklisten-Analyse
  { file: '../Möbel_Stücklisten/OR_Fehler_Visual.html',                      out: '03-stuecklisten-visual.png',          wait: 1200 },
  { file: '../Möbel_Stücklisten/Stuecklisten_Matratzen.html',                 out: '03-stuecklisten-matratzen.png',       wait: 1200 },
  { file: '../Möbel_Stücklisten/OR_Korrekturen.html',                         out: '03-stuecklisten-korrekturen.png',     wait: 1200 },

  // Project 04 — Reparaturservice
  { file: '../Reparatur_info/waldviertler_reparatur_info.html',               out: '04-reparatur-info.png',               wait: 1500 },
  { file: '../Reparatur_info/waldviertler_before_after_slider.html',          out: '04-reparatur-slider.png',             wait: 1500 },
  { file: '../reparatur_website/waldviertler_reparatur_with_images.html',     out: '04-reparatur-website.png',            wait: 2000 },

  // Project 06 — KanbanApp
  { file: '../KanbanApp/src/index.html',                                       out: '06-kanban-app.png',                   wait: 1500 },

  // Portfolio overview
  { file: 'index.html',                                                    out: '00-portfolio-overview.png',           wait: 2000 },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  for (const shot of SHOTS) {
    const fullPath = path.join(__dirname, shot.file);
    if (!fs.existsSync(fullPath)) {
      console.log(`SKIP (not found): ${shot.file}`);
      continue;
    }
    try {
      console.log(`→ ${shot.file}`);
      await page.goto(fileUrl(fullPath), { waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise(r => setTimeout(r, shot.wait));
      const outPath = path.join(OUT, shot.out);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  ✓ saved ${shot.out}`);
    } catch (e) {
      console.log(`  ✗ error: ${e.message}`);
    }
  }

  await browser.close();
  console.log('\nDone. Images saved to Portfolio/images/');
})();
