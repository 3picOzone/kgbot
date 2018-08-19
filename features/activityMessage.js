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
        if (!message.member) return;
        
        const parentChannel = message.channel.parent;

        activities.execute(message.member, message.channel, connection, "message");

        // sql = "INSERT INTO events (Type, userid, channelid, parentid, parentname) VALUES ('message', '" + message.author.id + "', '" + message.channel.id + "', '" + parentChannel.id + "' , '" + parentChannel.name.replace(/\W/g, '') + "');";
        // connection.query(sql, function (err, results) {
        //     if (err)
        //     {
        //         console.log(err.stack);
        //         return message.guild.channels.find('name', 'tech-talk').send("There was a Database Error when attempting to add a message to events table");
        //     }
        // }); 

        sql = "SELECT * FROM activity WHERE sectionID = "+parentChannel.id;
        connection.query(sql, function (err, result) {
            if (err)
            {
                console.log(err.stack);
                return message.guild.channels.find('name', 'tech-talk').send("There was a Database Error when attempting to update activities!");
            }
            if (result[0] == undefined)         // no activity yet
            {
                sql = "INSERT INTO activity (sectionid, sectionName, activityVoice, activityMessage, totalActivityVoice, totalActivityMessage) VALUES ('" + parentChannel.id + "', '" + parentChannel.name.replace(/\W/g, '') + "', '1','0','1','0');";
                connection.query(sql, function (err, results) {
                    if (err)
                    {
                        console.log(err.stack);
                        return message.guild.channels.find('name', 'tech-talk').send("There was a Database Error when attempting to add a section to activities");
                    }
                }); 
            }
            else{                               // has a activity already,update it
                newActivity = parseInt(result[0].activityMessage, 10) + 1;
                newActivityTotal = parseInt(result[0].totalActivityMessage, 10) + 1;
                sql = "UPDATE activity SET activityMessage = '" + newActivity + "', totalActivityMessage = '" + newActivityTotal + "' WHERE sectionid = '" + parentChannel.id + "';";
                connection.query(sql, function (err, results) {
                    if (err)
                    {
                        console.log(err.stack);
                        return message.guild.channels.find('name', 'tech-talk').send("There was a Database Error when trying to update section activities!");
                    }
                }); 
            }
        });
    },   
};