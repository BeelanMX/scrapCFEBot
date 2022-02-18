'use strict';

// eslint-disable-next-line valid-jsdoc
/**
 * This function separates the searching parameters from the other words, if
 * your search is something like: argument argument key value, this function
 * will save those arguments in an array, and return it, the keys and its values
 * will be deleted.
 *
 * @param { Array[] } args Uni-dimensional array with the searching parameters
 * and flags, with the structure: [argument, flag, value]. It could receive more
 * than one argument, flag and value.
 *
 * @return { Array[] } An uni-dimensional array with the searching parameters.
 */
function getArgs(args) {
  args = args.filter((arg, index, array) => {
    if (array[index - 1] == undefined) {
      return arg;
    } else if (arg[0] === '-' || array[index - 1][0] === '-') {
      return;
    } else {
      return arg;
    }
  });
  return args;
}

// eslint-disable-next-line object-curly-spacing
module.exports = { getArgs };
