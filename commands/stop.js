
var ap = require('./../cfe.js');
module.exports = {
    name: 'stop',
    description: 'Stop the scraping process.',
    cooldown: 3,
    execute(client, message, args) {
        ap.stopSong(message.guild.id);
    },
};