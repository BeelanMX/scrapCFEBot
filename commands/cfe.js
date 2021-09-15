'use strict';

const Validation = require('../utils/validator');
const Scrapper = require('../webScraping/cfeScrapper');
const route = './assets/Data-From-Table.json';
const myValidator = new Validation();

module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 3,
  execute(message, args) {
    if (!args) {
      return message.channel.send('The command needs a searching parameter.');
    }
    const executeScrapper = myValidator.isFileLastUpdateIn(route);
    if (!executeScrapper) {
      message.reply('Is needed to execute the scrapper, executing...');
      const cfeScrapper = new Scrapper(args);
      cfeScrapper.doScraping();
    } else {
      message.reply('Is not needed to execute the scrapper');
    }
  },
};
