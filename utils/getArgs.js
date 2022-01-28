'use strict';

// eslint-disable-next-line valid-jsdoc
/**
 * This function separates the searching parameters from the other spaces.
 * @param { Array[][]} args Bi-dimensional array with the searching parameters
 * and flags.
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
