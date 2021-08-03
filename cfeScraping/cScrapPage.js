/* eslint-disable require-jsdoc */
'use strict';

// const puppeteer = require('puppeteer');

class ScrapPage {
  constructor(browser) {
    this.browser = browser;
    this.openNewPage();
  }
  async openNewPage() {
    try {
      this.page = await this.browser.newPage();
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async navigatePage(URLPage) {
    try {
      this.page = await this.page.goto(URLPage);
    } catch (err) {
      console.error('Error: ', err);
    }
  }
}

module.exports = {
  ScrapPage: ScrapPage,
};
