/* eslint-disable indent */
'use strict';
// we're gonna use strict mode in all

require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const cooldowns = new Map();
// eslint-disable-next-line object-curly-spacing
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
// Assign the value "!" to the constant prefix, which you will use as the
// bot prefix.
const PREFIX = process.env.PREFIX;

client.commands = new Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on('ready', readyDiscord);

/**
 * Verify if the bot is connected
 */
function readyDiscord() {
  console.log('Ready');
}

// Check if the content of the message that the bot is processing starts with
// the prefix you set and if it doesn't stop processing
// eslint-disable-next-line space-before-function-paren
client.on('message', function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  // Convert the rest of the message to a command name and any arguments that
  // may exist in the message.
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  // If cooldowns map doesn't have a command.name key then create one.
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const currentTime = Date.now();
  const timeStamps = cooldowns.get(command.name);
  const cooldownAmount = command.cooldowns * 1000;

  // If time_stamps has a key with the author's id then check the
  // expiration time to send a message to a user.
  if (timeStamps.has(message.author.id)) {
    const expirationTime = timeStamps.get(message.author.id) + cooldownAmount;

    if (currentTime < expirationTime) {
      const timeLeft = (expirationTime - currentTime) / 1000;

      return message.reply(
        `Please wait ${timeLeft.toFixed(1)} more seconds before using ${command.name
        // eslint-disable-next-line comma-dangle
        }`
      );
    }
  }

  // If the author's id is not in timeStamps then add them with the current
  // time.
  timeStamps.set(message.author.id, currentTime);
  // Delete the user's id once the cooldown is over.
  setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Error trying to execute that command.');
  }
});

client.login(process.env.TOKEN);
