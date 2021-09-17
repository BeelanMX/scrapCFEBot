/* eslint-disable indent */
'use strict';
// we're gonna use strict mode in all

require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const cooldowns = new Map();
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
// Assign the value "!" to the constant prefix, which you will use as the
// bot prefix.
const prefix = process.env.PREFIX;

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
  if (!message.content.startsWith(prefix)) return;

  // Convert the rest of the message to a command name and any arguments that
  // may exist in the message.

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  // let text = args.join(" ");

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  // If cooldowns map doesn't have a command.name key then create one.
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldowns.get(command.name);
  const cooldown_amount = command.cooldown * 1000;

  // If time_stamps has a key with the author's id then check the expiration time to send
  // a message to a user.
  if (time_stamps.has(message.author.id)) {
    const expiration_time =
      time_stamps.get(message.author.id) + cooldown_amount;

    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;

      return message.reply(
        `Please wait ${time_left.toFixed(1)} more seconds before using ${
          command.name
        }`,
      );
    }
  }

  // If the author's id is not in time_stamps then add them with the current
  // time.
  time_stamps.set(message.author.id, current_time);
  // Delete the user's id once the cooldown is over.
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Error trying to execute that command.');
  }
});

client.login(process.env.TOKEN);
