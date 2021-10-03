/* eslint-disable max-len */
/* eslint-disable indent */
const prefix = process.env.PREFIX;

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute(message, args) {
    const data = [];
    // eslint-disable-next-line object-curly-spacing
    const { commands } = message.client;

    if (!args.length) {
      // eslint-disable-next-line quotes
      data.push("Here's a list of all my commands:");
      data.push(commands.map((command) => command.name).join(', '));
      data.push(
        // eslint-disable-next-line prettier/prettier
        `\nYou can send \`${prefix}help [command name]\` to get info on a specific command.`,
      );

      // eslint-disable-next-line object-curly-spacing
      return message.channel.send(data, { split: true });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      // eslint-disable-next-line quotes
      return message.reply("That's not a valid command.");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) {
      data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    }
    if (command.description) {
      data.push(`**Description:** ${command.description}`);
    }
    if (command.usage) {
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
    }

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    // eslint-disable-next-line object-curly-spacing
    message.channel.send(data, { split: true });
  },
};
