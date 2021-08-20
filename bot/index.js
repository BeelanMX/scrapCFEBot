console.log('Hello');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('Aloh');
}