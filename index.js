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
// const rowQuantity = 18;
const tableSelector = 'table.k-selectable';
const rowSelector = '#totProc';

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
 * Print a number
 * @param {int} percentage
 */
function printPercentage(percentage) {
  console.log(percentage.toString(), '%');
  return;
}

/**
 * Main function
 */
(async () => {
  try {
    const browser = await newBrowser();
    const myPage = new ScrapPage(browser);
    console.log('Opening a new tab...');

    await myPage.openNewPage(URLPage);
    console.log(`${URLPage} has been opened successfully`);

    await myPage.fillInput(idInput, text, waitingTime);
    console.log('Fields filled correctly');

    console.log('Searching...');
    await myPage.clickButton(idButton, waitingTime);
    console.log('Search successful');

    const data = await myPage.checkData(
      tableSelector,
      rowSelector,
      nextPageBtn,
      waitingTime,
      // eslint-disable-next-line prettier/prettier
      printPercentage,
    );
    console.log('Obtained data: ', data.length);

    const object = await data.map((item) => createObject(item));

    console.log('Saving data...');
    await myPage.saveFile(object, route);
    console.log('Data saved in: ', route);

    await myPage.closeBrowser();
    console.log('Browser closed successfully');
  } catch (err) {
    console.error('Error: ', err);
  }
})();
