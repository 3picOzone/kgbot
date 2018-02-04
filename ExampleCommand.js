const settings = require('../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'Command Name',                   // Command name (same as the file.js name)
	description: 'Info about this command \n**Required Role: <role>', // info that gets pulled by the help command for a description
	aliases: ['alias1','alias2','alias3'],  // Optional saiases for the command
	usage: '[optional] <required>',                // For help command or if command was sent wrong
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: false,                            // true/false are there any args for this command?
    guildOnly: false,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {        		// Function Goes Here
        
	},
};