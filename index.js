/* eslint-disable indent */
const Scrapper = require('./webScraping/cfeScrapper');
const Validation = require('./utils/mainFunction');
const text = 'IoT';
const route = './assets/Data-From-Table.json';
const myScrap = new Scrapper(text);
const myValidator = new Validation(route);

myValidator.mainFunction();
