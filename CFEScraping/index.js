const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/');
    console.log('Successful');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'Cfe.png' });
    await browser.close();
})();

