module.exports = {
	name: 'cfe',
	description: 'Get searching parameters from the user.',
	cooldown: 3,
	execute(message, args) {
		if (!message) return message.channel.send('The command needs a searching parameter.');
		message.channel.send(message);
	},
};