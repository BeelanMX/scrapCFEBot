'use strict';

const VALIDATION = require('../utils/validator');
const MY_VALIDATOR = new VALIDATION();
const SEND_MESSAGE = require('../utils/sendTableMessage');
const SCRAPPER = require('../webScraping/cfeScrapper');

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
  const ROUTE = `./assets/cfe_${args.join('').toLowerCase()}.json`;
  args = args.join(' ');
  const EXECUTE_SCRAPPER = MY_VALIDATOR.isFileLastUpdateIn(ROUTE);
  if (!EXECUTE_SCRAPPER) {
    message.reply('Is needed execute the scrapper, executing...');

    try {
      const CFE_SCRAPPER = new SCRAPPER(args);
      // Show how many data has been obtained
      CFE_SCRAPPER.printPercentage = (percentage) => {
        message.reply(`Loading data ${percentage.toString()} %`);
      };
      const SCRAP = await CFE_SCRAPPER.doScraping(ROUTE);
      if (SCRAP === false) {
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
  const TABLE_MESSAGE = SEND_MESSAGE.jsonToEmbedMessage(ROUTE);
  for (let i = 0; i < TABLE_MESSAGE.length; i++) {
    message.reply(TABLE_MESSAGE[i]);
  }
  message.reply('That is all the data I found');
}

module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 0,
  execute,
};
