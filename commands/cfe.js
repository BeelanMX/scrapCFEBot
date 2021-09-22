/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { MessageEmbed } = require('discord.js');
const Validation = require('../utils/validator');
const Scrapper = require('../webScraping/cfeScrapper');
const myValidator = new Validation();
const fs = require('fs');

// eslint-disable-next-line valid-jsdoc
/**
 * This function create the message that will send the bot
 * @param { object } cfeScrapper Instance of Scrapper
 * @param { string } route Where it will save the file created
 * @param {*} message
 */
async function sendTableMessage(cfeScrapper, route, message) {
  const scrap = await cfeScrapper.doScraping(route);
  if (scrap === false) {
    message.channel.send('There is no data available');
    return;
  }
  fs.readFile(route, (err, data) => {
    if (err) throw err;
    const dataFromJson = JSON.parse(data);
    const embed = new MessageEmbed()
        .setTitle('DATA FROM CFE')
        .setColor(0x01a001);
    for (let i = 0; i < dataFromJson.length; i++) {
      embed.addField('Numero De Procedimiento', dataFromJson[i].numeroDeProcedimiento, true);
      embed.addField('Testigo Social', dataFromJson[i].testigoSocial, true);
      embed.addField('Entidad Federativa', dataFromJson[i].entidadFederativa, true);
      embed.addField('Descripcion', dataFromJson[i].descripcion, true);
      embed.addField('Tipo De Procedimiento', dataFromJson[i].tipoDeProcedimiento, true);
      embed.addField('Tipo De Contratacion', dataFromJson[i].tipoContratacion, true);
      embed.addField('Fecha Publicacion', dataFromJson[i].fechaPublicacion, true);
      embed.addField('Estado', dataFromJson[i].estado, true);
      embed.addField('Adjudicado A', dataFromJson[i].adjudicadoA, true);
      embed.addField('Monto Adjudicado En Pesos', dataFromJson[i].montoAdjudicadoEnPesos, true);
      embed.addField('Detalle', dataFromJson[i].detalle, true);
      embed.addField('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
      if (embed.length >= 5000) {
        embed.setFooter(`The data is too long. If you want, you can see the complete data in ${route}`);
        break;
      }
    }
    message.channel.send(embed);
  });
};

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
