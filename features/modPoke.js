const settings = require('../settings.json');

module.exports= 
{
    execute(oldMember, newMember)
    {
        if (newMember.voiceChannel !== undefined && newMember.voiceChannel.name.toLowerCase().includes("applica")) 
        {
            if (  (newMember.voiceChannel !== undefined && (newMember.roles.exists("name", "Mod Leader") || 
                                                            newMember.roles.exists("name", "Moderator") || 
                                                            newMember.roles.exists("name", "Officer") || 
                                                            newMember.roles.exists("name", "Clan Leader") || 
                                                            newMember.roles.exists("name", "Technician") 
                                                            )
                    )
            ) return; // DONT LOG MODS JOINING THE ROOMS

            var currentGuild = undefined; 
            var currentMember = undefined;
            if (newMember.voiceChannel !== undefined)
            {
                currentMember = newMember;
                currentGuild = newMember.voiceChannel.guild;
            }

            currentGuild.channels.find("name", "application-notifications").send(currentGuild.roles.find("name", "Moderator") + " A user has joined the application channel: " + currentMember);
        }
        else return;
    },   
};      
