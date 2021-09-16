module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 15,
  execute(message, args) {
    if (!args) return message.channel.send('The command needs a searching parameter.');
    message.channel.send(message);
  },
};