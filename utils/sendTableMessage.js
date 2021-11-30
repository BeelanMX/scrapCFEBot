/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const FIELD_ARRAY = [];

/**
 * Create an array with each message to be sended
 * @param { object } data Each embed message
 * @return { MessageEmbed }
 */
function createEmbed(data) {
  const embed = new MessageEmbed()
    .setTitle('DATA FROM CFE')
    .setColor(0x01a001)
    .setThumbnail('https://www.cfe.mx/cdn/2019/assets/images/logo.png')
    .addField(data.name, data.values);
  return embed;
}

/**
 * Convert the data into a EmbedMessage
 * @param { String } ROUTE Where's the file with the data
 * @return { Array[] } Array with each message embed
 */
function jsonToEmbedMessage(ROUTE) {
  try {
    const data = fs.readFileSync(ROUTE, 'utf8');
    const dataFromJSON = JSON.parse(data);

    // Save the data in an array, ordered as we need to print it
    for (let i = 0; i < dataFromJSON.length; i++) {
      const objectKeys = Object.keys(dataFromJSON[i]);
      const objectValues = Object.values(dataFromJSON[i]);
      const VALUES = [];
      for (let j = 0; j < objectKeys.length; j++) {
        VALUES.push(`${objectKeys[j]}: ${objectValues[j]}`);
      }

      const FIELD = {
        name: VALUES.shift(),
        values: VALUES.join('\n'),
      };
      FIELD_ARRAY.push(FIELD);
    }
    const embed = [];
    for (let i = 0; i < FIELD_ARRAY.length; i++) {
      embed.push(createEmbed(FIELD_ARRAY[i]));
    }
    return embed;
  } catch (err) {
    console.error(err);
  }
}
// eslint-disable-next-line object-curly-spacing
module.exports = { jsonToEmbedMessage };
