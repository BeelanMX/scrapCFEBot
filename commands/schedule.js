const cron = require('node-cron');

module.exports = {
    name: 'schedule',
    description: 'Let the user to schedule a search.',
    cooldown: 0,
    execute(message, args) {
        message.reply('Command listened');
cron.schedule('* * * * *', function() {
    message.reply('Test message every minute');
    console.log('running a task every minute');
  });
},
};