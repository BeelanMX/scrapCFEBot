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
const headers = [
  'Número de Procedimiento',
  'Testigo Social',
  'Entidad Federativa',
  'Descripción',
  'Tipo de Procedimiento',
  'Tipo Contratación',
  'Fecha Publicación',
  'Estado',
  'Adjudicado A',
  'Monto Adjudicado en Pesos',
  'Detalle',
];

async function newBrowser() {
  const browser = await puppeteer.launch();
  console.log('Opening a new browser...');
  return browser;
}

(async () => {
  try {
    const browser = await newBrowser();
    const myPage = new ScrapPage(browser);
    await myPage.openNewPage(URLPage);
    await myPage.fillInput(idInput, text, waitingTime);
    await myPage.clickButton(idButton, waitingTime);
    console.log('Getting data...');
    const data = await myPage.getDataTable(myPage.createObject, headers);
    await myPage.saveFile(data, route);
    await myPage.closeBrowser();
  } catch (err) {
    console.error('Error: ', err);
  }
})();
