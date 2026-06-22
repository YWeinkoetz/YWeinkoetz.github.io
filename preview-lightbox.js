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

  await page.goto(fileUrl(path.join(__dirname, 'projects/sonderanfertigung.html')), { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1500));

  // Click the first gallery image to trigger lightbox
  await page.click('.gallery-item img');
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: path.join(__dirname, 'images/preview-lightbox.png') });
  console.log('✓ lightbox preview saved');
  await browser.close();
})();
