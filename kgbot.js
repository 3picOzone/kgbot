const fs = require('fs');
const discord = require ('discord.js');
const settings = require('./settings.json');
var _dynamicChannels = require('./modules/dynamicChannels.js');
var _reactions = require('./modules/reactions.js');
var _deleteLog = require('./logs/messageDeleteLog.js');


var client = new discord.Client();
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands');
const cooldowns = new discord.Collection();             // Collection for the cooldowns

for (const file of commandFiles)                        // Read commands from the commands folder
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on ("ready", onReady);
client.on("message", onMessage);
client.on("voiceStateUpdate", onVoiceUpdate);
client.on("messageReactionAdd", onMessageReactionAdd);
client.on("messageReactionRemove", onMessageReactionRemove);
client.on("messageDelete", onMessageDelete);
client.on('raw', async event => {       // so that all events trigger for all messages (reactions and message delete)
    // console.log(event);
    if (event.t == 'MESSAGE_REACTION_ADD')
    {
        const { d: data } = event;
        const channel = client.channels.get(data.channel_id);

        if (channel.messages.has(data.message_id)) return;

        const user = client.users.get(data.user_id);
        const message = await channel.fetchMessage(data.message_id);

        const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
        const reaction = message.reactions.get(emojiKey);

        client.emit('messageReactionAdd', reaction, user);
    }
    else if (event.t == 'MESSAGE_REACTION_REMOVE')
    {
        const { d: data } = event;
        const channel = client.channels.get(data.channel_id);

        if (channel.messages.has(data.message_id)) return;

        const user = client.users.get(data.user_id);
        const message = await channel.fetchMessage(data.message_id);

        const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
        const reaction = message.reactions.get(emojiKey);

        client.emit('messageReactionRemove', reaction, user);
    }
    else{
        return;
    }
});



function onReady()
{
    console.log("Ready!");
    client.user.setActivity("Konvict Gaming");
}

function onMessage(message)
{
    if (!message.content.startsWith(settings.prefix) || message.author.bot) return;

	const args = message.content.slice(settings.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || 
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;  // Check to see if command exists, if not return
    
    if (command.guildOnly && message.channel.type !== 'text')                  // Should a message be sent only on a guild channel or can it be sent in a dm?
    {
		return message.reply('I can\'t execute that command inside DMs!');
    }
    

    if (command.args && !args.length)                 // Check to see if the command has defingned args and to see if the proper ammount has been given 
    {
		let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage)                            // Check to see if the command has a usage property, if it does reply with the proper usage included
        {
            reply += `\nThe proper usage would be: \`${settings.prefix}${command.name} ${command.usage}\``;
        }

		return message.channel.send(reply);
    }

    // ==================================== Cooldowns ==========================================
    if (!cooldowns.has(command.name))                // Check to see if the command has a cooldown 
    {
		cooldowns.set(command.name, new discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

    if (!timestamps.has(message.author.id))         // check to see if there is a current cooldown
    {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    else 
    {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    // ================================= End Cooldowns ========================================    

    // Finally, try and run the command
    try
    {
        console.log("Running command: " + commandName );
		command.execute(message, args);
	}
    catch (error) 
    {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
    }
}

function onVoiceUpdate(oldMember, newMember)
{
    _dynamicChannels.execute(oldMember, newMember);
}

function onMessageReactionAdd(messageReaction, user)
{
    //console.log(`${user.username} reacted with "${messageReaction.emoji.name}".`);
    _reactions.execute(messageReaction, user);
}

function onMessageReactionRemove(messageReaction, user)
{
    //console.log(`${user.username} removed the reaction "${messageReaction.emoji.name}".`);
    _reactions.execute(messageReaction, user);
}

function onMessageDelete(message)
{
    _deleteLog.execute(message);
}


client.login (settings.token);


// temp ban?
// tedsystem - temp done for now
// modmail
// application
// accept the Code of conduct

/*
add section:
    add name
    add emoji
    redo emoji list
    add role
    
*/