const discord = require ('discord.js');

module.exports= 
{
    async execute(oldMember,newMember)
    {
        if (!(newMember.guild && newMember.voiceChannel && newMember.user.presence.game) && newMember.roles.some( i => i.name == "NOW LIVE!")) return await newMember.removeRole(newMember.guild.roles.find("name", "NOW LIVE!"));
        if (!(newMember.guild && newMember.voiceChannel && newMember.user.presence.game)) return;
        if (newMember.roles.some( i => i.name == "KG Streamer") && newMember.user.presence.game.streaming && (newMember.voiceChannel.guild.name == "Konvict Gaming"))
        {
            if (!newMember.roles.some( i => i.name == "NOW LIVE!"))
            { 
                if (newMember.user.presence.game.streaming)
                {
                    const embed = new discord.RichEmbed()
                        .setColor('PURPLE')
                        .setAuthor(newMember.user.username + " started streaming!", newMember.voiceChannel.guild.iconURL)
                        .setTimestamp()
                        .addField("Stream Link:", newMember.user.presence.game.url);
                    newMember.voiceChannel.guild.channels.find(channel => channel.name.includes("streamers")).send(embed);
                }
                return await newMember.addRole(newMember.guild.roles.find("name", "NOW LIVE!"));
            }
        }
        else if (newMember.roles.some( i => i.name == "NOW LIVE!"))
        {
            return await newMember.removeRole(newMember.guild.roles.find("name", "NOW LIVE!"));
        }
    },   
};      
