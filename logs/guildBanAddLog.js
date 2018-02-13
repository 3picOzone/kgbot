const settings = require('../settings.json');   // THIS FILE NEEDS TO BE IN THE LOGS FOLDER!!!!!!!
const discord = require ('discord.js');


module.exports= 
{
    execute(guild, user)
    {
        guild.fetchAuditLogs(user).then(log => console.log(log))
        const embed = new discord.RichEmbed()
            .setColor('RED')
            .setAuthor("User Banned", message.guild.iconURL)
            .setTimestamp()
            .addField("Banned User: " + user.username + "#" + user.discriminator, message.content);
        message.guild.channels.find(channel => channel.name.includes("mod-log")).send(embed);
    },   
};      
