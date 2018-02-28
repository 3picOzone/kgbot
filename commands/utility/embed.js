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

        const welcome = new discord.RichEmbed()
            .setColor('#FF0000')
            .setTitle('Welcome!')
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setThumbnail(message.guild.iconURL)
            .setDescription("Welcome to KG! To get started, please read the #start_here channel to gain permissions!")
            .addField("__Guests:__ ", "Start by choosing sections in the #start_here channel! Feel free to apply at http://www.konvictgaming.com to become a member (members get priority for events and fancy colors)", false)
            .addField("__Applicants:__ ", "Join the application room under konvict staff to get help from a moderator!", false)
            .addField("__Current Members:__ ", "Connect your account on the website using this link: https://www.konvictgaming.com/account/external-accounts ", false)
            .setTimestamp()
            .setFooter('Questions? Contact a Moderator!');

        message.channel.send(welcome);
	},
};