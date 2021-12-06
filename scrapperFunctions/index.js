/* eslint-disable indent */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { getRows } = require('../utils/getRows');
// eslint-disable-next-line object-curly-spacing
const { tableToArray } = require('../utils/tableToArray');
const REPLIES = require('../utils/replyMessages');
const ERROR_MESSAGE = REPLIES.GENERAL.ERROR;

/**
 * Initialize the instances
 * @param {puppeteer} browser Instance of puppeteer
 */
function ScrapPage(browser) {
  this.browser = browser;
  this.page = browser.page;
}

/**
 * Open a new tab in a browser
 * @param {string} URL_PAGE Where te page is going to be redirect
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.openNewPage = async function (URL_PAGE) {
  try {
    this.page = await this.browser.newPage();
    await this.page.goto(URL_PAGE);
    return;
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
    throw err;
  }
};

/**
 * Close the browser
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.closeBrowser = async function () {
  try {
    await this.browser.close();
    return;
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
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
ScrapPage.prototype.fillInput = async function (id, text, time) {
  try {
    await this.page.waitForTimeout(time);
    await this.page.type(id, text);
    return;
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
    throw err;
  }
};

/**
 * Click a button
 * @param {string} id How identify the button
 * @param {int | double} time Time to wait for the results
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.clickButton = async function (id, time) {
  try {
    await this.page.click(id);
    await this.page.waitForTimeout(time);
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
    throw err;
  }
};

/**
 * How many rows there is
 * @param {string} select How identify the element
 * @returns {int | string} The data obtained
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.expectedRows = async function (select) {
  try {
    const rowsQ = await this.page.evaluate(getRows, select);
    return rowsQ;
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
ScrapPage.prototype.checkData = async function (
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
    if (exp === 0) return exp;
    console.log(REPLIES.CONSOLE_REPLIES.EXPECT_DATA, exp);
    console.log(REPLIES.CONSOLE_REPLIES.GET_DATA);

    while (exp > obt) {
      await this.progressBar(data.length, exp, callback);
      await this.clickButton(nextPageButton, time);
      const newData = await this.getDataTable(TABLE_SELECTOR);
      data = data.concat(newData);
      obt += newData.length;
    }
    await this.progressBar(data.length, exp, callback);
    return data;
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
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
ScrapPage.prototype.progressBar = function (data, expected, callback) {
  try {
    const PERCENTAGE = Math.round((100 * data) / expected);
    callback(PERCENTAGE);
    return;
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
    throw err;
  }
};

/**
 * Obtain the data from a table
 * @param {string} select How find the table
 * @returns [Array[Array[string]]]
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.getDataTable = async function (select) {
  try {
    const data = await this.page.evaluate(tableToArray, select);
    data.shift(); // Delete column headings
    return data;
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
    throw err;
  }
};

/**
 * Save the data in a file
 * @param {*} data Data to save
 * @param {string} ROUTE Where save the data
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.saveFile = function (data, ROUTE) {
  const fs = require('fs');
  fs.writeFile(ROUTE, JSON.stringify(data), (error) => {
    if (error) {
      console.error(ERROR_MESSAGE, err);
      throw error;
    } else {
      return;
    }
  });
};

module.exports = ScrapPage;
