const settings = require('../settings.json');

module.exports= 
{
    async execute(message, connection)
    {
        if (message.author.bot) return console.log("returned, bot");
        if (message.channel.type != 'text') return console.log("returned, not text");
        if (message.channel.parent == undefined) return console.log("returned, parent undefined");
        if (message.guild.name != 'Konvict Gaming') return console.log("returned, not KG");

        const parentChannel = message.channel.parent;
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