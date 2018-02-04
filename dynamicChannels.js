module.exports= 
{
    execute(oldMember, newMember)
    {
        var dynamicToken = "[DND]";
        var parent = "";
        // insure that the token is in the name of the channels effected
        if ((oldMember.voiceChannel !== undefined && oldMember.voiceChannel.name.includes(dynamicToken)) ||
            (newMember.voiceChannel !== undefined && newMember.voiceChannel.name.includes(dynamicToken)))     							  // Channel name has the token
        {   
            var currentGuild = undefined; 
            if (oldMember.voiceChannel !== undefined)
            {
                currentGuild = oldMember.voiceChannel.guild;
            }
            else if (newMember.voiceChannel !== undefined)
            {
                currentGuild = newMember.voiceChannel.guild;
            }
            
            let emptyRooms = 0;
            for (channel of currentGuild.channels.values())
            {               
                if (channel.type === "voice" && channel.name.includes(dynamicToken)) 
                {
                    parent = channel.parentID
                    //console.log(channel.name);
                    if(channel.members.size == 0)
                    {
                        emptyRooms++;
                    }
                }
            }
            // console.log(`Total empty rooms: ${emptyRooms}`);           
            
            // Delete a channel
            if (emptyRooms > 1)
            {
                // find any empty room to delete until there is only one left
                for(channel of currentGuild.channels.values())
                {
                    if (channel.type === "voice" && channel.name.includes(dynamicToken) && channel.members.size == 0 && emptyRooms > 1)
                    {  
                        channel.delete()
                            .then() // do nothing // channel => console.log(`Deleted ${channel.name} to make room for new channels`))
                            .catch(console.error); // Log error
                        emptyRooms--;
                    }                
                }
            }
            // Create a channel
            else if (emptyRooms == 0)
            {
                currentGuild.createChannel(dynamicToken + ' Meeting', 'voice', [
                    {
                        id: currentGuild.roles.find("name", "Moderator"),
                        allow: ['VIEW_CHANNEL', 'CONNECT'],
                    },
                    {
                        id: currentGuild.roles.find("name", "Mod Leader"),
                        allow: ["VIEW_CHANNEL", "CONNECT"],
                        deny: ["MANAGE_CHANNELS","MANAGE_ROLES"]
                    },
                    {
                        id: currentGuild.roles.find("name", "Technician"),
                        allow: ["VIEW_CHANNEL", "CONNECT"],
                        deny: ["MANAGE_CHANNELS","MANAGE_ROLES"]
                    },
                    {
                        id: currentGuild.defaultRole,
                        deny: ["VIEW_CHANNEL","CONNECT"]
                    }
                ])
                    .then(channel => channel.setParent(parent))
                    .catch(error => console.log(error));
            }
        }
    },   
};      