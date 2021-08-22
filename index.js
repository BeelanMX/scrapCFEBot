/* eslint-disable require-jsdoc */
/* eslint-disable indent */
'use strict';
// we're gonna use strict  mode in all

const puppeteer = require('puppeteer');
const URLPage = 'https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/';
const ScrapPage = require('./cfeScraping/index.js');
const idInput = '#descProc';
const text = 'IoT';
const idButton = '#buscar';
const waitingTime = 2000;
const route = './assets/Data-From-Table.json';

async function newBrowser() {
  const browser = await puppeteer.launch();
  console.log('Opening a new browser...');
  return browser;
}

function createObject(item) {
  return {
    'Número de Procedimiento': item[0],
    'Testigo Social': item[1],
    'Entidad Federativa': item[2],
    // eslint-disable-next-line prettier/prettier
    'Descripción': item[3],
    'Tipo de Procedimiento': item[4],
    'Tipo Contratación': item[5],
    'Fecha Publicación': item[6],
    // eslint-disable-next-line prettier/prettier
    'Estado': item[7],
    'Adjudicado A': item[8],
    'Monto Adjudicado en Pesos': item[9],
    // eslint-disable-next-line prettier/prettier
    'Detail': item[10],
  };
}

(async () => {
  try {
    const browser = await newBrowser();
    const myPage = new ScrapPage(browser);
    await myPage.openNewPage(URLPage);
    await myPage.fillInput(idInput, text, waitingTime);
    await myPage.clickButton(idButton, waitingTime);
    console.log('Getting data...');
    const data = await myPage.getDataTable();
    const object = await data.map((item) => createObject(item));
    await myPage.saveFile(object, route);
    await myPage.closeBrowser();
  } catch (err) {
    console.error('Error: ', err);
  }
})();
