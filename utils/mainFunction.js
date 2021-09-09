'use strict';
// we're gonna use strict  mode in all

const fs = require('fs');

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
      console.log(`Error: ${err}`);
      return;
    } else {
      let dateLastModified = stats.mtime;
      let dateToday = new Date();

      dateLastModified = dateLastModified.getTime();
      dateToday = dateToday.getTime();

      const dif = (dateToday - dateLastModified) / (1000 * 60 * 60);
      if (dif > 20) {
        console.log('Should execute doScrap()');
        return;
      } else {
        console.log('Scrap completed correctly');
        console.log(`The data has been saved in: ${route}`);
        return;
      }
    }
  });
};

module.exports = Validation;
