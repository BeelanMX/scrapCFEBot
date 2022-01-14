'use strict';

// eslint-disable-next-line valid-jsdoc
/**
 * This function is to get the information of a table, to do this, first,
 * with a querySelector, we obtain the elements of the table as an array,
 * then, for each one of those elements (the row), we obtain its children
 * (each cell), with that children, we push its information to a new array,
 * if it is a empty cell, it will push some hyphens just to indicate that
 * there is not information in that place.
 * Finally, it is returned an array with the data organized in arrays.
 *
 * @param { string } selector The HTML selector to identify the table, it
 * is important to not add the 'tr' because it is added automatically by
 * the function. It can be a identifier.
 *
 * @return { Array[][] } A tri-dimensional array with information of the
 * table indicated in the parameter.
 */
function tableToArray(selector) {
  const selection = `${selector} tr`;
  // Get the data with this selector
  const elements = document.querySelectorAll(selection);
  const inf = []; // Row set
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i].children;
    const indArr = []; // Data of each row
    for (let j = 0; j < elements.length; j++) {
      if (el[j].innerText == '' || el[j].innerText == 'undefined') {
        indArr.push('---');
      } else {
        indArr.push(el[j].innerText);
      }
    }
    inf.push(indArr);
  }
  return inf;
  // eslint-disable-next-line comma-dangle
}

// eslint-disable-next-line object-curly-spacing
module.exports = { tableToArray };
