/* eslint-disable indent */
const Scrapper = require('./webScraping/index');
const text = 'IoT';
const myScrap = new Scrapper(text);

myScrap.doScraping();
