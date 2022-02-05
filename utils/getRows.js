'use strict';

/**
 * This function is just to get the quantity of rows in a table.
 * To achieve it, the function just get a text from a HTML site, where is
 * located the number.
 *
 * @param {string} selector This is the HTML selector that tells the
 * system where is located the number, it can be an identifier.
 *
 * @return {int | string} It returns a number, it can be a string or an
 * integer of the quantity of data obtained.
 */
function getRows(selector) {
  const rows = document.querySelector(selector).innerText;
  return rows;
}

// eslint-disable-next-line object-curly-spacing
module.exports = { getRows };
