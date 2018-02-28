module.exports= 
{
    execute(messageReaction, user)
    {
        if (!messageReaction.me) return;
        if (user.id == "393666734793424898") return;
        if (messageReaction.message.guild.roles.find(r => r.name.toLowerCase() == messageReaction.emoji.name.toLowerCase()) == undefined) return;
        if (messageReaction.message.guild.members.find("id", user.id) == null) return;
        if (messageReaction.message.guild.members.find("id", user.id).roles.find(r => r.name.toLowerCase() == messageReaction.emoji.name.toLowerCase()))
        {
            messageReaction.message.guild.fetchMember(user)
                .then(mem => mem.removeRole(messageReaction.message.guild.roles.find(r => r.name.toLowerCase() == messageReaction.emoji.name.toLowerCase())))
                .catch(console.log);
            user.send("You have been removed from the " + messageReaction.emoji + " Role").catch(console.log);
        }
        else
        {
            messageReaction.message.guild.fetchMember(user)
                .then(mem => mem.addRole(messageReaction.message.guild.roles.find(r => r.name.toLowerCase() == messageReaction.emoji.name.toLowerCase())))
                .catch(console.log);
            user.send("You have been added to the " + messageReaction.emoji + " Role").catch(console.log);
        }
    },   
};      
