'use strict';

const puppeteer = require('puppeteer');

const openBrowser = async (data) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(URLPAGE);
    await page.waitForSelector('div.gti-app');
    console.log('Access to CFE page: Successful');

    await page.waitForTimeout(2000);

    // await page.type('#descProc', 'IoT');
    // await page.click('#buscar');
    await page.type.toString(`#${data.idInput}, ${data.textInput}`);
    await page.click(`#${data.button}`);
    await page.waitForTimeout(2000);
    console.log('Search: Successful');

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
