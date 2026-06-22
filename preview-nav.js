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

  // Top — shows masthead nav
  await page.goto(fileUrl(path.join(__dirname, 'projects/produktionsplaner.html')), { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(__dirname, 'images/preview-nav-top.png') });

  // Bottom — shows pagination block (scroll to bottom)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, 'images/preview-nav-bottom.png') });

  await browser.close();
  console.log('done');
})();
