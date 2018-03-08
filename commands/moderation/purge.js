const settings = require('../../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'purge',                       	 											// Command name (same as the file.js name)
	description: 'Mass delete messages that are under 2 weeks old',      				// info that gets pulled by the help command for a description
	aliases: [''],  										                            // Optional saiases for the command
	usage: '<number of messages',   								                    // For help command or if command was sent wrong
	requiredRoles: ['Technician','Clan Leader','Officer'],								// an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 0,                            											// Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: true,                               											// true/false are there any args for this command?
	guildOnly: true,                       											    // true/false should it only be used in guild channels and not in PM's
	ownerOnly: false,																	// should this command be only used by the bot owner (3pic_Ozone)
    hidden: true,                                                                       // should this command be hidden from the help menu
	disabled: true,																	    // should this command be available to be used
	async execute(message, args, connection)         									// Function Goes Here
	{ 
        if ( (message.member.roles.find("name", "Mod Leader") == undefined) &&
             (message.member.roles.find("name", "Officer") == undefined) &&
             (message.member.roles.find("name", "Clan Leader") == undefined) &&
             (message.member.roles.find("name", "Technician") == undefined) )
        {
            return message.reply("You do not have permissions for this command!"); //Must be Mod Leader+
        }
        else if(parseInt(args[0]) >=100 || parseInt(args[0]) <1 )
        {
            return message.reply("You cannot purge more than 99 messages at once and you must purge at least 1 message!");
        }
        else
        {
            message.channel.bulkDelete(parseInt(args[0]),true)
                .then(message.reply("deleted " + args[0] + " messages"))
                .catch(error => console.log(error.stack));
            message.delete();
            return;
        }
	},
};