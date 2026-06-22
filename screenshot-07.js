const puppeteer = require('../Sonderanfertigung/node_modules/puppeteer');
const path = require('path');
function fileUrl(p) { return 'file:///' + p.replace(/\\/g, '/'); }

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const file = path.join(__dirname, '..', 'CSV_Analyse', 'Analyse_Bericht.html');
  await page.goto(fileUrl(file), { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 3000));

  // Full viewport — overview cards + first chart
  await page.screenshot({ path: path.join(__dirname, 'images/07-analyse-overview.png') });
  console.log('✓ 07-analyse-overview.png');

  // Scroll down to show charts
  await page.evaluate(() => window.scrollBy(0, 500));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'images/07-analyse-charts.png') });
  console.log('✓ 07-analyse-charts.png');

  await browser.close();
})();
