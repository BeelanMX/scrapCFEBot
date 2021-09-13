'use strict';
const fs = require('fs');
/**
 * Cluster to validate if the time of the last update in the file is
 * in the time (hours) we are providing.
 * @param {number} hours time in hous of last update
 * @return {function} @param {strng} path path of the file to validate
 */
const isFileHasLessHoursUpdate = (hours) => (path) => {
  const { mtime } = fs.statSync(path);

  let dateLastModified = mtime;
  let dateToday = new Date();

  dateLastModified = dateLastModified.getTime();
  dateToday = dateToday.getTime();

  const dif = (dateToday - dateLastModified) / (1000 * 60 * 60);
  if (dif < hours) {
    return true;
  }
  return false;
};

module.exports = {
  isFileHasLessHoursUpdate,
};
