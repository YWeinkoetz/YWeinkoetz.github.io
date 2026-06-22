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

  const pages = [
    { file: 'projects/sonderanfertigung.html', out: 'images/preview-01.png' },
    { file: 'projects/stucklisten-analyse.html', out: 'images/preview-03.png' },
    { file: 'projects/reparaturservice.html', out: 'images/preview-04.png' },
    { file: 'index.html', out: 'images/preview-overview.png' },
  ];

  for (const p of pages) {
    await page.goto(fileUrl(path.join(__dirname, p.file)), { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(__dirname, p.out) });
    console.log('✓', p.out);
  }

  await browser.close();
})();
