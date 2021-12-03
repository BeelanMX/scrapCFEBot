/* eslint-disable comma-dangle */
/* eslint-disable indent */
'use strict';

const Validation = require('../utils/validator');
const myValidator = new Validation();
const sendMessage = require('../utils/sendTableMessage');
const Scrapper = require('../webScraping/cfeScrapper');
const replies = require('../utils/replyMessages');
const reply = replies.BOT_REPLIES;

/**
 * Main function of the command
 * @param { Message } message Channel to send the data
 * @arg { searchItems } args Searching parameters
 * @return { void }
 */
async function execute(message, args) {
  if (!args || args.length === 0) {
    return message.channel.send(reply.NEEDS_PARAMETER);
  }
  const ROUTE = `./assets/cfe_${args.join('').toLowerCase()}.json`;
  args = args.join(' ');
  const executeScrapper = myValidator.isFileLastUpdateIn(ROUTE);
  if (!executeScrapper) {
    message.reply(reply.NEEDS_EXECUTE_SCRAPPER);

    try {
      const cfeScrapper = new Scrapper(args);
      // Show how many data has been obtained
      cfeScrapper.printPercentage = (PERCENTAGE) => {
        message.reply(reply.LOADING, `${PERCENTAGE.toString()} %`);
      };
      const scrap = await cfeScrapper.doScraping(ROUTE);
      if (scrap === false) {
        // There's no data available
        message.reply(reply.NO_DATA_WITH, args);
        return;
      }
    } catch (error) {
      message.reply(replies.GENERAL.ERROR_EXECUTION, error);
    }
  } else {
    // If the file exists and was created in the lasts 20hr
    message.reply(reply.NO_NEEDS_EXECUTE_SCRAPPER);
  }

  // Send a message with the data obtained
  const tableMessage = sendMessage.jsonToEmbedMessage(ROUTE);
  let messageCounter = 0;
  for (let i = 0; i < tableMessage.length; i++) {
    message.reply(tableMessage[i]);
    messageCounter++;
  }
  if (tableMessage.length === messageCounter) {
    message.reply(reply.DATA_COMPLETED);
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
