const settings = require('../../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!
const discord = require ('discord.js');

module.exports = {
	name: 'embed',                   // Command name (same as the file.js name)
	description: 'Example embed for creating embeds', // info that gets pulled by the help command for a description
	aliases: ['em','rich-embed'],  // Optional saiases for the command
	usage: '',                // For help command or if command was sent wrong
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: false,                            // true/false are there any args for this command?
    guildOnly: false,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {        		// Function Goes Here
        const exampleEmbed = new discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addField('Regular field title', 'Some value here')
            .addBlankField()
            .addField('Inline field title', 'Some value here', true)
            .addField('Inline field title', 'Some value here', true)
            .addField('Inline field title', 'Some value here')
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
 
        message.channel.send(exampleEmbed);
	},
};