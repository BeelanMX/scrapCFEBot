'use strict';

module.exports = {
  name: 'stop',
  description: 'Stop the scraping process.',
  cooldown: 3,
  execute(client, message, args) {
    message.channel.reply("Shutting down...").then(() => {
      client.destroy();
    })
  },
};
