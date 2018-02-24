const settings = require('../settings.json');   // THIS FILE NEEDS TO BE IN THE LOGS FOLDER!!!!!!!
const discord = require ('discord.js');


module.exports= 
{
    execute(message)
    {
        if(message.author.bot) return;
        const embed = new discord.RichEmbed()
            .setColor('AQUA')
            .setAuthor("Message Deleted", message.guild.iconURL)
            .setTimestamp()
            .addField("Sent By: " + message.author.username + "#" + message.author.discriminator, message.content)
            .setFooter(message.channel.name);
        message.guild.channels.find(channel => channel.name.includes("mod-log")).send(embed);
    },   
};      
