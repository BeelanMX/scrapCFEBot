/* eslint-disable indent */
'use strict';
/**
 * Initialize the instances
 * @param {puppeteer} browser
 */
function ScrapPage(browser) {
  this.browser = browser;
  this.page = browser.page;
}

/**
 * Open a new tab in a browser
 * @param {string} URLPage
 * @returns
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.openNewPage = async function (URLPage) {
  try {
    this.page = await this.browser.newPage();
    await this.page.goto(URLPage);
    return;
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
};

/**
 * Close the browser
 * @returns
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.closeBrowser = async function () {
  try {
    await this.browser.close();
    return;
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
};

/**
 * Put text in a input
 * @param {string} id
 * @param {string} text
 * @param {int | double} time
 * @returns
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.fillInput = async function (id, text, time) {
  try {
    await this.page.waitForTimeout(time);
    await this.page.type(id, text);
    return;
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
};

/**
 * Click a button
 * @param {string} id
 * @param {int | double} time
 * @returns
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.clickButton = async function (id, time) {
  try {
    await this.page.click(id);
    await this.page.waitForTimeout(time);
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
};

/**
 *
 * @param {string} selector identified for the table in DOM
 * @returns {Array[Array[strings]]}  each array append is a row of the table,
 * each element a cel
 */

const tableToArrays = (selector) => {
  const selection = `${selector} tr`;
  // Get the data with this selector
  const elements = document.querySelectorAll(selection);
  const inf = []; // Row set
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i].children;
    const indArr = []; // Data of each row
    for (let j = 0; j < elements.length; j++) {
      indArr.push(el[j].innerText);
    }
    inf.push(indArr);
  }
  return inf;
  // eslint-disable-next-line comma-dangle
};

/**
 * Get the number of rows in the table
 * @param {string} selector
 * @returns int
 */

const getRows = (selector) => {
  const rows = document.querySelector(selector).innerText;
  return rows;
};

/**
 * How many rows there is
 * @returns int
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
 * @param {int} expected
 * @param {string} nextPageButton
 * @param {int | double} time
 * @returns Array[Array[string]]
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.checkData = async function (
  tableSelector,
  rowSelector,
  nextPageButton,
  time,
  // eslint-disable-next-line prettier/prettier
  callback,
) {
  try {
    let exp = await this.expectedRows(rowSelector);
    let data = await this.getDataTable(tableSelector);
    const validateNumber = /^[0-9]*$/;
    const onlyNumbers = validateNumber.test(exp);
    typeof exp !== 'string' && onlyNumbers ? (exp = data.length) : exp;
    let obt = data.length;

    console.log('Expected data: ', exp);
    console.log('Getting data...');

    while (exp > obt) {
      await this.progressBar(data.length, exp, callback);
      await this.clickButton(nextPageButton, time);
      const newData = await this.getDataTable(tableSelector);
      data = data.concat(newData);
      obt += newData.length;
    }
    await this.progressBar(data.length, exp, callback);
    return data;
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
};

/**
 * A function to know the percentage of data obtained
 * @param {int} data
 * @returns
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.progressBar = function (data, expected, callback) {
  try {
    const percentage = Math.round((100 * data) / expected);
    callback(percentage);
    return;
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
};

/**
 * Obtain the data from a table
 * @returns [Array[Array[string]]]
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.getDataTable = async function (select) {
  try {
    const data = await this.page.evaluate(tableToArrays, select);
    data.shift(); // Delete column headings
    return data;
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
};

/**
 * Save the data in a file
 * @param {*} data
 * @param {string} route
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.saveFile = function (data, route) {
  const fs = require('fs');
  fs.writeFile(route, JSON.stringify(data), (error) => {
    if (error) {
      console.error('Error', error);
    } else {
      return;
    }
  });
};

module.exports = ScrapPage;
