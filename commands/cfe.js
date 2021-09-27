'use strict';

const Validation = require('../utils/validator');
const myValidator = new Validation();
const sendMessage = require('../utils/sendTableMessage');
const Scrapper = require('../webScraping/cfeScrapper');

/**
 *  Main function of the command
 * @param {Message} message
 * @arg {searchItems} args
 * @return {void}
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
      message.reply(`An Error in the execution...${error}`);
    }
  } else {
    message.reply('Is not needed execute the scrapper');
  }
  const tableMessage = sendMessage.jsonToEmbedMessage(route);
  message.reply(tableMessage);
}

module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 3,
  execute,
};
