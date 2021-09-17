'use strict';

const Validation = require('../utils/validator');
const Scrapper = require('../webScraping/cfeScrapper');
const myValidator = new Validation();

module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 3,
  execute(message, args) {
    if (!args) {
      return message.channel.send('The command needs a searching parameter.');
    }
    const route = `./assets/cfe_${args.join('').toLowerCase()}.json`;
    args = args.join(' ');
    const executeScrapper = myValidator.isFileLastUpdateIn(route);
    if (!executeScrapper) {
      message.reply('Is needed execute the scrapper, executing...');
      const cfeScrapper = new Scrapper(args);
      cfeScrapper.doScraping(route);
    } else {
      message.reply('Is not needed execute the scrapper');
    }
  },
};
