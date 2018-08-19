module.exports = {
	name: 'ping',                  	 													// Command name (same as the file.js name)
	description: "Pong! (test bot's responce time)", 									// info that gets pulled by the help command for a description
	aliases: [''],  																	// Optional saiases for the command
	usage: '',                															// For help command or if command was sent wrong
	requiredRoles: [''],																// an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 0.1,                            											// Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: false,                            											// true/false are there any args for this command?
	guildOnly: false,                       											// true/false should it only be used in guild channels and not in PM's
	ownerOnly: false,																	// should this command be only used by the bot owner (3pic_Ozone)
    hidden: false,                                                                      // should this command be hidden from the help menu
	disabled: false,																	// should this command be available to be used
	async execute(message, args, connection)         									// Function Goes Here
	{
		message.channel.send('Pong!');
	},
};