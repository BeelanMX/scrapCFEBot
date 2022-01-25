/* eslint-disable max-len */
/* eslint-disable indent */
const PREFIX = process.env.PREFIX;

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  run(message, args) {
    const DATA = [];
    // eslint-disable-next-line object-curly-spacing
    const { COMMANDS } = message.client;

    if (!args.length) {
      // eslint-disable-next-line quotes
      DATA.push("Here's a list of all my commands:");
      DATA.push(COMMANDS.map((command) => command.name).join(', '));
      DATA.push(
        // eslint-disable-next-line prettier/prettier
        `\nYou can send \`${PREFIX}help [command name]\` to get info on a specific command.`,
      );

      // eslint-disable-next-line object-curly-spacing
      return message.channel.send(DATA, { split: true });
    }

    const name = args[0].toLowerCase();
    const command =
      COMMANDS.get(name) ||
      COMMANDS.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      // eslint-disable-next-line quotes
      return message.reply("That's not a valid command.");
    }

    DATA.push(`**Name:** ${command.name}`);

    if (command.aliases) {
      DATA.push(`**Aliases:** ${command.aliases.join(', ')}`);
    }
    if (command.description) {
      DATA.push(`**Description:** ${command.description}`);
    }
    if (command.usage) {
      DATA.push(`**Usage:** ${PREFIX}${command.name} ${command.usage}`);
    }

    DATA.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    // eslint-disable-next-line object-curly-spacing
    message.channel.send(DATA, { split: true });
  },
};
