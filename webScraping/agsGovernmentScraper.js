'use strict';
// we're gonna use strict  mode in all

const puppeteer = require('puppeteer');
const ScrapPage = require('../scrapperFunctions/index');
const URLPage = 'https://aguascalientes.gob.mx/';

/**
 * Class to do a scrap
 */
class AgsGovScrapper {
  // eslint-disable-next-line require-jsdoc
  constructor() {}

  /**
   * Open a browser, which is always open
   * @return {puppeteer} Instance of puppeteer
   */
  async newBrowser() {
    try {
      const browser = await puppeteer.launch();
      console.log('Opening a new browser...');
      return browser;
    } catch (err) {
      console.log(`An error occurred: ${err}`);
    }
  }

  /**
   * Main function, where the functions are executed
   * @return { void }
   */
  async doScraping() {
    try {
      const browser = await this.newBrowser();
      const myPage = new ScrapPage(browser);
      console.log('Opening a new tab...');

      await myPage.openNewPage(URLPage);
      console.log(`${URLPage} has been opened successfully`);

      // console.log('Saving data...');
      // await myPage.saveFile(object, route);
      // console.log(`Data saved in: ${route}`);

      await myPage.closeBrowser();
      console.log('Browser closed successfully');

      return;
    } catch (err) {
      console.error(`Error: ${err}`);
      //   await myPage.closeBrowser();
      //   console.log('Browser closed successfully');
      throw err;
    }
  }
}

const scrapAgsGov = new AgsGovScrapper();
scrapAgsGov.doScraping();
