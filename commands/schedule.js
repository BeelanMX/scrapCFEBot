const cron = require('node-cron');

module.exports = {
    name: 'schedule',
    description: 'Let the user to schedule a search.',
    cooldown: 0,
    execute(message, flag, args) {
        message.reply('Program your search:');
        const FLAG_ARRAY = flag[0][0].toLowerCase();
        const VALUE = flag[0][1].toLowerCase();
        message.reply(FLAG_ARRAY)
        console.log(VALUE)
        /*cron.schedule('* * * * *', function() {
            message.reply('Test message every minute');
            console.log('running a task every minute');
          });*/
},
};