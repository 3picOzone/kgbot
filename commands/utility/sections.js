const settings = require('../../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'sections',                   // Command name (same as the file.js name)
	description: 'Describe how to view sections. \n**Required Role: None', // info that gets pulled by the help command for a description
	aliases: ['sect'],  // Optional saiases for the command
	usage: '',                // For help command or if command was sent wrong
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: false,                            // true/false are there any args for this command?
    guildOnly: false,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {        		// Function Goes Here
        message.channel.send("Here on KG, each game is put into a thing refered to as a 'section'. To view a section please chick the emoji for your section at the bottom of the " + message.guild.channels.find("name", "start_here") + " channel!")
	},
};