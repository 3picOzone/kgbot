const settings = require('../../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'react',                   // Command name (same as the file.js name)
	description: 'Displays emoji for people to add to sections', // info that gets pulled by the help command for a description
	aliases: ['addSection','section','add','remove','sub','subscribe','unsubscribe'],  // Optional saiases for the command
	usage: '<sectionEmoji>',                // For help command or if command was sent wrong
    cooldown: 5,                            // Optional Cooldown Between Uses
    args: true,                            // true/false are there any args for this command?
    guildOnly: true,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {        		// Function Goes Here
        if((message.guild.emojis.find(val => val.name.toLowerCase() == args[0].toLowerCase()) == undefined) || (message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()) == undefined) )
        { 
            return message.reply("Not a valid custom emoji for a KG section");
        }
        else
        {
            message.channel.send("Click the " +  message.guild.emojis.find(val => val.name.toLowerCase() == args[0].toLowerCase()) + " reaction below to subscribe/unsubscribe to the " + args[0] + " section")
                .then(sent => sent.react(message.guild.emojis.find(val => val.name.toLowerCase() == args[0].toLowerCase()).id).catch(console.log))
                .catch(console.log);
        }
  
	},
};