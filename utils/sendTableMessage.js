/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
'use strict';

// eslint-disable-next-line object-curly-spacing
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

/**
 * This function creates an embed message with some characteristics to make more
 * visible and interactive the kind of information that is receiving the user,
 * it uses images and colors to achieve that, and you can modify it.
 *
 * @param { object } data This object is for the data that the embed message
 * will have, in this moment is needed to have a name and its values.
 *
 * @return { MessageEmbed } It returns the embed message with the styles (images and colors)
 * and it is ready to be sended in Discord.
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
 * Convert the data into an EmbedMessage. This function help us to create a
 * embed message to be sended by Discord. This function uses fs and
 * MessageEmbed from Discord.
 * First it will read the information from the path provided in the parameter,
 * and it will pass it to string.
 * Then, for each element it will obtain the key and its value and save that
 * information in an array with the format we want.
 * At this point, we have an array with the information that will be setting
 * in the embed message, to create it, we use another loop for each element
 * of the previous array, using the function createEmbed, which receives the
 * element, create the embed message and returns it to be saved in an array
 * that will be returned.
 *
 * @param { String } ROUTE This is the location from the file that we want to
 * use, it is important to use a JSON file that contains an array, with the
 * structure: [{...},{...},...,{...}]
 *
 * @return { Array[] } It returns an array of embed messages.
 */
function jsonToEmbedMessage(ROUTE) {
  try {
    const data = fs.readFileSync(ROUTE, 'utf8');
    const dataFromJSON = JSON.parse(data);
    const FIELD_ARRAY = [];

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
