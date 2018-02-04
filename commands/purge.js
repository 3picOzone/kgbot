const settings = require('../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'purge',                   // Command name (same as the file.js name)
	description: 'Purge/delete the number of messages specified that are under 2 weeks old. (Max of 100 messages per command) \n**Required Role:** Mod Leader or Above', // info that gets pulled by the help command for a description
	aliases: ['delete'],  // Optional saiases for the command
	usage: '<number of messages>',                // For help command or if command was sent wrong
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: true,                            // true/false are there any args for this command?
    guildOnly: true,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {      // Function Goes Here
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