console.log('Hello');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('Ready');
}

//Assign the value "!" to the constant prefix, which you will use as the bot prefix.
const prefix = config.prefix;

//Check if the content of the message that the bot is processing starts with
//the prefix you set and if it doesn't stop processing
client.on('message', function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    //Convert the rest of the message to a command name and any arguments that
    //may exist in the message.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let texto = args.join(" ").toLowerCase();

    if (command === "cfe") {
        if (!texto) return message.channel.send('The command needs a searching parameter');
        message.channel.send(texto);
    }
});

client.login(config.token);