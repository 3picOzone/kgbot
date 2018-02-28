const settings = require('../../settings.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		message.reply("Command currently disabled, but will be back soon!");
		// const { commands } = message.client;
		// const data = [];

		// if (!args.length) {
		// 	data.push('**Here\'s a list of all my commands:**');
		// 	data.push(commands.map(command => command.name).join(', '));
		// 	data.push(`\n**You can send** \`${settings.prefix}help [command name]\` **to get info on a specific command!** \n*Key: <required>  [optional]*`);
		// }
		// else {
		// 	if (!commands.has(args[0])) {
		// 		return message.reply('that\'s not a valid command!');
		// 	}

		// 	const command = commands.get(args[0]);

		// 	data.push(`**Command Name:** ${command.name}`);

		// 	if (command.description) data.push(`**Description:** ${command.description}`);
		// 	if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		// 	if (command.usage) data.push(`**Usage:** ${settings.prefix}${command.name} ${command.usage}`);

		// 	data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
		// }

		// message.author.send(data, { split: true })
		// 	.then(() => {
		// 		if (message.channel.type !== 'dm') {
		// 			message.reply('I\'ve sent you a DM with all my commands!');
		// 		}
		// 	})
		// 	.catch(() => message.reply('it seems like I can\'t DM you!'));
	},
};