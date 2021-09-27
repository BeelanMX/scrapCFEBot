'use strict';

const Validation = require('../utils/validator');
const Scrapper = require('../webScraping/cfeScrapper');
const myValidator = new Validation();
const fs = require('fs');

module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 3,
  execute(message, args) {
    if (!args || args.length == 0) {
      return message.channel.send('The command needs a searching parameter.');
    }
    const route = `./assets/cfe_${args.join('').toLowerCase()}.json`;
    args = args.join(' ');
    const executeScrapper = myValidator.isFileLastUpdateIn(route);
    if (!executeScrapper) {
      message.reply('Is needed execute the scrapper, executing...');
      const cfeScrapper = new Scrapper(args);
      cfeScrapper.doScraping(route);
    } else {
      message.reply('Is not needed execute the scrapper');
    }
    fs.readFile(`./assets/cfe_${args}.json`, (err, jsonString) => {
      if (err) {
        console.log('Error reading file', err);
        return;
      }
      try {
        const myJSON = JSON.parse(jsonString);
        const values = [];
        for (let i = 0; i < myJSON.length; i++) {
          const objectKeys = Object.keys(myJSON[i]);
          const objectValues = Object.values(myJSON[i]);
          for (let j = 0; j < objectKeys.length; j++) {
            values.push(`${objectKeys[j]}: ${objectValues[j]}`);
          }
          values.push('\n');
        }
        message.channel.send(values.join('\n').substr(0, 2000));
      } catch (err) {
        console.log('Error parsing JSON string:', err);
      }
    });
  },
};
