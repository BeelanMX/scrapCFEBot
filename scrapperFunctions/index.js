/* eslint-disable indent */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { getRows } = require('../utils/getRows');
// eslint-disable-next-line object-curly-spacing
const { tableToArray } = require('../utils/tableToArray');

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
 * @param {string} URLPage Where te page is going to be redirect
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.openNewPage = async function (URLPage) {
  try {
    this.page = await this.browser.newPage();
    await this.page.goto(URLPage);
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
ScrapPage.prototype.closeBrowser = async function () {
  try {
    await this.browser.close();
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
ScrapPage.prototype.fillInput = async function (id, text, time) {
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
ScrapPage.prototype.clickButton = async function (id, time) {
  try {
    await this.page.click(id);
    await this.page.waitForTimeout(time);
  } catch (err) {
    console.error(`Error: ${err}`);
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
 * @param {string} tableSelector The identifier of the table
 * @param {string} rowSelector How can I find the number of rows in the table
 * @param {string} nextPageButton The identifier of the button
 * @param {int | double} time How much time wait for do the process again
 * @param {function} callback A function needed in progressBar
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
    if (exp === 0) return exp;
    console.log(`Expected data: ${exp}`);
    console.log(`Getting data...`);

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
ScrapPage.prototype.progressBar = function (data, expected, callback) {
  try {
    const percentage = Math.round((100 * data) / expected);
    callback(percentage);
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
ScrapPage.prototype.getDataTable = async function (select) {
  try {
    const data = await this.page.evaluate(tableToArray, select);
    data.shift(); // Delete column headings
    return data;
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

/**
 * Save the data in a file
 * @param {*} data Data to save
 * @param {string} route Where save the data
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.saveFile = function (data, route) {
  const fs = require('fs');
  fs.writeFile(route, JSON.stringify(data), (error) => {
    if (error) {
      console.error(`Error: ${error}`);
      throw error;
    } else {
      return;
    }
  });
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.selectOption = async function (id, option) {
  await this.page.select(id, option);
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.selectFlag = async function (flag, idSelect) {
  try {
    const flagArray = flag[0][0].toLowerCase();
    const value = flag[0][1].toLowerCase();
    switch (flagArray) {
      case '-s' || '--status': // Flag for the status
        let option;
        switch (value) {
          case 'vigente':
            option = '1';
            break;
          case 'adjudicado':
            option = '2';
            break;
          case 'suspendido':
            option = '3';
            break;
          case 'desierto':
            option = '4';
            break;
          case 'cancelado':
            option = '5';
            break;
          case 'concluido':
            option = '6';
            break;
          case 'impugnado':
            option = '7';
            break;
          default:
            // eslint-disable-next-line no-unused-vars
            option = '0';
            break;
        }
        await this.page.select(idSelect.status, option);
        break;
      default:
        console.log('Unrecognized flag');
        // Add a message 'maybe you mean this' and options, like help command
        break;
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
};

module.exports = ScrapPage;
