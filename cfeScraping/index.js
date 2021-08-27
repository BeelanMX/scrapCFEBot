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
// eslint-disable-next-line prettier/prettier
ScrapPage.prototype.openNewPage = async function(URLPage) {
  try {
    this.page = await this.browser.newPage();
    await this.page.goto(URLPage);
    return;
  } catch (err) {
    return console.error('Error: ', err);
  }
};

/**
 * Close the browser
 * @returns
 */
// eslint-disable-next-line prettier/prettier
ScrapPage.prototype.closeBrowser = async function() {
  try {
    await this.browser.close();
    return;
  } catch (err) {
    return console.error('Error: ', err);
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
    return console.error('Error: ', err);
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
    return console.error('Error: ', err);
  }
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
  nextPageButton,
  time,
  rowQ,
  // eslint-disable-next-line prettier/prettier
  callback,
) {
  try {
    const exp = await this.validateExpectedRows(rowQ);
    let data = await this.getDataTable();
    let obt = data.length;

    console.log('Expected data: ', exp);
    console.log('Getting data...');

    while (exp > obt) {
      await this.progressBar(data.length, rowQ, callback);
      await this.clickButton(nextPageButton, time);
      const newData = await this.getDataTable();
      data = data.concat(newData);
      obt = obt + newData.length;
    }
    await this.progressBar(data.length, rowQ, callback);
    return data;
  } catch (err) {
    console.error('Error: ', err);
  }
};

/**
 * A function to know the percentage of data obtained
 * @param {int} data
 * @returns
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.progressBar = async function (data, rowQ, callback) {
  try {
    const exp = await this.validateExpectedRows(rowQ);
    const percentage = Math.round((100 * data) / exp);
    callback(percentage);
    return;
  } catch (err) {
    console.error('Error: ', err);
  }
};

/**
 * Obtain the data from a table
 * @returns [Array[Array[string]]]
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.getDataTable = async function () {
  try {
    const data = await this.page.evaluate(
      (selector = 'table.k-selectable tr') => {
        // Get the data with this selector
        const elements = document.querySelectorAll(selector);
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
      }
    );
    data.shift(); // Delete column headings
    return data;
  } catch (err) {
    return console.error('Error: ', err);
  }
};

/**
 * Check if we can validate the row quantity
 * @param {int} rowQ
 * @returns int
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.validateExpectedRows = async function (rowQ) {
  try {
    let exp = await this.expectedRows();
    const val = typeof exp;
    if (val == 'object') {
      exp = rowQ;
    }
    return exp;
  } catch (err) {
    console.error('Error: ', err);
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
