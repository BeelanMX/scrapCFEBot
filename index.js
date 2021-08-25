/* eslint-disable indent */
'use strict';
// we're gonna use strict  mode in all

const puppeteer = require('puppeteer');
const URLPage = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';
const ScrapPage = require('./cfeScraping/index.js');
const idInput = '#descProc';
const text = 'IoT';
const idButton = '#buscar';
const waitingTime = 2000;
const route = './assets/Data-From-Table.json';
const nextPageBtn = 'div.row a.k-link span.k-i-arrow-e';

/**
 * Open a browser, which is always open
 * @return {puppeteer}
 */
async function newBrowser() {
  const browser = await puppeteer.launch();
  console.log('Opening a new browser...');
  return browser;
}

/**
 *  For each element is assigned a key
 * @param {Array} item
 * @return {Object}
 */
function createObject(item) {
  return {
    numeroDeProcedimiento: item[0],
    testigoSocial: item[1],
    entidadFederativa: item[2],
    descripcion: item[3],
    tipoDeProcedimiento: item[4],
    tipoContratación: item[5],
    fechaPublicación: item[6],
    estado: item[7],
    adjudicadoA: item[8],
    montoAdjudicadoEnPesos: item[9],
    detalle: item[10],
  };
}

/**
 * Main function
 */
(async () => {
  try {
    const browser = await newBrowser();
    const myPage = new ScrapPage(browser);
    await myPage.openNewPage(URLPage);
    await myPage.fillInput(idInput, text, waitingTime);
    console.log('Searching...');
    await myPage.clickButton(idButton, waitingTime);
    console.log('Search successful');
    console.log('Getting data...');
    const data = await myPage.checkData(
      nextPageBtn,
      // eslint-disable-next-line comma-dangle
      waitingTime
    );
    console.log('Obtained data: ', data.length);
    const object = await data.map((item) => createObject(item));
    await myPage.saveFile(object, route);
    await myPage.closeBrowser();
  } catch (err) {
    console.error('Error: ', err);
  }
})();
