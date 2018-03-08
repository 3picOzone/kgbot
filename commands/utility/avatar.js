const settings = require('../../settings.json');   										// THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'avatar',                  	 											// Command name (same as the file.js name)
	description: 'Get the avatar URL of the tagged user(s), or your own avatar', 							// info that gets pulled by the help command for a description
	aliases: ['icon','pfp'],  																// Optional saiases for the command
	usage: '[@user]',                													// For help command or if command was sent wrong
	requiredRoles: [''],																// an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 0,                            											// Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: true,                            												// true/false are there any args for this command?
	guildOnly: false,                       											// true/false should it only be used in guild channels and not in PM's
	ownerOnly: false,																	// should this command be only used by the bot owner (3pic_Ozone)
	hidden: false,                                                                      // should this command be hidden from the help menu
	disabled: false,																	// should this command be available to be used
	async execute(message, args, connection)         									// Function Goes Here
	{
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL}`;
		});

		message.channel.send(avatarList);
	},
};