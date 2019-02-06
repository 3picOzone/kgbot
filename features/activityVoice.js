const settings = require('../settings.json');
const activities = require('./activities.js');

module.exports= 
{
    async execute(oldMember, newMember,connection)
    {
        if (newMember.voiceChannel == undefined) return;
        if (oldMember.voiceChannel == newMember.voiceChannel) return;
        if(newMember.voiceChannel.parent == undefined) return;
        if (newMember.guild.id != '390650534551617546') return;
        if (newMember.voiceChannel !== undefined && newMember.guild.name == 'Konvict Gaming')      //currntly only for KG
        {
            const parentChannel = newMember.voiceChannel.parent;

            activities.execute(newMember, newMember.voiceChannel, connection, "voice");
        }
    },   
};