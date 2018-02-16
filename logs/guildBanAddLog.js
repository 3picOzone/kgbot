const settings = require('../settings.json');   // THIS FILE NEEDS TO BE IN THE LOGS FOLDER!!!!!!!
const discord = require ('discord.js');


module.exports= 
{
    execute(guild, user)
    {
        console.log("user banned");
        const embed = new discord.RichEmbed()
            .setColor('RED')
            .setAuthor("User Banned", guild.iconURL)
            .setTimestamp()
            .addField("Banned User: ", user.username + "#" + user.discriminator);
        guild.channels.find(channel => channel.name.includes("mod-log")).send(embed);
    },   
};      
