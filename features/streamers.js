module.exports= 
{
    async execute(oldMember,newMember)
    {
        if (!(newMember.guild && newMember.voiceChannel && newMember.user.presence.game) && newMember.roles.exists("name", "NOW LIVE!")) return await newMember.removeRole(newMember.guild.roles.find("name", "NOW LIVE!"));
        if (!(newMember.guild && newMember.voiceChannel && newMember.user.presence.game)) return;
        if (newMember.roles.exists("name", "KG Streamer") && newMember.user.presence.game.streaming && (newMember.voiceChannel.guild.name == "Konvict Gaming"))
        {
            if (!newMember.roles.exists("name", "NOW LIVE!")) return await newMember.addRole(newMember.guild.roles.find("name", "NOW LIVE!"));
        }
        else if (newMember.roles.exists("name", "NOW LIVE!"))
        {
            return await newMember.removeRole(newMember.guild.roles.find("name", "NOW LIVE!"));
        }
    },   
};      
