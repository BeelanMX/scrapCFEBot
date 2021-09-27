'use strict';

const Validation = require('../utils/validator');
const Scrapper = require('../webScraping/cfeScrapper');
const myValidator = new Validation();
const fs = require('fs');

/**
 * transform message to string
 * @param {JsonObject} myJSON
 * @return {string} length of 2000
 */
function messageToSend(myJSON) {
  const values = [];
  for (let i = 0; i < myJSON.length; i++) {
    const objectKeys = Object.keys(myJSON[i]);
    const objectValues = Object.values(myJSON[i]);
    for (let j = 0; j < objectKeys.length; j++) {
      values.push(`${objectKeys[j]}: ${objectValues[j]}`);
    }
    values.push('\n');
  }
  return values.join('\n').substr(0, 2000);
}
/**
 * The main function of use
 * @param {Message} message
 * @argument
 */
async function execute(message, args) {
  if (!args || args.length == 0) {
    return message.channel.send('The command needs a searching parameter.');
  }
  const route = `./assets/cfe_${args.join('').toLowerCase()}.json`;
  args = args.join(' ');
  try {
    const executeScrapper = myValidator.isFileLastUpdateIn(route);
    if (!executeScrapper) {
      message.reply('Is needed execute the scrapper, executing...');
      const cfeScrapper = new Scrapper(args);
      cfeScrapper.printPercentage = (percentage) => {
        message.reply(`Loading data ${percentage.toString()} %`);
      };
      await cfeScrapper.doScraping(route);
    } else {
      message.reply('Is not needed execute the scrapper');
    }
    const jsonString = fs.readFileSync(route, 'utf8');
    const myJSON = JSON.parse(jsonString);
    message.channel.send(messageToSend(myJSON));
  } catch (err) {
    console.log('Error parsing JSON string:', err);
    message.channel.send('There was an Error');
  }
}

module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 3,
  execute,
};
