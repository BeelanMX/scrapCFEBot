/* eslint-disable indent */
/* eslint-disable require-jsdoc */
'use strict';

function ScrapPage(browser) {
  this.browser = browser;
  this.page = browser.page;
}

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

// eslint-disable-next-line prettier/prettier
ScrapPage.prototype.closeBrowser = async function() {
  try {
    await this.browser.close();
    return console.log('Browser closed successfully');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

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

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.clickButton = async function (id, time) {
  try {
    await this.page.click(id);
    console.log('Searching...');
    await this.page.waitForTimeout(time);
    return console.log('Search successful');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.getHeadersTable = async function () {
  try {
    const data = await this.page.evaluate(
      (selector = 'table.k-selectable th') => {
        const elements = document.querySelectorAll(selector);
        const info = [];
        for (const el of elements) {
          info.push(el.innerText);
        }
        return info;
        // eslint-disable-next-line comma-dangle
      }
    );

    console.table(data);
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.getDataTable = async function () {
  try {
    const data = await this.page.evaluate(
      (selector = 'table.k-selectable tr') => {
        const element = document.querySelectorAll(selector);
        const info = [];
        for (const el of element) {
          info.push(el.innerText);
        }
        return info;
        // eslint-disable-next-line comma-dangle
      }
    );

    console.table(data);
  } catch (err) {
    return console.error('Error: ', err);
  }
};

module.exports = ScrapPage;
