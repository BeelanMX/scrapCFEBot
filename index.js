/* eslint-disable require-jsdoc */
/* eslint-disable indent */
'use strict';
// we're gonna use strict  mode in all

const puppeteer = require('puppeteer');
const URLPage = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';
const ScrapPage = require('./cfeScraping/cScrapPage');

// eslint-disable-next-line space-before-function-paren
// new Promise(function () {
//   const browser = puppeteer
//     .launch()
//     .then(() => {
//       const myPage = new ScrapPage(browser);
//       myPage.openNewPage();
//       myPage.navigatePage(URLPage);
//     })
//     .catch((err) => {
//       console.error('Error: ', err);
//     });
// });

async function newBrowser() {
  const browser = await puppeteer.launch();
  console.log('Opening a new browser...');
  return browser;
}

const myPromise = () => {
  return new Promise((resolve, reject) => {
    const browser = newBrowser();
    if (1 + 1 == 2) {
      resolve(browser);
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Cannot open a browser');
    }
  });
};

myPromise()
  .then((res) => {
    const browser = res;
    const myPage = new ScrapPage(browser);
    myPage.openNewPage(URLPage);
    // })
    //   .then(() => {
    // myPage.navigatePage(URLPage);
    return;
  })
  .catch((err) => {
    return console.error('Error: ', err);
  });

// let browser;

// async function newBrowser() {
//   browser = await puppeteer.launch();
// }

// new Promise(() => {
//   browser = newBrowser();
//   const myPage = new ScrapPage(browser);
//   console.log('Browser 2', myPage);
// })
//   .then((res) => {
//     myPage.openNewPage();
//     console.log('Open page');

//     myPage.navigatePage(URLPage);
//     console.log('res ', res);
//   })
//   .catch((err) => {
//     console.error('Error1: ', err);
//   });
