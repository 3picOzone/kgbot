const settings = require('../../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'member',                   // Command name (same as the file.js name)
	description: 'Describe how to become a member. \n**Required Role: None', // info that gets pulled by the help command for a description
	aliases: ['perms'],  // Optional saiases for the command
	usage: '',                // For help command or if command was sent wrong
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: false,                            // true/false are there any args for this command?
    guildOnly: false,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {        		// Function Goes Here
        message.channel.send("To get member permissions, please visit this link and add your discord account to the website: \nhttps://www.konvictgaming.com/account/external-accounts \nIf you have any further issues, please contact a staff member")
	},
};