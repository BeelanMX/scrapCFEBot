/* eslint-disable indent */
'use strict';

// eslint-disable-next-line valid-jsdoc
/**
 * This function is to separate the flags and its values from the search
 * arguments.
 * @param { Array[string] } args It is the array with the search parameters
 * and its flags with values.
 * @return { Array[][] } A bi-dimensional array, the uni-dimensional array
 * will be each flag and its value.
 */
function getFlags(args) {
  const FLAG = args
    .map((arg, index, array) => {
      if (arg[0] === '-') {
        return [arg, array[index + 1]];
      }
      return null;
    })
    .filter((flag) => (flag ? true : false));
  return FLAG;
}

// eslint-disable-next-line object-curly-spacing
module.exports = { getFlags };
