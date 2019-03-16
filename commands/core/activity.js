const settings = require('../../settings.json');   										// THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!
const discord = require ('discord.js');

module.exports = {
	name: 'activity',                  	 									        	// Command name (same as the file.js name)
	description: 'Get information on section activity',									// info that gets pulled by the help command for a description
	aliases: ['activities','a'],  						                			    // Optional saiases for the command
	usage: '',                          							        			// For help command or if command was sent wrong
	requiredRoles: ['Technician', 'Officer', 'Clan Leader'],							// an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 10,                            											// Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: true,                            									    		// true/false are there any args for this command?
	guildOnly: true,                       										    	// true/false should it only be used in guild channels and not in PM's
	ownerOnly: false,																	// should this command be only used by the bot owner (3pic_Ozone)
	hidden: true,                                                                       // should this command be hidden from the help menu
	disabled: false,																	// should this command be available to be used
    async execute(message, args, connection)         									// Function Goes Here
	{  
        var sql; 

        sql = "SELECT parentid,COUNT(*) as activity FROM events GROUP BY parentid ORDER BY activity DESC;";
        connection.query(sql, function (err, results) {
            if (err)
            {
                console.log(err.stack);
                return message.guild.channels.find('name', 'tech-talk').send("There was a Database Error when attempting to get events from events table");
            }
            const embed = new discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Section Activities')
                .setDescription('Section name and activities:')
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setTimestamp();

            for(let i = 0; results[i] != undefined; i++)
            {
                if(message.guild.channels.get(results[i].parentid) != undefined) embed.addField("__" + message.guild.channels.get(results[i].parentid).name.replace(/\W/g, '') + ":__", results[i].activity, true);
            }

            message.channel.send(embed)
                .catch(console.log);     
        });
	},
};