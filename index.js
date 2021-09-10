'use strict';
// we're gonna use strict mode in all

const Validation = require('./utils/validator');
const Scrapper = require('./webScraping/cfeScrapper');
const text = 'IoT';
const myScrap = new Scrapper(text);
const route = './assets/Data-From-Table.json';
const myValidator = new Validation(route);

myValidator.validator(myScrap.doScraping);
