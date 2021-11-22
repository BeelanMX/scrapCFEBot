/* eslint-disable comma-dangle */
/* eslint-disable indent */
'use strict';

const validation = require('../utils/validator');
const myValidator = new validation();
const sendMessage = require('../utils/sendTableMessage');
const scrapper = require('../webScraping/cfeScrapper');

/**
 * Main function of the command
 * @param { Message } message Channel to send the data
 * @arg { searchItems } args Searching parameters
 * @return { void }
 */
async function execute(message, args) {
  if (!args || args.length === 0) {
    return message.channel.send('The command needs a searching parameter.');
  }
  const ROUTE = `./assets/cfe_${args.join('').toLowerCase()}.json`;
  args = args.join(' ');
  const executeScrapper = myValidator.isFileLastUpdateIn(ROUTE);
  if (!executeScrapper) {
    message.reply('Is needed execute the scrapper, executing...');

    try {
      const cfeScrapper = new scrapper(args);
      // Show how many data has been obtained
      cfeScrapper.printPercentage = (PERCENTAGE) => {
        message.reply(`Loading data ${PERCENTAGE.toString()} %`);
      };
      const scrap = await cfeScrapper.doScraping(ROUTE);
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
  const tableMessage = sendMessage.jsonToEmbedMessage(ROUTE);
  let messageCounter = 0;
  for (let i = 0; i < tableMessage.length; i++) {
    message.reply(tableMessage[i]);
    messageCounter++;
  }
  if (tableMessage.length === messageCounter) {
    message.reply('That is all the data I found');
  } else {
    message.reply(
      // eslint-disable-next-line max-len
      `I found ${tableMessage.length} but I could only show you ${messageCounter}`
    );
  }
}

module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 0,
  execute,
};
