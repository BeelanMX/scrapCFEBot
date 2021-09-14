const talkedRecently = new Set();
module.exports = {
  name: 'cfe',
  description: 'Get searching parameters from the user.',
  cooldown: 3,
  execute(message, args) {
    if (!message) return message.channel.send('The command needs a searching parameter.');
    message.channel.send(message);

    if (talkedRecently.has(message.author.id)) {
      message.channel.send("Wait  minute before getting typing this again. - ");
    } else {

      // the user can type the command ... your command code goes here :)

      // Adds the user to the set so that they can't talk for a minute
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
      }, 60000);
    }

  },
};