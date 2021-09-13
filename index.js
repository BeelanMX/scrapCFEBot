'use strict';
// we're gonna use strict mode in all

const Validation = require('./utils/validator');
const route = './assets/Data-From-Table.json';
const myValidator = new Validation();

console.log('Validate File', myValidator.isFileLastUpdateIn(route));
