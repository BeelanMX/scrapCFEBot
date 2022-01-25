/* eslint-disable operator-linebreak */
/* eslint-disable indent */
'use strict';

/**
 * In here, you can find the information about how does the library works,
 * it is recommended that you read this information so you can understand
 * the operation of each function.
 * It uses getRows and tableToArray from other files to complete some tasks.
 */

// eslint-disable-next-line object-curly-spacing
const { getRows } = require('../utils/getRows');
// eslint-disable-next-line object-curly-spacing
const { tableToArray } = require('../utils/tableToArray');
const REPLIES = require('../utils/replyMessages');
const ERROR_MESSAGE = REPLIES.GENERAL.ERROR;

/**
 * This is the main function, where all the other functions are inherited.
 * Here, only the variables are initialized, those variables are needed
 * in all the next functions.
 *
 * @param {puppeteer} browser It is a instance of puppeteer, it is created
 * in webScraping/index.js file.
 * This parameter allows us to use all the functions of puppeteer.
 */
function ScrapPage(browser) {
  this.browser = browser;
  this.page = browser.page;
}

/**
 * In this function, a new page is going to be open, and when that occurs,
 * it is going to redirect to the specific URL which de user gives us by the
 * parameters.
 * This is a asynchronous function.
 *
 * @param {string} URL_PAGE It tells us to which page does the user wants
 * to visit. It can be a string with the format of a url,
 * like: http://www.example.com. It depends of what would you like to do or search.
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.openNewPage = async function (URL_PAGE) {
  try {
    this.page = await this.browser.newPage();
    await this.page.goto(URL_PAGE);
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
    throw err;
  }
};

/**
 * Here, only you need to wait for the browser to close.
 * It is an asynchronous function.
 * If you do not put this function at the end of you process, the
 * browser will not close, and the process will not finish.
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.closeBrowser = async function () {
  try {
    await this.browser.close();
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
    throw err;
  }
};

/**
 * It is an asynchronous function, where you can be able of put data
 * in some input, this is only to write the data, it does not search
 * anything, to do it you should use other function.
 *
 * @param {string} id This parameter identifies the input where the text
 * is going to be written. It can be an id or a selector, you can find them
 * using the inspector of your browser.
 * @param {string} text This parameter indicates what is the word or
 * sentence that will be written in the input indicated before.
 * @param {int | double} time This parameter indicates how much time
 * we are going to wait for the results of that search. Do not forget
 * that number is going to be taken in milliseconds.
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.fillInput = async function (id, text, time) {
  try {
    await this.page.waitForTimeout(time);
    await this.page.type(id, text);
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
    throw err;
  }
};

/**
 * In this function, basically, we can find a way to click a button,
 * this can be made with the Puppeteer library.
 *
 * @param {string} id This parameter is going to identify the button,
 * it can be an id, or a selector.
 * @param {int | double} time This is the time that the page is going
 * to wait to charge the changes. It is written in milliseconds.
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
 * This function is for collect some data, in this case, the number of
 * rows in some table, but you can get some text, or information.
 * It uses getRows to complete the process.
 *
 * @param {string} select This is the selector which the function
 * is going to use to evaluate the page to look for the coincidences.
 * It also can be an id.
 *
 * @returns {int | string} A string that means the number of rows in the
 * table, or whatever the function could find with the selector.
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
 * This asynchronous function uses the other functions to bring the
 * information needed. First, it uses expectedRows to know how much data
 * needs. Next, it is time to use getDataTable to get the data in the
 * first screen. After that, there is a validation, if the value of
 * expectedRows is not a number, the expected rows will be the quantity
 * of data received in getDataTable. But, if it is a number, there is a
 * validation that verify if the expected rows is less than the data
 * obtained, if it is not true, the progressBar will be executed, then,
 * clickButton to go where the table continues, and getDataTable again.
 * Finally, the progressBar is executed again to print 100%.
 *
 * @param {string} TABLE_SELECTOR It indicates the table where the
 * information is going to be taken. getDataTable uses this parameter.
 * @param {string} ROW_SELECTOR It indicates where can you find the number
 * of a rows, that the table has. expectedRows uses this parameter.
 * @param {string} nextPageButton This parameter is how the page will
 * identify the button to click to go to the next part of the table.
 * Sends an empty string if there is no more pages, clickButton uses this
 * parameter.
 * @param {int | double} time This parameter is a number, that indicates
 * how many seconds will wait the page to do a process. clickButton uses
 * this parameter.
 * @param {function} callback progressBar uses this parameter to complete
 * its process.
 *
 * @returns Array[Array[string]] A two-dimensional array. It is an array
 * which has array in there. The two-dimensional array is the entire table.
 * Each element (array) of the two-dimensional array is a row of the table.
 * And each element of each one-dimensional array is a cell of the table.
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
    console.log(REPLIES.CONSOLE_REPLIES.GETTING_DATA);

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
 * Here, it is a function which only do a Math operation, to obtain a number
 * that means how much information has been obtained.
 *
 * @param {int} data It is a number that indicates the quantity of data that
 * has been obtained at the moment.
 * @param {int} expected It is a number which indicates the total data that
 * we are waiting for.
 * @param {function} callback This is a function that the user must write to
 * print the number that is going to obtain with this function.
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.progressBar = function (data, expected, callback) {
  try {
    const PERCENTAGE = Math.round((100 * data) / expected);
    callback(PERCENTAGE);
  } catch (err) {
    console.error(ERROR_MESSAGE, err);
    throw err;
  }
};

/**
 * To make it work, it needs the tableToArrays function, we pass the
 * selector of the table and it gives us the data. But the data has the
 * headers, to drop it, we use shift(). This is an asynchronous function.
 *
 * @param {string} select It is, how can I find the table to get the
 * information.
 *
 * @returns [Array[Array[string]]] A two-dimensional array without the
 * headers of the table.
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
 * You can use this function to write a file and save it wherever you want.
 * This function works with File System. It saves the data from the table.
 *
 * @param {*} data This is the information that is going to be saved in the
 * file. It should be in JSON format.
 * @param {string} ROUTE This identifies where the file will be saved, do
 * not forget the extension: '.json'.
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

/**
 * Update the configuration of the page to filter and get the data. In this
 * function, first, the flag and its value are separated to work with them
 * separately. Depending of the flag, it will enter to a switch-case and
 * depending its value, it will select a option from the element (idSelect).
 * If that flag does not exist in there, it will send you a message.
 *
 * @param {Array[Array[string]]} flag This is a bi-dimensional array, in
 * each uni-dimensional array, you must have the flag and its value.
 * @param {string} idSelect  Where will you need to use the flag? For
 * example, this flag can modify a select option element, that, is the
 * ID that the scrap needs.
 */
// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.selectFlag = async function (flag, idSelect) {
  try {
    if (flag[0][1] === undefined) return;
    const FLAG_ARRAY = flag[0][0].toLowerCase();
    const VALUE = flag[0][1].toLowerCase();
    switch (FLAG_ARRAY) {
      case '-s': // Flags for the status
      case '--status':
        let option;
        switch (VALUE) {
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
