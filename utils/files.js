'use strict';

const fs = require('fs');

/**
 * Closure to validate if the time of the last update in the file is
 * in the time (hours) we are providing.
 * @param {number} hours time in hours of last update
 * @return {function} @param {string} path path of the file to validate
 */
const isFileHasLessHoursUpdate = (hours) => (path) => {
  // eslint-disable-next-line object-curly-spacing
  const { mtime } = fs.statSync(path);

  let dateLastModified = mtime;
  let dateToday = new Date();

  dateLastModified = dateLastModified.getTime();
  dateToday = dateToday.getTime();

  const MINUTE_MS = 1000 * 60;
  const HOUR_MS = MINUTE_MS * 60;
  const DIF = (dateToday - dateLastModified) / HOUR_MS;
  if (DIF < hours) {
    return true;
  }
  return false;
};

module.exports = {
  isFileHasLessHoursUpdate,
};
