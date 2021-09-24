/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

// eslint-disable-next-line valid-jsdoc
/**
 * This function create the message that will send the bot
 * @param { string } args With which string the cfeScrapper will be executed
 * @param { string } route Where it will save the file created
 * @param {*} message
 */
async function sendTableMessage(route) {
  fs.readFile(route, (err, data) => {
    if (err) throw err;
    const dataFromJson = JSON.parse(data);
    const embed = new MessageEmbed()
        .setTitle('DATA FROM CFE')
        .setColor(0x01a001);
    for (let i = 0; i < dataFromJson.length; i++) {
      const objectKeys = Object.keys(dataFromJson[i]);
      const objectValues = Object.values(dataFromJson[i]);
      for (let j = 0; j < objectKeys.length; j++) {
        embed.addField(objectKeys[j], objectValues[j], true);
      }
      embed.addField('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
      if (embed.length >= 5000) {
        embed.setFooter(`The data is too long. If you want, you can see the complete data in ${route}`);
        break;
      }
    }
    // message.channel.send(embed);
    console.log(embed);
  });
};

// eslint-disable-next-line object-curly-spacing
module.exports = { sendTableMessage };
