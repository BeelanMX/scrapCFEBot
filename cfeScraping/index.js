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
 * @returns string
 */
// eslint-disable-next-line prettier/prettier
ScrapPage.prototype.openNewPage = async function(URLPage) {
  try {
    this.page = await this.browser.newPage();
    console.log('Opening a new tab...');
    await this.page.goto(URLPage);
    return console.log(`${URLPage} has been opened successfully`);
  } catch (err) {
    return console.error('Error: ', err);
  }
};

/**
 * Close the browser
 * @returns string
 */
// eslint-disable-next-line prettier/prettier
ScrapPage.prototype.closeBrowser = async function() {
  try {
    await this.browser.close();
    return console.log('Browser closed successfully');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

/**
 * Put text in a input
 * @param {string} id
 * @param {string} text
 * @param {int | double} time
 * @returns string
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.fillInput = async function (id, text, time) {
  try {
    await this.page.waitForTimeout(time);
    await this.page.type(id, text);
    return console.log('Fields filled correctly');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

/**
 * Click a button
 * @param {string} id
 * @param {int | double} time
 * @returns string
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.clickButton = async function (id, time) {
  try {
    await this.page.click(id);
    await this.page.waitForTimeout(time);
  } catch (err) {
    return console.error('Error: ', err);
  }
};
/**
 *
 * @param {string} selector identified for the table in DOM
 * @returns {Array[Array[strings]]}  each array append is a row of the table,
 * each element a cel
 */
const tableToArrays = (selector) => {
  console.log('tableToArrays', selector);
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
 * How many rows there is
 * @returns int
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.expectedRows = async function () {
  try {
    const rowsQ = await this.page.evaluate((rowQuantity = '#totProc') => {
      const rows = document.querySelector(rowQuantity).innerText;
      return rows;
    });
    console.log('Expected data: ', rowsQ);
    return rowsQ;
  } catch (err) {
    console.error('Error: ', err);
  }
};

/**
 * Collect the data of different screens
 * @param {int} expected
 * @param {string} nextPageButton
 * @param {int | double} time
 * @returns Array[Array]
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.checkData = async function (
  tableSelector,
  nextPageButton,
  time,
) {
  try {
    const exp = await this.expectedRows();
    let data = await this.getDataTable(tableSelector);
    let obt = data.length;
    while (exp > obt) {
      await this.clickButton(nextPageButton, time);
      const newData = await this.getDataTable(tableSelector);
      data = data.concat(newData);
      obt = obt + newData.length;
    }
    return data;
  } catch (err) {
    console.error('Error: ', err);
  }
};

/**
 * Obtain the data from a table
 * @returns (Array [Array])
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.getDataTable = async function (select) {
  try {
    const data = await this.page.evaluate(tableToArrays, select);
    data.shift(); // Delete column headings
    return data;
  } catch (err) {
    return console.error('Error: ', err);
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
  console.log('Saving data...');
  fs.writeFile(route, JSON.stringify(data), (error) => {
    if (error) {
      console.error('Error', error);
    } else {
      console.log('Data saved in: ', route);
    }
  });
};

module.exports = ScrapPage;
