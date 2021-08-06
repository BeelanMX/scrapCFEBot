/* eslint-disable require-jsdoc */
/* eslint-disable indent */
'use strict';
// we're gonna use strict  mode in all

const puppeteer = require('puppeteer');
const URLPage = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';
const ScrapPage = require('./cfeScraping/cScrapPage');
const id = '#descProc';
const text = 'IoT';

async function newBrowser() {
  const browser = await puppeteer.launch();
  console.log('Opening a new browser...');
  return browser;
}

(async () => {
  try {
    const browser = await newBrowser();
    const myPage = new ScrapPage(browser);
    await myPage.openNewPage(URLPage);
    await myPage.fillInput(id, text);
    await myPage.closeBrowser();
  } catch (err) {
    console.error('Error: ', err);
  }
})();
