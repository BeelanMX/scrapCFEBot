/* eslint-disable indent */
'use strict';
/**
 * Initialize the instances
 * @param {puppeteer} BROWSER Instance of puppeteer
 */
function SCRAP_PAGE(BROWSER) {
  this.BROWSER = BROWSER;
  this.page = BROWSER.page;
}

/**
 * Open a new tab in a browser
 * @param {string} URL_PAGE Where te page is going to be redirect
 */
// eslint-disable-next-line space-before-function-paren
SCRAP_PAGE.prototype.openNewPage = async function (URL_PAGE) {
  try {
    this.page = await this.BROWSER.newPage();
    await this.page.goto(URL_PAGE);
    return;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

/**
 * Close the browser
 */
// eslint-disable-next-line space-before-function-paren
SCRAP_PAGE.prototype.closeBrowser = async function () {
  try {
    await this.BROWSER.close();
    return;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

/**
 * Put text in a input
 * @param {string} id How identify the input
 * @param {string} text String to put in that input
 * @param {int | double} time How much time wait for the results
 */
// eslint-disable-next-line space-before-function-paren
SCRAP_PAGE.prototype.fillInput = async function (id, text, time) {
  try {
    await this.page.waitForTimeout(time);
    await this.page.type(id, text);
    return;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

/**
 * Click a button
 * @param {string} id How identify the button
 * @param {int | double} time Time to wait for the results
 */
// eslint-disable-next-line space-before-function-paren
SCRAP_PAGE.prototype.clickButton = async function (id, time) {
  try {
    await this.page.click(id);
    await this.page.waitForTimeout(time);
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

/**
 *
 * @param {string} selector identified for the table in DOM
 * @returns {Array[Array[strings]]}  each array append is a row of the table,
 * each element a cel
 */

const TABLE_TO_ARRAYS = (selector) => {
  const SELECTION = `${selector} tr`;
  // Get the data with this selector
  const ELEMENTS = document.querySelectorAll(SELECTION);
  const INF = []; // Row set
  for (let i = 0; i < ELEMENTS.length; i++) {
    const EL = ELEMENTS[i].children;
    const IND_ARR = []; // Data of each row
    for (let j = 0; j < ELEMENTS.length; j++) {
      if (EL[j].innerText == '' || EL[j].innerText == 'undefined') {
        IND_ARR.push('---');
      } else {
        IND_ARR.push(EL[j].innerText);
      }
    }
    INF.push(IND_ARR);
  }
  return INF;
  // eslint-disable-next-line comma-dangle
};

/**
 * Get the number of rows in the table
 * @param {string} selector Of where I'm going to get the data
 * @returns {int | string} The data obtained
 */

const GET_ROWS = (selector) => {
  const ROWS = document.querySelector(selector).innerText;
  return ROWS;
};

/**
 * How many rows there is
 * @param {string} select How identify the element
 * @returns {int | string} The data obtained
 */
// eslint-disable-next-line space-before-function-paren
SCRAP_PAGE.prototype.expectedRows = async function (select) {
  try {
    const ROWSQ = await this.page.evaluate(GET_ROWS, select);
    return ROWSQ;
  } catch (err) {
    return err;
  }
};

/**
 * Collect the data of different screens
 * @param {string} TABLE_SELECTOR The identifier of the table
 * @param {string} ROW_SELECTOR How can I find the number of rows in the table
 * @param {string} nextPageButton The identifier of the button
 * @param {int | double} time How much time wait for do the process again
 * @param {function} callback A function needed in progressBar
 * @returns Array[Array[string]]
 */
// eslint-disable-next-line space-before-function-paren
SCRAP_PAGE.prototype.checkData = async function (
  TABLE_SELECTOR,
  ROW_SELECTOR,
  nextPageButton,
  time,
  // eslint-disable-next-line prettier/prettier
  callback,
) {
  try {
    let exp = await this.expectedRows(ROW_SELECTOR);
    let data = await this.getDataTable(TABLE_SELECTOR);
    const VALIDATE_NUMBER = /^[0-9]*$/;
    const ONLY_NUMBERS = VALIDATE_NUMBER.test(exp);
    typeof exp !== 'string' && ONLY_NUMBERS ? (exp = data.length) : exp;
    let obt = data.length;
    if (exp == 0) return exp;
    console.log(`Expected data: ${exp}`);
    console.log(`Getting data...`);

    while (exp > obt) {
      await this.progressBar(data.length, exp, callback);
      await this.clickButton(nextPageButton, time);
      const NEW_DATA = await this.getDataTable(TABLE_SELECTOR);
      data = data.concat(NEW_DATA);
      obt += NEW_DATA.length;
    }
    await this.progressBar(data.length, exp, callback);
    return data;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

/**
 * A function to know the percentage of data obtained
 * @param {int} data The quantity of data obtained at this moment
 * @param {int} expected How much data should be
 * @param {function} callback How print thw data
 */
// eslint-disable-next-line space-before-function-paren
SCRAP_PAGE.prototype.progressBar = function (data, expected, callback) {
  try {
    const PERCENTAGE = Math.round((100 * data) / expected);
    callback(PERCENTAGE);
    return;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

/**
 * Obtain the data from a table
 * @param {string} select How find the table
 * @returns [Array[Array[string]]]
 */
// eslint-disable-next-line space-before-function-paren
SCRAP_PAGE.prototype.getDataTable = async function (select) {
  try {
    const DATA = await this.page.evaluate(TABLE_TO_ARRAYS, select);
    DATA.shift(); // Delete column headings
    return DATA;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

/**
 * Save the data in a file
 * @param {*} DATA Data to save
 * @param {string} ROUTE Where save the data
 */
// eslint-disable-next-line space-before-function-paren
SCRAP_PAGE.prototype.saveFile = function (DATA, ROUTE) {
  const FS = require('fs');
  FS.writeFile(ROUTE, JSON.stringify(DATA), (error) => {
    if (error) {
      console.error(`Error: ${error}`);
      throw error;
    } else {
      return;
    }
  });
};

module.exports = SCRAP_PAGE;
