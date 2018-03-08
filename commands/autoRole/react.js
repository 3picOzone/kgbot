const settings = require('../../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'react',                   									                    // Command name (same as the file.js name)
	description: 'Display emoji to add yourself or others to a section', 	            	// info that gets pulled by the help command for a description
	aliases: ['addSection','section','add','remove','sub','subscribe','unsubscribe'],  		// Optional saiases for the command
	usage: '<SectionEmoji>',                								                // For help command or if command was sent wrong
	requiredRoles: [''],														            // an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 5,                            									            // Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: true,                            								    	            // true/false are there any args for this command?
	guildOnly: true,                       									                // true/false should it only be used in guild channels and not in PM's
	ownerOnly: false,															            // should this command be only used by the bot owner (3pic_Ozone)
    hidden: false,                                                                          // should this command be hidden from the help menu
	disabled: false,																    	// should this command be available to be used
	async execute(message, args, connection)         							            // Function Goes Here
	{
        if((message.guild.emojis.find(val => val.name.toLowerCase() == args[0].toLowerCase()) == undefined) || (message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()) == undefined) )
        { 
            return message.reply("Not a valid custom emoji for a KG section");
        }
        else
        {
            message.channel.send("Click the " +  message.guild.emojis.find(val => val.name.toLowerCase() == args[0].toLowerCase()) + " reaction below to subscribe/unsubscribe to the " + args[0] + " section")
                .then(sent => sent.react(message.guild.emojis.find(val => val.name.toLowerCase() == args[0].toLowerCase()).id).catch(console.log))
                .catch(console.log);
        }
	},
};