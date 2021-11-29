/* eslint-disable comma-dangle */
/* eslint-disable indent */
'use strict';

const Validation = require('../utils/validator');
const myValidator = new Validation();
const sendMessage = require('../utils/sendTableMessage');
const Scrapper = require('../webScraping/cfeScrapper');

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
  const executeScrapper = myValidator.isFileLastUpdateIn(ROUTE);
  if (!executeScrapper) {
    message.reply('Is needed execute the scrapper, executing...');

    // Check if there is any flag
    const flag = args.filter((arg, index) => {
      if (arg[0] === '-') {
        return [arg, args[index + 1]];
      }
    });
    for (let i = args.length - 1; i > 0; i--) {
      if (args[i].substring(0, 1) === '-') {
        args.splice(i, 2);
      }
    }
    args = args.join(' ');
    try {
      const cfeScrapper = new Scrapper(args, flag);
      // Show how many data has been obtained
      cfeScrapper.printPercentage = (PERCENTAGE) => {
        if (PERCENTAGE.toString() === 'NaN') {
          message.reply('Loading data...');
        } else {
          message.reply(`Loading data ${PERCENTAGE.toString()} %`);
        }
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
