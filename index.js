require('dotenv').config();
const fs = require('fs');
const token = process.env.TOKEN;
const cooldowns = new Discord.Collection();
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Assign the value "!" to the constant prefix, which you will use as the bot prefix.
const prefix = process.env.PREFIX;

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('Ready');
}

//Check if the content of the message that the bot is processing starts with
//the prefix you set and if it doesn't stop processing
client.on('message', function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    //Convert the rest of the message to a command name and any arguments that
    //may exist in the message.

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    let text = args.join(" ");


    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Hey, wait ${timeLeft.toFixed(1)} more second(s) the \`${command.name}\` command. NOT SPAM`);
            }
        }
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Error trying to execute that command.');
    }
});


client.login(token);