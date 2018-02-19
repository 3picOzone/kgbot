const settings = require('../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'mod',                   // Command name (same as the file.js name)
	description: 'Gives/Removes the moderator role to the specified user mentioned \n**Required Role: Mod Leader or above', // info that gets pulled by the help command for a description
	aliases: ['makemod','moderator'],  // Optional saiases for the command
	usage: '<@mention user>',                // For help command or if command was sent wrong
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: true,                            // true/false are there any args for this command?
    guildOnly: true,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {        		// Function Goes Here
        message.channel.send("Command Currently Disabled, Please refer to a tech");
        /*
        if ( (message.member.roles.find("name", "Mod Leader") == undefined) &&
             (message.member.roles.find("name", "Officer") == undefined) &&
             (message.member.roles.find("name", "Clan Leader") == undefined) &&
             (message.member.roles.find("name", "Technician") == undefined) )
        {
            return message.reply("You do not have permissions for this command!"); //Must be Mod Leader+
        }
        if (message.mentions.members.first() == undefined) return message.reply("You must @Mention a user to use this command!");
        if (!(message.channel.name.includes("promotion-commands"))) return message.reply("You must be in the promotion commands channel to use this command!");
        if (!(message.mentions.members.first().roles.exists("name","Moderator")))
        {
            message.mentions.members.first().addRole(message.guild.roles.find("name","Moderator"))
                .then(message.guild.channels.find(channel => channel.name.includes("mod-log")).send(message.author.toString() + " promoted " + args[0] + " to Moderator!" ));
        }
        else if (message.mentions.members.first().roles.exists("name","Moderator"))
        {
            message.mentions.members.first().removeRole(message.guild.roles.find("name","Moderator"))
                .then(message.guild.channels.find(channel => channel.name.includes("mod-log")).send(message.author.toString() + " removed " + args[0] + " from Moderator!" ));
        }
        */
	},
};