/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const fieldArray = [];

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
 * @param { String } route Where's the file with the data
 * @return { Array[] } Array with each message embed
 */
function jsonToEmbedMessage(route) {
  try {
    const data = fs.readFileSync(route, 'utf8');
    const dataFromJson = JSON.parse(data);

    // Save the data in an array, ordered as we need to print it
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
      fieldArray.push(field);
    }
    const embed = [];
    for (let i = 0; i < fieldArray.length; i++) {
      embed.push(createEmbed(fieldArray[i]));
    }
    return embed;
  } catch (err) {
    console.error(err);
  }
}
// eslint-disable-next-line object-curly-spacing
module.exports = { jsonToEmbedMessage };
