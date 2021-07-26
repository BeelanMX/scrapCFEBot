'use strict';

const puppeteer = require('puppeteer');
const URL = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';

const openBrowser = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(URL);
    await page.waitForSelector('div.gti-app');
    console.log('Successful');

    await page.waitForTimeout(2000);
    // eslint-disable-next-line prettier/prettier
    await page.screenshot({path: 'pictures/Cfe.png'});

    await browser.close();
  } catch (error) {
    console.error('An error have been occurred: ' + error);
  }
};

module.exports = {
  openBrowser: openBrowser,
};
