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
const fs = require('fs');
const ScrapPage = require('../scrapperFunctions/index');
const URLPage = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';
const idInput = '#descProc';

const idButton = '#buscar';
const waitingTime = 2000;
const route = './assets/Data-From-Table.json';
const nextPageBtn = 'div.row a.k-link span.k-i-arrow-e';
const tableSelector = 'table.k-selectable';
const rowSelector = '#totProc';

// eslint-disable-next-line require-jsdoc
function Scrapper(text) {
  this.text = text;
}

/**
 * Open a browser, which is always open
 * @return {puppeteer}
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.newBrowser = async function () {
  const browser = await puppeteer.launch();
  console.log(`Opening a new browser...`);
  return browser;
};

/**
 *  For each element is assigned a key
 * @param {Array} item
 * @return {Object}
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.createObject = function (item) {
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
};

/**
 * Print a number
 * @param {int} percentage
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.printPercentage = function (percentage) {
  console.log(`${percentage.toString()} %`);
  return;
};

/**
 * Main function
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.doScraping = async function () {
  try {
    const browser = await this.newBrowser();
    const myPage = new ScrapPage(browser);
    console.log(`Opening a new tab...`);

    await myPage.openNewPage(URLPage);
    console.log(`${URLPage} has been opened successfully`);

    await myPage.fillInput(idInput, this.text, waitingTime);
    console.log(`Fields filled correctly`);

    console.log(`Searching...`);
    await myPage.clickButton(idButton, waitingTime);
    console.log(`Search successful`);

    const data = await myPage.checkData(
      tableSelector,
      rowSelector,
      nextPageBtn,
      waitingTime,
      // eslint-disable-next-line prettier/prettier
      this.printPercentage,
    );
    console.log(`Obtained data: ${data.length}`);

    const object = await data.map((item) => this.createObject(item));

    console.log(`Saving data...`);
    await myPage.saveFile(object, route);
    console.log(`Data saved in: ${route}`);

    await myPage.closeBrowser();
    console.log(`Browser closed successfully`);

    return;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.mainFunction = function () {
  // eslint-disable-next-line space-before-function-paren
  fs.stat(route, (err, stats) => {
    if (err) {
      this.doScraping();
    } else {
      let dateLastModified = stats.mtime;
      let dateToday = new Date();

      dateLastModified = dateLastModified.getTime();
      dateToday = dateToday.getTime();

      const dif = (dateToday - dateLastModified) / (1000 * 60 * 60);
      if (dif > 20) {
        this.doScraping();
      } else {
        console.log(`Scrap completed correctly`);
        console.log(`The data has been saved in: ${route}`);
      }
    }
  });
};

// eslint-disable-next-line object-curly-spacing
module.exports = Scrapper;
