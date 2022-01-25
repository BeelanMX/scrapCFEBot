'use strict';
// we're gonna use strict  mode in all

const fs = require('fs');
// eslint-disable-next-line object-curly-spacing
const { isFileHasLessHoursUpdate } = require('./files');

/**
 * Initialize the variables.
 */
function Validation() {}

/**
 * Compares the date's file and today to check if runScraping or not.
 * This function uses the function of files.js to get the validation,
 * sending the first parameter, the hours.
 * It will verify if the file exists, if it exists, it will execute the
 * function of files and return it. In the other case, it will return false.
 *
 * @param { string } path It is the route where is located the file to verify.
 * @param { number } hours This parameter is initialized in here and its default
 * value is 24, it means how many hours are the limit for the creation of the
 * file.
 *
 * @returns { function | boolean } It can return the execution of the
 * function of files.js (validationFile) or return false.
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
