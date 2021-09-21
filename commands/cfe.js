/* eslint-disable prettier/prettier */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { MessageEmbed } = require('discord.js');
const Validation = require('../utils/validator');
const Scrapper = require('../webScraping/cfeScrapper');
const myValidator = new Validation();
const fs = require('fs');

/**
 *
 */
async function sendTableMessage(cfeScrapper, route, message) {
  const scrap = await cfeScrapper.doScraping(route);
  if (scrap === false) {
    message.channel.send('There is no data available');
    return;
  }
  fs.readFile(route, (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  // const embed = new MessageEmbed()
  //     .setTitle('DATA FROM CFE')
  //     .setColor(0x01a001);
  // for (let i = 0; i < data.length; i++) {
  //   embed.addFields(
  //       {name: 'numeroDeProcedimiento', value: 'Texto de prueba', inline: true},
  //       {name: 'testigoSocial', value: 'Texto de prueba', inline: true},
  //       {name: 'entidadFederativa', value: 'Texto de prueba', inline: true},
  //   );
  // }
  // message.channel.send(embed);
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
      const cfeScrapper = new Scrapper(args);
      sendTableMessage(cfeScrapper, route, message);
    } else {
      message.reply('Is not needed execute the scrapper');
    }
  },
};
