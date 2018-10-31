const settings = require('../../settings.json');   										// THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'args-info',                  	 											// Command name (same as the file.js name)
	description: 'Information about the arguments provided', 							// info that gets pulled by the help command for a description
	aliases: ['args'],  																// Optional saiases for the command
	usage: '<args>',                													// For help command or if command was sent wrong
	requiredRoles: [''],																// an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 5,                            											// Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: true,                            												// true/false are there any args for this command?
	guildOnly: false,                       											// true/false should it only be used in guild channels and not in PM's
	ownerOnly: false,																	// should this command be only used by the bot owner (3pic_Ozone)
	hidden: false,                                                                      // should this command be hidden from the help menu
	disabled: false,																	// should this command be available to be used
	async execute(message, args, connection)         									// Function Goes Here
	{
		if (args[0] === 'foo') 
		{
			return message.channel.send('bar');
		}
		message.channel.send(`First argument: ${args[0]}`);
	},
};
