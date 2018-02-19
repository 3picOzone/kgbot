module.exports = {
	name: 'server',
	description: 'Display info about this server.',
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: false,                            // true/false are there any args for this command?
    guildOnly: true,                       // true/false should it only be used in guild channels and not in PM's
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};