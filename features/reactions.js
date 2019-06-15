module.exports= 
{
    async execute(messageReaction, user)
    {
        if (!messageReaction.me) return;
        if (user.id == "393666734793424898" || user.id == "408421721612353539") return;
        if (messageReaction.message.guild.roles.find(r => r.name.toLowerCase() == messageReaction.emoji.name.toLowerCase()) == undefined) return;
        if (messageReaction.message.guild.members.find(m => {return m.id == user.id}) == null) return;
        if (messageReaction.message.guild.members.find(m => {return m.id== user.id}).roles.find(r => r.name.toLowerCase() == messageReaction.emoji.name.toLowerCase()))
        {
            messageReaction.message.guild.members.fetch(user)
                .then(mem => mem.roles.remove(messageReaction.message.guild.roles.find(r => r.name.toLowerCase() == messageReaction.emoji.name.toLowerCase())))
                .catch(console.log);
            user.send("You have been removed from the " + messageReaction.emoji.name + " Role").catch(console.log);
        }
        else
        {
            messageReaction.message.guild.members.fetch(user)
                .then(mem => mem.roles.add(messageReaction.message.guild.roles.find(r => r.name.toLowerCase() == messageReaction.emoji.name.toLowerCase())))
                .catch(console.log);
            user.send("You have been added to the " + messageReaction.emoji.name + " Role").catch(err => {console.log("could not send message to user")});
        }
    },   
};      
