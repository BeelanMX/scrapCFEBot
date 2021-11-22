'use strict';

/**
 * Get the number of rows in the table
 * @param {string} selector  Of where I'm going to get the data
 * @return {int | string} The data obtained
 */
function getRows(selector) {
  const rows = document.querySelector(selector).innerText;
  return rows;
}

// eslint-disable-next-line object-curly-spacing
module.exports = { getRows };
