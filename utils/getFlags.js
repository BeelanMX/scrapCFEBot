/* eslint-disable indent */
'use strict';

// eslint-disable-next-line valid-jsdoc
/**
 * This function is to separate the flags and its values from the search
 * arguments. Maybe, you can have something like: argument key value key value.
 * The function will erase the argument and return the key and value in an
 * bi-dimensional array (if you have more than one key).
 *
 * @param { Array[string] } args It is the array with the search parameters
 * and its flags with values, the flag's key must start with a hyphen, and then,
 * must appear the key..
 *
 * @return { Array[][] } A bi-dimensional array, each uni-dimensional array
 * will be each flag and its value, the bi-dimensional array will be something
 * like: [[key, value], [key, value]].
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
