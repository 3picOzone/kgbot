const settings = require('../settings.json');

module.exports= 
{
    async execute(eventUser, eventChannel, connection, type)
    {
        const parentChannel = eventChannel.parent;

        sql = "INSERT INTO events (Type, userid, channelid, parentid, parentname) VALUES ('" + type + "', '" + eventUser.id + "', '" + eventChannel.id + "', '" + parentChannel.id + "' , '" + parentChannel.name.replace(/\W/g, '') + "');";
        connection.query(sql, function (err, results) {
            if (err)
            {
                console.log(err.stack);
                return message.guild.channels.find('name', 'tech-talk').send("There was a Database Error when attempting to add a message to events table");
            }
        }); 
    },   
};