module.exports = {
	name: 'cfe',
	description: 'Get searching parameters from the user.',
	execute(message, text) {
		if (!text) return message.channel.send('The command needs a searching parameter');
		message.channel.send(text);
	},
};