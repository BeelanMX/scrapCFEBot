/* eslint-disable indent */
'use strict';
// we're gonna use strict  mode in all

/**
 * In this class, is created a class which has some functions, each function is
 * for a specific work inside the scrapper.
 * When the function doScraping is executed, it is expected that the data from
 * any table can be collected and saved in some file for later use.
 */

const REPLIES = require('../utils/replyMessages');
const REPLY = REPLIES.CONSOLE_REPLIES;
const puppeteer = require('puppeteer');
const ScrapPage = require('../scrapperFunctions/index');
const URL_PAGE = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';
const ID_INPUT = '#descProc';
const ID_BUTTON = '#buscar';
const WAITING_TIME = 2000;
const NEXT_PAGE_BTN = 'div.row a.k-link span.k-i-arrow-e';
const TABLE_SELECTOR = 'table.k-selectable';
const ROW_SELECTOR = '#totProc';

/**
 * Initialization of parameters
 * @param {string} text Parameter to search
 */
// eslint-disable-next-line require-jsdoc
function Scrapper(text) {
  this.text = text;
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
  console.log(REPLY.OPENING_BROWSER);
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
    // The items commented are not important for the client,
    // you can uncomment it if are necessary for you.
    numeroDeProcedimiento: item[0],
    // testigoSocial: item[1],
    entidadFederativa: item[2],
    descripcion: item[3],
    tipoDeProcedimiento: item[4],
    tipoContratacion: item[5],
    fechaPublicacion: item[6],
    estado: item[7],
    adjudicadoA: item[8],
    montoAdjudicadoEnPesos: item[9],
    // detalle: item[10],
  };
};

/**
 * Print a number
 * @param {int} PERCENTAGE Percentage of how much data has been collected
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.printPercentage = function (PERCENTAGE) {
  console.log(`${PERCENTAGE.toString()} %`);
  return;
};

/**
 * Join the other functions in this to to the scrap
 * @returns Data from a table
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.doScraping = async function (ROUTE) {
  try {
    const browser = await this.newBrowser();
    const myPage = new ScrapPage(browser);
    console.log(REPLY.OPENING_TAB);

    await myPage.openNewPage(URL_PAGE);
    console.log(URL_PAGE, REPLY.OPEN_PAGE_CORRECTLY);

    await myPage.fillInput(ID_INPUT, this.text, WAITING_TIME);
    console.log(REPLY.FILL_CORRECTLY);

    console.log(REPLY.SEARCHING);
    await myPage.clickButton(ID_BUTTON, WAITING_TIME);
    console.log(REPLY.SEARCH_CORRECT);

    const data = await myPage.checkData(
      TABLE_SELECTOR,
      ROW_SELECTOR,
      NEXT_PAGE_BTN,
      WAITING_TIME,
      // eslint-disable-next-line prettier/prettier
      this.printPercentage,
    );
    if (data === 0) {
      console.log(REPLY.NO_DATA);
      await myPage.closeBrowser();
      console.log(REPLY.BROWSER_CLOSED);
      return false;
    }
    console.log(REPLY.GET_DATA, data.length);

    const object = await data.map((item) =>
      // eslint-disable-next-line comma-dangle
      this.createObject(item)
    );

    console.log(REPLY.SAVING_DATA);
    await myPage.saveFile(object, ROUTE);
    console.log(REPLY.SAVED_IN, ROUTE);

    await myPage.closeBrowser();
    console.log(REPLY.BROWSER_CLOSED);

    return;
  } catch (err) {
    console.error(REPLIES.GENERAL.ERROR, err);
    await myPage.closeBrowser();
    console.log(REPLY.BROWSER_CLOSED);
    throw err;
  }
};

module.exports = Scrapper;
