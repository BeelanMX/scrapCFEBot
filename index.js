/* eslint-disable indent */
'use strict';
// we're gonna use strict  mode in all

// const goCFE = require('./cfeScraping/index.js');

// eslint-disable-next-line object-curly-spacing
const puppeteer = require('puppeteer');
const URLPage = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';
const ScrapPage = require('./cfeScraping/cScrapPage');

// eslint-disable-next-line space-before-function-paren
new Promise(function () {
  const browser = puppeteer
    .launch()
    .then(() => {
      const myPage = new ScrapPage(browser);
      myPage.navigatePage(URLPage);
    })
    .catch((err) => {
      console.error('Error: ', err);
    });
});

// const data = {
//   idInput: 'descProc',
//   textInput: 'IoT',
//   button: 'buscar',
// };

// myPage.openBrsowser();
