/* eslint-disable comma-dangle */
/* eslint-disable indent */
'use strict';

const Validation = require('../utils/validator');
const myValidator = new Validation();
const sendMessage = require('../utils/sendTableMessage');
const Scrapper = require('../webScraping/cfeScrapper');
const REPLIES = require('../utils/replyMessages');
const REPLY = REPLIES.BOT_REPLIES;

/**
 * Main function of the command
 * @param { Message } message Channel to send the data
 * @arg { searchItems } args Searching parameters
 * @return { void }
 */
async function run(message, args) {
  if (!args || args.length === 0) {
    return message.channel.send(REPLY.NEEDS_PARAMETER);
  }
  const ROUTE = `./assets/cfe_${args.join('').toLowerCase()}.json`;
  const executeScrapper = myValidator.isFileLastUpdateIn(ROUTE);
  if (!executeScrapper) {
    message.reply(REPLY.NEEDS_EXECUTE_SCRAPPER);

    // Check if there is any flag
    const flag = args
      .map((arg, index, array) => {
        if (arg[0] === '-') {
          return [arg, array[index + 1]];
        }
        return null;
      })
      .filter((flag) => (flag ? true : false));
    args = args.filter((arg, index, array) => {
      if (array[index - 1] == undefined) {
        return arg;
      } else if (arg[0] === '-' || array[index - 1][0] === '-') {
        return;
      } else {
        return arg;
      }
    });
    args = args.join(' ');
    try {
      const cfeScrapper = new Scrapper(args, flag);
      // Show how many data has been obtained
      cfeScrapper.printPercentage = (PERCENTAGE) => {
        message.reply(REPLY.LOADING, `${PERCENTAGE.toString()} %`);
        if (PERCENTAGE.toString() === 'NaN') {
          message.reply(REPLY.LOADING);
        } else {
          message.reply(`${REPLY.LOADING} ${PERCENTAGE.toString()} %`);
        }
      };
      const scrap = await cfeScrapper.runScraping(ROUTE);
      if (scrap === false) {
        // There's no data available
        message.reply(`${REPLY.NO_DATA_WITH} ${args}`);
        return;
      }
    } catch (error) {
      message.reply(REPLIES.GENERAL.ERROR_EXECUTION, error);
    }
  } else {
    // If the file exists and was created in the lasts 20hr
    message.reply(REPLY.NO_NEEDS_EXECUTE_SCRAPPER);
  }

  // Send a message with the data obtained
  const tableMessage = sendMessage.jsonToEmbedMessage(ROUTE);
  let messageCounter = 0;
  for (let i = 0; i < tableMessage.length; i++) {
    message.reply(tableMessage[i]);
    messageCounter++;
  }
  if (tableMessage.length === messageCounter) {
    message.reply(REPLY.DATA_COMPLETED);
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
  run,
};
