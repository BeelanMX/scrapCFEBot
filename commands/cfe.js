'use strict';

const Validation = require('../utils/validator');
const myValidator = new Validation();
const sendMessage = require('../utils/sendTableMessage');
const Scrapper = require('../webScraping/cfeScrapper');
const Discord = require('discord.js');

/**
 * Main function of the command
 * @param { Message } message Channel to send the data
 * @arg { searchItems } args Searching parameters
 * @return { void }
 */
async function execute(message, args) {
  if (!args || args.length == 0) {
    return message.channel.send('The command needs a searching parameter.');
  }
  const route = `./assets/cfe_${args.join('').toLowerCase()}.json`;
  args = args.join(' ');
  const executeScrapper = myValidator.isFileLastUpdateIn(route);
  if (!executeScrapper) {
    message.reply('Is needed execute the scrapper, executing...');

    try {
      const cfeScrapper = new Scrapper(args);
      // Show how many data has been obtained
      cfeScrapper.printPercentage = (percentage) => {
        message.reply(`Loading data ${percentage.toString()} %`);
      };
      const scrap = await cfeScrapper.doScraping(route);
      if (scrap === false) {
        // There's no data available
        message.reply(`There's no data available with ${args}`);
        return;
      }
    } catch (error) {
      message.reply(`An error in the execution...${error}`);
    }
  } else {
    // If the file exists and was created in the lasts 20hr
    message.reply('Is not needed execute the scrapper');
  }

  // Send a message with the data obtained
  const tableMessage = sendMessage.jsonToEmbedMessage(route);
  for (let i = 0; i < tableMessage.length; i++) {
    message.reply(tableMessage[i]);
  }

  // Send a file with the JSON
  const file = new Discord.MessageAttachment(route);
  message.reply(file);
}

module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 3,
  execute,
};
