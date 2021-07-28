'use strict';
// we're gonna use strict  mode in all

const goCFE = require('./cfeScraping/index.js');
const data = {
  idInput: 'descProc',
  textInput: 'IoT',
  button: 'buscar',
};

goCFE.openBrowser(data);
