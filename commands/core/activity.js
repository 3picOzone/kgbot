const settings = require('../../settings.json');   										// THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!
const discord = require ('discord.js');

module.exports = {
	name: 'activity',                  	 									        	// Command name (same as the file.js name)
	description: 'Get information on section activity',									// info that gets pulled by the help command for a description
	aliases: ['activities'],  						                					// Optional saiases for the command
	usage: '',                          							        			// For help command or if command was sent wrong
	requiredRoles: ['Technician', 'Officer', 'Clan Leader'],							// an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 10,                            											// Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: true,                            									    		// true/false are there any args for this command?
	guildOnly: true,                       										    	// true/false should it only be used in guild channels and not in PM's
	ownerOnly: false,																	// should this command be only used by the bot owner (3pic_Ozone)
	hidden: true,                                                                      // should this command be hidden from the help menu
	disabled: false,																	// should this command be available to be used
	async execute(message, args, connection)         									// Function Goes Here
	{  
       var sql; 
        if (args[0] == "list")
        {
            sql = "SELECT * FROM activity;"
        }
        connection.query(sql, function (err, result) 
        {
            if (err)
            {
                console.log(err.stack);
                return message.guild.channels.find('name', 'tech-talk').send("There was a Database Error when attempting to list activities!");
            }
            if (result[0] == undefined)         // no activity in sections
            {
                return message.channel.send("No section activity found!").catch(console.log);
            }
            else
            {
                const embed = new discord.RichEmbed()
                    .setColor('RED')
                    .setTitle('Section Activities')
                    .setDescription('Section name and total activities:')
                    .setAuthor(message.guild.name, message.guild.iconURL)
                    .setTimestamp();
                var i = 0;
                while(result[i])
                {
                    embed.addField("__" + message.guild.channels.find('id', result[i].sectionID).name.replace(/\W/g, '') + ":__ ", parseInt(result[i].totalActivityVoice) + parseInt(result[i].totalActivityMessage), true);
                    i++;
                }
                message.channel.send(embed)
                .then()//do nothing
                .catch(console.log);
            }
        })
	},
};