/* eslint-disable indent */
'use strict';
// we're gonna use strict  mode in all

/**
 * In this class, is created a class which has some functions, each function is
 * for a specific work inside the scrapper.
 * When the function runScraping is executed, it is expected that the data from
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
const ID_FILTER = {
  processType: '#tipoProcedimiento',
  contratacionType: '#tipoContratacion',
  entity: '#entidadFederativa',
  status: '#estado',
  socialWitness: '#testSocial',
  modality: '#modalidad',
};

/**
 * In here, the values needed are initialized, in this case we only need
 * the text, a parameter which the scrapper will search.
 *
 * @param { string } text It is a string that indicates what the scrapper
 * is going to search.
 * @param { Array[Array[string]] } flag It is an array which saves the
 * possibles flags and its values, if there is any flag, this is empty,
 * just do not add this parameter.
 */
// eslint-disable-next-line require-jsdoc
function Scrapper(text, flag = []) {
  this.text = text;
  this.flag = flag;
}

/**
 * In here, we use the Puppeteer library to open the browser. This is the
 * first step to do the scrap. The browser will be always open.
 *
 * @return {puppeteer} A new browser, that is to say, a instance of Puppeteer.
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.newBrowser = async function () {
  console.log(REPLY.OPENING_BROWSER);
  return await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
};

/**
 * This function create the object in JSON format, it receives the data and
 * assigns each value to a key.
 *
 * @param { Array } item This is an array, and each element is the item. To
 * use it, is needed the function map().
 *
 * @return { Object } Data to save in a file, that is to say a object in
 * JSON format.
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
 * This is a function which the user can edit, to his own preferences, to
 * show the advance of the data obtained. You can choose if only print the
 * number or add something more. This function is called from progressBar
 * function.
 *
 * @param {int} PERCENTAGE This is a number provided from progressBar, it
 * means how much data has been obtained at that moment.
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.printPercentage = function (PERCENTAGE) {
  console.log(`${PERCENTAGE.toString()} %`);
};

/**
 * Join the other functions in this to do the scrap. This function is
 * asynchronous.
 * First, uses the newBrowser function to create the instance that is going
 * to be used along the process. Then, is created a instance of ScrapPage to use
 * the functions provided. The next step is open a new page with the url
 * provided. In here, there is a validation to know if the user typed any flag,
 * if it is true, the selectFlag function is executed, else, just pass to the
 * next step. Now, it is time to fill the form, with the fillInput function. In
 * here, we will need the idInput, the text and the waitingTime. After that, you
 * can click the button to search it, in here, you will need the idButton and
 * also the waitingTime. So, at this point it is time to execute the checkData
 * function, and it needs the tableSelector, rowSelector, nextPageBtn,
 * waitingTime and a callback as parameters, the callback will be the
 * printPercentage function. Now, there is another validation, where it checks
 * if the search returns data, if not, the browser is closed and finishes the
 * process and returns false. Next, we find a arrow function to create the data
 * that will be saved in the file, to do it, is needed the createObject
 * function. Once done, you can save that information with the saveFile
 * function, you need the data and the route where the data is going to be
 * saved. Finally, you need to close the browser to end the process.
 *
 * @param { string } ROUTE This route indicates where will be saved the file
 * generated when the scraper is executed, it also can be just the name of
 * the file to create.
 */
// eslint-disable-next-line space-before-function-paren
Scrapper.prototype.runScraping = async function (ROUTE) {
  try {
    const browser = await this.newBrowser();
    const myPage = new ScrapPage(browser);
    console.log(REPLY.OPENING_TAB);

    await myPage.openNewPage(URL_PAGE);
    console.log(URL_PAGE, REPLY.OPEN_PAGE_CORRECTLY);

    // Check if there's any flag
    if (this.flag.length !== 0) {
      await myPage.selectFlag(this.flag, ID_FILTER);
    }

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
    if (data === 0 || data.length === 0) {
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
  } catch (err) {
    console.error(REPLIES.GENERAL.ERROR, err);
    await myPage.closeBrowser();
    console.log(REPLY.BROWSER_CLOSED);
    throw err;
  }
};

module.exports = Scrapper;
