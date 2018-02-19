const settings = require('../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'createchannel',                   // Command name (same as the file.js name)
	description: 'Creating channel test \n**Required Role: Technician', // info that gets pulled by the help command for a description
	aliases: ['cc'],  // Optional saiases for the command
	usage: '',                // For help command or if command was sent wrong
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: false,                            // true/false are there any args for this command?
    guildOnly: true,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {        		// Function Goes Here
        if ( message.member.roles.exists("name", "Technician") )
        {
            message.guild.createChannel("new-channel", 'voice', [
                {
                    id: message.guild.defaultRole,
                    deny: ["VIEW_CHANNEL","CONNECT"]
                },
                {
                    id: message.guild.roles.find("name", "Moderator"),
                    allow: ['VIEW_CHANNEL', 'CONNECT'],
                },
                {
                    id: message.guild.roles.find("name", "Mod Leader"),
                    allow: ["VIEW_CHANNEL", "CONNECT"],
                    deny: ["MANAGE_CHANNELS","MANAGE_ROLES"]
                },
                {
                    id: message.guild.roles.find("name", "Technician"),
                    allow: ["VIEW_CHANNEL", "CONNECT"],
                    deny: ["MANAGE_CHANNELS","MANAGE_ROLES"]
                }
            ])
            .then(message.reply("done"))
            .catch(error => error.stack);
        }        
	},
};