const settings = require('../../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!
const discord = require ('discord.js');

module.exports = {
	name: 'rolemenu',                   // Command name (same as the file.js name)
	description: 'Display all possible KG Sections to subscribe to \n**Required Role: Moderator', // info that gets pulled by the help command for a description
	aliases: ['roles'],  // Optional saiases for the command
	usage: '[optional] <required>',                // For help command or if command was sent wrong
    cooldown: 10,                            // Optional Cooldown Between Uses
    args: false,                            // true/false are there any args for this command?
    guildOnly: true,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {        		// Function Goes Here
        if (!(message.member.roles.exists("name", "Technician") ||  message.member.roles.exists("name", "Mod Leader")  ||  message.member.roles.exists("name", "Moderator")  ||  message.member.roles.exists("name", "Officer") ||  message.member.roles.exists("name", "Clan Leader")) )
        {
            message.reply("You do not have permission to execute this command! You must be at least a Moderator!")
        }
        else
        {
            const embed = new discord.RichEmbed()
                .setColor('RED')
                .setTitle('React with/click on an emoji below this message to subscribe/unsubscribe to a section')
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setDescription("Possible Sections and their icon associated:")
                .setTimestamp();
            var emojis = [];
            for (emoji of message.guild.emojis.values())
            {
                if (message.guild.roles.find(role => role.name.toLowerCase() == emoji.name.toLowerCase()) != undefined)
                {
                    emojis.push(emoji);
                    embed.addField("__" + emoji.name + ":__ ", emoji, true);
                }
            }
            message.channel.send(embed)
                .then(sent => {
                    for(emoji of emojis)
                    {
                        sent.react(emoji).catch(console.log)
                    }
                }
                )
                .catch(console.log);
        }
	},
};