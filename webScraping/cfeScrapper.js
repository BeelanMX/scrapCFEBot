/* eslint-disable indent */
'use strict';
// we're gonna use strict  mode in all

/**
 * In this class, is created a class which has some functions, each function is
 * for a specific work inside the scrapper.
 * When the function doScraping is executed, it is expected that the data from
 * any table can be collected and saved in some file for later use.
 */

const puppeteer = require('puppeteer');
const ScrapPage = require('../scrapperFunctions/index');
const URLPage = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';
const idInput = '#descProc';
const idButton = '#buscar';
const waitingTime = 2000;
const nextPageBtn = 'div.row a.k-link span.k-i-arrow-e';
const tableSelector = 'table.k-selectable';
const rowSelector = '#totProc';
const idSelectStatus = '#estado';

/**
 * Initialization of parameters
 * @param {string} text Parameter to search
 */
// eslint-disable-next-line require-jsdoc
function Scrapper(text, flag) {
  this.text = text;
  this.flag = typeof flag === 'undefined' ? '' : flag;
}

/**
 * Open a browser, which is always open
 * @return {puppeteer} Instance of puppeteer
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.newBrowser = async function () {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  console.log('Opening a new browser...');
  return browser;
};

/**
 * For each element is assigned a key
 * @param {Array} item Each element of the array
 * @return {Object} Data to save in a file
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.createObject = function (item) {
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
 * @param {int} percentage Percentage of how much data has been collected
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.printPercentage = function (percentage) {
  console.log(`${percentage.toString()} %`);
  return;
};

/**
 * Join the other functions in this to to the scrap
 * @returns Data from a table
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.doScraping = async function (route) {
  try {
    const browser = await this.newBrowser();
    const myPage = new ScrapPage(browser);
    console.log('Opening a new tab...');

    await myPage.openNewPage(URLPage);
    console.log(`${URLPage} has been opened successfully`);

    // Check if there's any flag
    if (this.flag !== '') {
      await myPage.selectFlag(this.flag, idSelectStatus);
    }

    await myPage.fillInput(idInput, this.text, waitingTime);
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
      this.printPercentage,
    );
    if (data === 0) {
      console.log('There is no data available');
      await myPage.closeBrowser();
      console.log('Browser closed successfully');
      return false;
    }
    console.log(`Obtained data: ${data.length}`);

    const object = await data.map((item) =>
      // eslint-disable-next-line comma-dangle
      this.createObject(item)
    );

    console.log('Saving data...');
    await myPage.saveFile(object, route);
    console.log(`Data saved in: ${route}`);

    await myPage.closeBrowser();
    console.log('Browser closed successfully');

    // return;
  } catch (err) {
    console.error(`Error: ${err}`);
    await myPage.closeBrowser();
    console.log('Browser closed successfully');
    throw err;
  }
};

module.exports = Scrapper;
