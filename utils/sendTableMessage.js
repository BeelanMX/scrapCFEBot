/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { MessageEmbed } = require('discord.js');
const FS = require('fs');
const FIELD_ARRAY = [];

/**
 * Create an array with each message to be sended
 * @param { object } data Each embed message
 * @return { MessageEmbed }
 */
function createEmbed(data) {
  const EMBED = new MessageEmbed()
    .setTitle('DATA FROM CFE')
    .setColor(0x01a001)
    .setThumbnail('https://www.cfe.mx/cdn/2019/assets/images/logo.png')
    .addField(data.name, data.values);
  return EMBED;
}

/**
 * Convert the data into a EmbedMessage
 * @param { String } ROUTE Where's the file with the data
 * @return { Array[] } Array with each message embed
 */
function jsonToEmbedMessage(ROUTE) {
  try {
    const DATA = FS.readFileSync(ROUTE, 'utf8');
    const DATA_FROM_JSON = JSON.parse(DATA);

    // Save the data in an array, ordered as we need to print it
    for (let i = 0; i < DATA_FROM_JSON.length; i++) {
      const OBJECT_KEYS = Object.keys(DATA_FROM_JSON[i]);
      const OBJECT_VALUES = Object.values(DATA_FROM_JSON[i]);
      const VALUES = [];
      for (let j = 0; j < OBJECT_KEYS.length; j++) {
        VALUES.push(`${OBJECT_KEYS[j]}: ${OBJECT_VALUES[j]}`);
      }

      const field = {
        name: VALUES.shift(),
        values: VALUES.join('\n'),
      };
      FIELD_ARRAY.push(field);
    }
    const EMBED = [];
    for (let i = 0; i < FIELD_ARRAY.length; i++) {
      EMBED.push(createEmbed(FIELD_ARRAY[i]));
    }
    return EMBED;
  } catch (err) {
    console.error(err);
  }
}
// eslint-disable-next-line object-curly-spacing
module.exports = { jsonToEmbedMessage };
