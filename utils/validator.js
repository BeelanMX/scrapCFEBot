'use strict';
// we're gonna use strict  mode in all

const fs = require('fs');
// eslint-disable-next-line object-curly-spacing
const { isFileHasLessHoursUpdate } = require('./files');

/**
 * Initialize the variables
 * @param {string} ROUTE Where is saved the file
 */
function Validation() {}

/**
 * Compares the date´s file and today to check if doScraping or not
 */
// eslint-disable-next-line space-before-function-paren
Validation.prototype.isFileLastUpdateIn = function (path, hours = 24) {
  const validationFile = isFileHasLessHoursUpdate(hours);
  if (fs.existsSync(path)) {
    return validationFile(path);
  }
  return false;
};

module.exports = Validation;
