'use strict';

// eslint-disable-next-line valid-jsdoc
/**
 *
 * @param { string } selector Identifier for the table in DOM
 * @return { Array[][] } each array append is a row of the table,
 * each element a cel
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
