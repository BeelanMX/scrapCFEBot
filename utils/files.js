'use strict';

const fs = require('fs');

/**
 * This function will tell you if a file was created in the period of time
 * that you specify by a parameter. First, it will get the time when the
 * file was created and the current date. Then, it gets the difference of
 * time between those two dates and depending of the answer it will return
 * a boolean.
 *
 * @param {number} hours Time in hours of last update that you want to verify.
 * @param {string} path It is the route or path of the file that you want
 * to validate.
 *
 * @return {boolean} It returns true in case the difference of hours is less
 * than the hours that are specified in the parameter. In the other hand,
 * it will return false.
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
