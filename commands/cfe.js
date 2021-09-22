'use strict';

const Validation = require('../utils/validator');
const myValidator = new Validation();
const sendMessage = require('../utils/sendTableMessage');

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
      sendMessage.sendTableMessage(args, route, message);
    } else {
      message.reply('Is not needed execute the scrapper');
    }
  },
};
