const settings = require('../settings.json');

module.exports= 
{
    async execute(oldMember, newMember,connection)
    {
        if (newMember.voiceChannel == undefined) return;
        if (oldMember.voiceChannel == newMember.voiceChannel) return;
        if(newMember.voiceChannel.parent == undefined) return;
        if (newMember.voiceChannel !== undefined && newMember.guild.name == 'Konvict Gaming')      //currntly only for KG
        {
            const parentChannel = newMember.voiceChannel.parent;
            sql = "SELECT * FROM activity WHERE sectionID = "+parentChannel.id;
            connection.query(sql, function (err, result) {
                if (err)
                {
                    console.log(err.stack);
                    return newMember.guild.channels.find('name', 'tech-talk').send("There was a Database Error when attempting to update activities!");
                }
                if (result[0] == undefined)         // no activity yet
                {
                    sql = "INSERT INTO activity (sectionid, sectionName, activityVoice, activityMessage, activityVoiceTotal, activityMessageTotal) VALUES ('" + parentChannel.id + "', '" + parentChannel.name.replace(/\W/g, '') + "', '1','0','1','0');";
                    connection.query(sql, function (err, results) {
                        if (err)
                        {
                            console.log(err.stack);
                            return newMember.guild.channels.find('name', 'tech-talk').send("There was a Database Error when attempting to add a section to activities");
                        }
                    }); 
                }
                else{                               // has a activity already,update it
                    newActivity = parseInt(result[0].activityVoice, 10) + 1;
                    newActivityTotal = parseInt(result[0].totalActivityVoice, 10) + 1;
                    sql = "UPDATE activity SET activityVoice = '" + newActivity + ", totalActivityVoice = '" + newActivityTotal + "' WHERE sectionid = '" + parentChannel.id + "';";
                    connection.query(sql, function (err, results) {
                        if (err)
                        {
                            console.log(err.stack);
                            return newMember.guild.channels.find('name', 'tech-talk').send("There was a Database Error when trying to update section activities!");
                        }
                    }); 
                }
            });
        }
    },   
};