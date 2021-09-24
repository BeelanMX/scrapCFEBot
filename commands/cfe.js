'use strict';

const Validation = require('../utils/validator');
const myValidator = new Validation();
const sendMessage = require('../utils/sendTableMessage');
const Scrapper = require('../webScraping/cfeScrapper');

/**
 * Do the scrap
 * @param { string } args Search parameter
 * @param { string } route Where the file will be saved
 */
async function makeScrap(args, route) {
  const cfeScrapper = new Scrapper(args);
  const scrap = await cfeScrapper.doScraping(route);
  if (scrap === false) {
    message.channel.send('There is no data available');
    return;
  }

  sendMessage.sendTableMessage(route);
}

module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 3,
  execute(message, args) {
    if (!args || args.length == 0) {
      return message.channel.send('The command needs a searching parameter.');
    }
    const route = `./assets/cfe_${args.join('').toLowerCase()}.json`;
    args = args.join(' ');
    const executeScrapper = myValidator.isFileLastUpdateIn(route);
    if (!executeScrapper) {
      message.reply('Is needed execute the scrapper, executing...');
      makeScrap(args, route);
    } else {
      message.reply('Is not needed execute the scrapper');
    }
  },
};
