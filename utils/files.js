'use strict';

const FS = require('fs');

/**
 * Closure to validate if the time of the last update in the file is
 * in the time (hours) we are providing.
 * @param {number} hours time in hours of last update
 * @return {function} @param {string} path path of the file to validate
 */
const IS_FILE_HAS_LESS_HOURS_UPDATE = (hours) => (path) => {
  // eslint-disable-next-line object-curly-spacing
  const { mtime } = FS.statSync(path);

  let dateLastModified = mtime;
  let dateToday = new Date();

  dateLastModified = dateLastModified.getTime();
  dateToday = dateToday.getTime();

  const DIF = (dateToday - dateLastModified) / (1000 * 60 * 60);
  if (DIF < hours) {
    return true;
  }
  return false;
};

module.exports = {
  IS_FILE_HAS_LESS_HOURS_UPDATE,
};
