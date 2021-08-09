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
ScrapPage.prototype.fillInput = async function (id, text) {
  try {
    await this.page.waitForTimeout(2000);
    await this.page.type(id, text);
    // eslint-disable-next-line prettier/prettier
    await this.page.screenshot({path: 'pictures/data.png'});
    return console.log('Fields fills correctly');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

// eslint-disable-next-line space-before-function-paren
ScrapPage.prototype.clickButton = async function (id) {
  try {
    await this.page.click(id);
    console.log('Searching...');
    await this.page.waitForTimeout(2000);
    // eslint-disable-next-line prettier/prettier
    await this.page.screenshot({path: 'pictures/data2.png'});
    return console.log('Search succesfull');
  } catch (err) {
    return console.error('Error: ', err);
  }
};

module.exports = ScrapPage;
