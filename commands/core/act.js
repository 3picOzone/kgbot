const settings = require('../../settings.json');   										// THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!
const discord = require ('discord.js');

module.exports = {
	name: 'act',                  	 									        	    // Command name (same as the file.js name)
	description: 'Get information on section activity',									// info that gets pulled by the help command for a description
	aliases: [''],  						                					        // Optional saiases for the command
	usage: '',                          							        			// For help command or if command was sent wrong
	requiredRoles: ['Technician'],							                            // an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 10,                            											// Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: true,                            									    		// true/false are there any args for this command?
	guildOnly: true,                       										    	// true/false should it only be used in guild channels and not in PM's
	ownerOnly: true,																	// should this command be only used by the bot owner (3pic_Ozone)
	hidden: true,                                                                       // should this command be hidden from the help menu
	disabled: false,																	// should this command be available to be used
    async execute(message, args, connection)         									// Function Goes Here
	{  
        var sql;
        var parentIDS;
        var results;
        sql = "SELECT DISTINCT parentid FROM events;";

        results = await queryDB(sql, message, commection);
        for(let i = 0; results[i] != undefined; i++){parentIDS[i] = results[i].parentid;}

        const embed = new discord.RichEmbed()
            .setColor('RED')
            .setTitle('Section Activities')
            .setDescription('Section name and activities:')
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setTimestamp();

        if(args[0] == "list")
        {
            if(args[1] == "all")
            {
                for(let i = 0; parentIDS[i] != undefined; i++)
                {
                    let currentid = parentIDS[i];
                    sql = "SELECT * FROM events WHERE parentid = '" + currentid +"';";
                    results = await queryDB(sql, message, connection);
                    await addToEmbed(results, currentid, embed);
                }
            }
            else
            {
                for(let i = 0; parentIDS[i] != undefined; i++)
                {
                    let currentid = parentIDS[i];
                    sql = "SELECT * FROM events WHERE eventtimestamp > DATE_SUB(NOW(), INTERVAL 30 DAY) AND parentid = '" + currentid +"';";
                    results = await queryDB(sql, message, connection);
                    await addToEmbed(results, currentid, embed);
                }
            }
            message.channel.send(embed)
                .catch(console.log);
        }
	},
};


async function addToEmbed(results, currentid, embed)
{
    embed.addField("__" + message.guild.channels.get(currentid).name.replace(/\W/g, '') + ":__", result.length, true);
    return embed;
}

async function queryDB(sql, message, connection)
{
    connection.query(sql, function (err, result) {
        if (err)
        {
            console.log(err.stack);
            return message.guild.channels.find('name', 'tech-talk').send("There was a Database Error when attempting to get events from events table");
        }
        return result
    });
}