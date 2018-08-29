const settings = require('../settings.json');
const activities = require('./activities.js');

module.exports= 
{
    async execute(message, connection)
    {
        if (message.author.bot || message.content.startsWith(settings.prefix)) return;
        if (message.channel.type != 'text') return;
        if (message.channel.parent == undefined) return;
        if (message.guild.name != 'Konvict Gaming') return;
        if (message.guild.id != '390650534551617546') return;
        if (!message.member) return;
        
        const parentChannel = message.channel.parent;

        activities.execute(message.member, message.channel, connection, "message");

    },   
};