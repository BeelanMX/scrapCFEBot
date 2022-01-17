const cron = require('node-cron');
const Scrapper = require('../webScraping/cfeScrapper');

module.exports = {
    name: 'schedule',
    description: 'Let the user to schedule a search.',
    cooldown: 0,
    execute(message, flag, args) {
        const VALUE = flag[0][1].toLowerCase();
        const SEARCH = flag[1].toLowerCase();//1 (argumento) 2 (flag -s) 3 (estado)
        console.log(SEARCH)
        switch (VALUE) {
          case 'n':
            message.reply('Test message every minute');
            cron.schedule('* * * * *', function() {
              message.reply('Test message every minute');
              console.log('running a task every minute');
              const myScrap = new Scrapper(SEARCH);
              myScrap.doScraping();
              message.reply('Search running')
            });
            break;
          case 'd':
            message.reply('Test message every day');
            cron.schedule('0 12 * * 0-6', function() {
              //run everyday at 12pm
              message.reply('Your search will be done everyday at 12pm');
              console.log('running a task every day');
            });
            break;
          case 'w':
            message.reply('Your search will be done every saturday at 12pm')
            cron.schedule('0 12 * * 6', function() {
              //run every saturday at 12pm
              message.reply('Test message every week');
              console.log('running a task every week');
            });
            break;
          case 'm':
            message.reply('Your search will be done every 1st day of month at 12pm');
            cron.schedule('0 12 1 * *', function() {
              //run every 1st day of month at 12pm
              message.reply('Test message every month');
              console.log('running a task every month');
            });
            break;
          default:
            message.reply('Unrecognized flag. Use -d (every day), -w (every week) or -m (every month)');
            break;
        }
},
};