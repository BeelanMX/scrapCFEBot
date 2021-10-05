/* eslint-disable indent */
'use strict';
// we're gonna use strict  mode in all

/**
 * In this class, is created a class which has some functions, each function is
 * for a specific work inside the scrapper.
 * When the function doScraping is executed, it is expected that the data from
 * any table can be collected and saved in some file for later use.
 */

const PUPPETEER = require('puppeteer');
const SCRAP_PAGE = require('../scrapperFunctions/index');
const URL_PAGE = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';
const ID_INPUT = '#descProc';
const ID_BUTTON = '#buscar';
const WAITING_TIME = 2000;
// const ROUTE = './assets/Data-From-Table.json';
const NEXT_PAGE_BTN = 'div.row a.k-link span.k-i-arrow-e';
const TABLE_SELECTOR = 'table.k-selectable';
const ROW_SELECTOR = '#totProc';

/**
 * Initialization of parameters
 * @param {string} text Parameter to search
 */
// eslint-disable-next-line require-jsdoc
function SCRAPPER(text) {
  this.text = text;
}

/**
 * Open a browser, which is always open
 * @return {puppeteer} Instance of puppeteer
 */
// eslint-disable-next-line space-before-function-paren
SCRAPPER.prototype.newBrowser = async function () {
  const BROWSER = await PUPPETEER.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  console.log('Opening a new browser...');
  return BROWSER;
};

/**
 * For each element is assigned a key
 * @param {Array} item Each element of the array
 * @return {Object} Data to save in a file
 */
// eslint-disable-next-line space-before-function-paren
SCRAPPER.prototype.createObject = function (item) {
  return {
    numeroDeProcedimiento: item[0],
    testigoSocial: item[1],
    entidadFederativa: item[2],
    descripcion: item[3],
    tipoDeProcedimiento: item[4],
    tipoContratacion: item[5],
    fechaPublicacion: item[6],
    estado: item[7],
    adjudicadoA: item[8],
    montoAdjudicadoEnPesos: item[9],
    detalle: item[10],
  };
};

/**
 * Print a number
 * @param {int} PERCENTAGE Percentage of how much data has been collected
 */
// eslint-disable-next-line space-before-function-paren
SCRAPPER.prototype.printPercentage = function (PERCENTAGE) {
  console.log(`${PERCENTAGE.toString()} %`);
  return;
};

/**
 * Join the other functions in this to to the scrap
 * @returns Data from a table
 */
// eslint-disable-next-line space-before-function-paren
SCRAPPER.prototype.doScraping = async function (ROUTE) {
  try {
    const BROWSER = await this.newBrowser();
    const MY_PAGE = new SCRAP_PAGE(BROWSER);
    console.log('Opening a new tab...');

    await MY_PAGE.openNewPage(URL_PAGE);
    console.log(`${URL_PAGE} has been opened successfully`);

    await MY_PAGE.fillInput(ID_INPUT, this.text, WAITING_TIME);
    console.log('Fields filled correctly');

    console.log('Searching...');
    await MY_PAGE.clickButton(ID_BUTTON, WAITING_TIME);
    console.log('Search successful');

    const DATA = await MY_PAGE.checkData(
      TABLE_SELECTOR,
      ROW_SELECTOR,
      NEXT_PAGE_BTN,
      WAITING_TIME,
      // eslint-disable-next-line prettier/prettier
      this.printPercentage
    );
    if (DATA == 0) {
      console.log('There is no data available');
      await MY_PAGE.closeBrowser();
      console.log('Browser closed successfully');
      return false;
    }
    console.log(`Obtained data: ${DATA.length}`);

    const OBJECT = await DATA.map((item) =>
      // eslint-disable-next-line comma-dangle
      this.createObject(item)
    );

    console.log('Saving data...');
    await MY_PAGE.saveFile(OBJECT, ROUTE);
    console.log(`Data saved in: ${ROUTE}`);

    await MY_PAGE.closeBrowser();
    console.log('Browser closed successfully');

    return;
  } catch (err) {
    console.error(`Error: ${err}`);
    await MY_PAGE.closeBrowser();
    console.log('Browser closed successfully');
    throw err;
  }
};

module.exports = SCRAPPER;
