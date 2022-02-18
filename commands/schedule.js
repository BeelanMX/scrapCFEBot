/* eslint-disable max-len */
/* eslint-disable indent */
const cron = require('node-cron');
const Scrapper = require('../webScraping/cfeScrapper');
// eslint-disable-next-line object-curly-spacing
const { getFlags } = require('../utils/getFlags');
// eslint-disable-next-line object-curly-spacing
const { getArgs } = require('../utils/getArgs');

module.exports = {
  name: 'schedule',
  description: 'Let the user to schedule a search.',
  cooldown: 0,
  execute(message, scheduleflag, args) {
    const VALUE = scheduleflag[0][1].toLowerCase();
    scheduleflag.shift();
    let search = scheduleflag;
    const ROUTE = `./assets/cfe_${search.join('').toLowerCase()}.json`;
    const FLAG = getFlags(scheduleflag);
    search = getArgs(search);

    switch (VALUE) {
      case 'd':
        message.reply('Your search will be done every day');
        // eslint-disable-next-line prettier/prettier
        cron.schedule('0 12 * * 0-6', function() {
          // run everyday at 12pm
          const myScrap = new Scrapper(search, FLAG);
          myScrap.doScraping(ROUTE);
          message.reply('Search running');
        });
        break;
      case 'w':
        message.reply('Your search will be done every saturday at 12pm');
        // eslint-disable-next-line prettier/prettier
        cron.schedule('0 12 * * 6', function() {
          // run every saturday at 12pm
          const myScrap = new Scrapper(search, FLAG);
          myScrap.doScraping(ROUTE);
          message.reply('Search running');
        });
        break;
      case 'm':
        message.reply(
          // eslint-disable-next-line prettier/prettier
          'Your search will be done every 1st day of month at 12pm',
        );
        // eslint-disable-next-line prettier/prettier
        cron.schedule('0 12 1 * *', function() {
          // run every 1st day of month at 12pm
          const myScrap = new Scrapper(search, FLAG);
          myScrap.doScraping(ROUTE);
          message.reply('Search running');
        });
        break;
      default:
        message.reply(
          // eslint-disable-next-line comma-dangle
          'Unrecognized flag. Use -d (every day), -w (every week) or -m (every month)'
        );
        break;
    }
  },
};