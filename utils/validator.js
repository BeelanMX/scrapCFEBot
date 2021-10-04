'use strict';
// we're gonna use strict  mode in all

const FS = require('fs');
// eslint-disable-next-line object-curly-spacing
const { IS_FILE_HAS_LESS_HOURS_UPDATE } = require('./files');

/**
 * Initialize the variables
 * @param {string} ROUTE Where is saved the file
 */
function VALIDATION() { }

/**
 * Compares the date´s file and today to check if doScraping or not
 */
// eslint-disable-next-line space-before-function-paren
VALIDATION.prototype.isFileLastUpdateIn = function (path, hours = 24) {
  const VALIDATE_FILE = IS_FILE_HAS_LESS_HOURS_UPDATE(hours);
  if (FS.existsSync(path)) {
    return VALIDATE_FILE(path);
  }
  return false;
};

module.exports = VALIDATION;
