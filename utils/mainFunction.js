'use strict';
// we're gonna use strict  mode in all

const fs = require('fs');
const Scrapper = require('../webScraping/cfeScrapper');
const text = 'IoT';
const myScrap = new Scrapper(text);

/**
 * Initialize the variables
 * @param {string} route Where is saved the file
 */
function Validation(route) {
  this.route = route;
}

/**
 * Compares the date´s file and today to check if doScraping or not
 */
// eslint-disable-next-line space-before-function-paren
Validation.prototype.mainFunction = function () {
  fs.stat(this.route, (err, stats) => {
    if (err) {
      myScrap.doScraping();
      return;
    } else {
      let dateLastModified = stats.mtime;
      let dateToday = new Date();

      dateLastModified = dateLastModified.getTime();
      dateToday = dateToday.getTime();

      const dif = (dateToday - dateLastModified) / (1000 * 60 * 60);
      if (dif > 20) {
        myScrap.doScraping();
        return;
      } else {
        console.log('Scrap completed correctly');
        console.log(`The data has been saved in: ${this.route}`);
        return;
      }
    }
  });
};

module.exports = Validation;
