/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

/**
 *
 * @param {String} route
 * @return {MessageEmbed}
 */
function jsonToEmbedMessage(route) {
  try {
    const data = fs.readFileSync(route, 'utf8');
    const dataFromJson = JSON.parse(data);
    const embed = new MessageEmbed()
        .setTitle('DATA FROM CFE')
        .setColor(0x01a001);
    for (let i = 0; i < dataFromJson.length; i++) {
      const objectKeys = Object.keys(dataFromJson[i]);
      const objectValues = Object.values(dataFromJson[i]);
      const values = [];
      for (let j = 0; j < objectKeys.length; j++) {
        values.push(`${objectKeys[j]}: ${objectValues[j]}`);
      }

      const field = {
        name: values.shift(),
        values: values.join('\n'),
      };
      embed.addField(field.name, field.values);
      if (embed.length >= 5500) {
        // A field's name is limited to 256 characters and its value to 1024 characters
        // ref : https://discordjs.guide/popular-topics/embeds.html#editing-the-embedded-message-content
        embed.setFooter(
            `The data is too long. If you want, you can see the complete data in ${route}`,
        );
        break;
      }
    }
    return embed;
  } catch (err) {
    console.error(err);
  }
}
// eslint-disable-next-line object-curly-spacing
module.exports = { jsonToEmbedMessage };
