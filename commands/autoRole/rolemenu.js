const settings = require('../../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!
const discord = require ('discord.js');

module.exports = {
	name: 'rolemenu',                       								        	// Command name (same as the file.js name)
	description: 'Display all possible KG Sections to subscribe to', 			        // info that gets pulled by the help command for a description
	aliases: ['roles'], 	                                                            // Optional saiases for the command
	usage: '',                			                    					        // For help command or if command was sent wrong
	requiredRoles: ['Moderator','Mod Leader','Officer','Clan Leader','Technician'],		// an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 60,                            					    				    // Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: false,                            									        // true/false are there any args for this command?
	guildOnly: true,                       				        				    	// true/false should it only be used in guild channels and not in PM's
	ownerOnly: false,										       		    			// should this command be only used by the bot owner (3pic_Ozone)
    hidden: false,                                                                      // should this command be hidden from the help menu
	disabled: false,																	// should this command be available to be used
	async execute(message, args, connection)    					    	    		// Function Goes Here
	{
        const embed = new discord.RichEmbed()
            .setColor('RED')
            .setTitle('React with/click on an emoji below this message to subscribe/unsubscribe to a section')
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription("Possible Sections and their icon associated:")
            .setTimestamp();
        var emojis = [];
        for (emoji of message.guild.emojis.values())
        {
            if (message.guild.roles.find(role => role.name.toLowerCase() == emoji.name.toLowerCase()) != undefined)
            {
                emojis.push(emoji);
                embed.addField("__" + emoji.name + ":__ ", emoji, true);
            }
        }
        message.channel.send(embed)
            .then(sent => {
                for(emoji of emojis)
                {
                    sent.react(emoji).catch(console.log)
                }
            })
            .catch(console.log);
	},
};