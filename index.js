/* eslint-disable indent */
const Scrapper = require('./webScraping/cfeScrapper');
const text = 'IoT';
const myScrap = new Scrapper(text);
myScrap.mainFunction();
