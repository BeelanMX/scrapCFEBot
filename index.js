'use strict';
// we're gonna use strict mode in all

const Validation = require('./utils/mainFunction');
const route = './assets/Data-From-Table.json';
const myValidator = new Validation(route);

myValidator.mainFunction();
