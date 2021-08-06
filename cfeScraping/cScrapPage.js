/* eslint-disable require-jsdoc */
'use strict';

function ScrapPage(browser) {
  this.browser = browser;
}

// eslint-disable-next-line prettier/prettier
ScrapPage.prototype.openNewPage = async function(URLPage) {
  try {
    const page = await this.browser.newPage();
    console.log('Opening a new tab...');
    await page.goto(URLPage);
    return console.log(`${URLPage} has been opened successfully`);
  } catch (err) {
    return console.error('Error: ', err);
  }
};

module.exports = ScrapPage;
