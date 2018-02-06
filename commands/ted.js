const settings = require('../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'ted',                   // Command name (same as the file.js name)
	description: 'Creating channel test \n**Required Role: Any (Moderator to set link)', // info that gets pulled by the help command for a description
	aliases: ['t','findted'],  // Optional aiases for the command
	usage: '<@username> [link]',                // For help command or if command was sent wrong
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: true,                            // true/false are there any args for this command?
    guildOnly: true,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {        		// Function Goes Here
        if ( true )
        {
            if (message.mentions.members.first() == undefined) return message.reply("You must mention at least one member!");
            
            var mysql = require('mysql');
            var con = mysql.createConnection({
                host: settings.dbHost,
                user: settings.dbUsername,
                password: settings.dbPassword,
                database: settings.dbDatabase
            });

            con.connect(function(err) {
                if (err) 
                {
                    console.log(err.stack);
                    return message.channel.send("There was a Database Error when doing this command, please contact a Tech!");
                }
                sql = "SELECT * FROM teds WHERE userid = "+message.mentions.members.first().id;
                con.query(sql, function (err, result) {
                    if (err)
                    {
                        console.log(err.stack);
                        return message.channel.send("There was a Database Error when doing this command, please contact a Tech!");
                    }
                    if (result[0] == undefined)         // user doesnt have a ted currently
                    {
                        if (!(message.member.roles.exists("name", "Technician") ||  message.member.roles.exists("name", "Mod Leader")  ||  message.member.roles.exists("name", "Moderator")  ||  message.member.roles.exists("name", "Officer") ||  message.member.roles.exists("name", "Clan Leader")) )
                        {
                            return message.reply("This user does not have a TED link set yet, please contact a moderator to fix this!")
                        }
                        else
                        {
                           if(args[1] == undefined) return message.reply("This user does not have a TED link set yet, please set one!");
                           sql = "INSERT INTO teds (userid, username, tedlink) VALUES ('" + message.mentions.members.first().id + "', '" + message.mentions.members.first().user.username + "#" + message.mentions.members.first().user.discriminator + "', '" + args[1] +"');";
                            con.query(sql, function (err, result) {
                                if (err)
                                {
                                    console.log(err.stack);
                                    return message.channel.send("There was a Database Error when doing this command, please contact a Tech!");
                                }
                                message.channel.send("TED created for " + message.mentions.members.first().user.username);
                            }); 
                        }
                    }
                    else{                               // has a ted already, trying to update link?
                        if(args[1] != undefined)
                        {
                            if (!(message.member.roles.exists("name", "Technician") ||  message.member.roles.exists("name", "Mod Leader")  ||  message.member.roles.exists("name", "Moderator")  ||  message.member.roles.exists("name", "Officer") ||  message.member.roles.exists("name", "Clan Leader")) )
                            {
                                return message.reply("Only Moderators can update TED links, please contact someone Moderator or above to fix this")
                            }
                            else
                            {
                               sql = "UPDATE teds SET tedlink = '" + args[1] + "'WHERE userid = '" + message.mentions.members.first().id + "';";
                                con.query(sql, function (err, result) {
                                    if (err)
                                    {
                                        console.log(err.stack);
                                        return message.channel.send("There was a Database Error when doing this command, please contact a Tech!");
                                    }
                                    message.channel.send("TED link updated for " + message.mentions.members.first().user.username);
                                }); 
                            }
                        }
                        else
                        {
                            message.channel.send("TED Link for " + result[0].username + ": " + result[0].tedlink);
                        }
                    }
                });
            });
        }        
	},
};


