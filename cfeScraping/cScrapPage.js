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
// ScrapPage.prototype.navigatePage = async function() {
//   try {
//     await this.page.goto(URLPage);
//   } catch (err) {
//     return console.error('Error4: ', err);
//   }
// };

// class ScrapPage {
//   constructor(browser) {
//     this.browser = browser;
//     this.openNewPage();
//   }
//   async openNewPage() {
//     try {
//       this.page = await browser.newPage();
//     } catch (err) {
//       return console.error('Error3: ', err);
//     }
//   }
//   async navigatePage(URLPage) {
//     try {
//       this.page = await this.page.goto(URLPage);
//     } catch (err) {
//       return console.error('Error: ', err);
//     }
//   }
// }

module.exports = ScrapPage;
