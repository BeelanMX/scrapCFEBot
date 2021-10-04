/* eslint-disable indent */
const PREFIX = process.env.PREFIX;

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute(message, ARGS) {
    const DATA = [];
    // eslint-disable-next-line object-curly-spacing
    const { COMMANDS } = message.CLIENT;

    if (!ARGS.length) {
      // eslint-disable-next-line quotes
      DATA.push("Here's a list of all my commands:");
      DATA.push(COMMANDS.map((COMMAND) => COMMAND.name).join(', '));
      DATA.push(
        // eslint-disable-next-line max-len
        `\nYou can send \`${PREFIX}help [command name]\` to get info on a specific command.`,
      );

      // eslint-disable-next-line object-curly-spacing
      return message.channel.send(DATA, { split: true });
    }

    const NAME = ARGS[0].toLowerCase();
    const COMMAND =
      COMMANDS.get(NAME) ||
      COMMANDS.find((c) => c.aliases && c.aliases.includes(NAME));

    if (!COMMAND) {
      // eslint-disable-next-line quotes
      return message.reply("That's not a valid command.");
    }

    DATA.push(`**Name:** ${COMMAND.NAME}`);

    if (COMMAND.aliases) {
      DATA.push(`**Aliases:** ${COMMAND.aliases.join(', ')}`);
    }
    if (COMMAND.description) {
      DATA.push(`**Description:** ${COMMAND.description}`);
    }
    if (COMMAND.usage) {
      DATA.push(`**Usage:** ${PREFIX}${COMMAND.NAME} ${COMMAND.usage}`);
    }

    DATA.push(`**Cooldown:** ${COMMAND.cooldown || 3} second(s)`);

    // eslint-disable-next-line object-curly-spacing
    message.channel.send(DATA, { split: true });
  },
};
