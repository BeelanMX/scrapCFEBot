/* eslint-disable indent */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { MessageEmbed } = require('discord.js');
const Validation = require('../utils/validator');
const Scrapper = require('../webScraping/cfeScrapper');
const myValidator = new Validation();

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
      const cfeScrapper = new Scrapper(args);
      cfeScrapper.doScraping(route);

      const embed = new MessageEmbed()
        .setTitle('DATA FROM CFE')
        .setColor(0x088a68)
        .addField('Titulo', 'Mensaje', true);
      message.channel.send(embed);
    } else {
      message.reply('Is not needed execute the scrapper');
    }
  },
};
