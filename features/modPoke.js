const settings = require('../settings.json');

module.exports= 
{
    async execute(oldMember, newMember)
    {
        if (oldMember.voiceChannel == newMember.voiceChannel) return;
        if (newMember.voiceChannel !== undefined && newMember.voiceChannel.name.toLowerCase().includes("applicants")) 
        {
            if (  (newMember.voiceChannel !== undefined && (newMember.roles.some( i => {i.name == "Mod Leader" || i.name == "Moderator" || 
                                                                                        i.name == "Officer" || i.name == "Clan Leader" || i.name == "Technician"}) )))
            {
                let message = newMember + " joined the application channel with: ";
                let usersInChannel = newMember.voiceChannel.members.values();
                for (let next of usersInChannel)
                {                    
                    if (!(  next.roles.some( i => {i.name == "Mod Leader" || i.name == "Moderator" || 
                                                   i.name == "Officer" || i.name == "Clan Leader" || i.name == "Technician"}) ))
                    {
                        message += next + " ";
                    } 
                }
                return newMember.voiceChannel.guild.channels.find("name", "application-notifications").send(message);                
            } 

            var currentGuild = undefined; 
            var currentMember = undefined;
            if (newMember.voiceChannel !== undefined)
            {
                currentMember = newMember;
                currentGuild = newMember.voiceChannel.guild;
            }

            currentGuild.channels.find("name", "application-notifications").send(currentGuild.roles.find("name", "Moderator") + " " +  currentGuild.roles.find("name", "Mod Leader") + currentGuild.roles.find("name", "Officer") + " " + currentGuild.roles.find("name", "Clan Leader") + " A user has joined the application channel: " + currentMember);
        }
        else return;
    },   
};      
