// ============ Setup/Required packages =============
    // Basics
        const fs = require('fs');
        const discord = require ('discord.js');
        const settings = require('./settings.json');
        var client = new discord.Client();
        const cooldowns = new discord.Collection();
        client.login (settings.token);

    // CSGO PUG
        client.pug = new discord.Collection();

    // Helper Files
    // Features   
        const _modPoke = require("./features/modPoke.js"); 
        const _dynamicChannels = require('./features/dynamicChannels.js');
        const _reactions = require('./features/reactions.js');
        const _messageDeleteLog = require('./logs/messageDeleteLog.js');
        const _guildBanAddLog = require('./logs/guildBanAddLog.js');
        const _streamers = require('./features/streamers.js');
        const _activityMessage = require('./features/activityMessage.js');
        const _activityVoice = require('./features/activityVoice.js');

    // MYSQL
        const mysql = require('mysql');
        var connection = mysql.createConnection({
            host: settings.dbHost,
            user: settings.dbUsername,
            password: settings.dbPassword,
            database: settings.dbDatabase
        });

// ================== Modules =======================

    client.modules = {}

    function reloadAllModules()
    {
        reloadCoreModule();
        reloadUtilityModule();
        reloadModerationModule();
        reloadAutoRoleModule();
        reloadTedModule();
        reloadcsgoModule();
    }

    function reloadCoreModule()
    {
        delete client.modules.core;
        delete coreFiles;
        client.modules.core = new discord.Collection();
        const coreFiles = fs.readdirSync('./commands/core');
        for (const file of coreFiles)                        // Read commands from the module's folder
        {
            const command = require(`./commands/core/${file}`);
            client.modules.core.set(command.name, command);
        }
    }

    function reloadUtilityModule()
    {
        delete client.modules.utility;
        delete utilityFiles;
        client.modules.utility = new discord.Collection();
        utilityFiles = fs.readdirSync('./commands/utility');
        for (const file of utilityFiles)                        // Read commands from the module's folder
        {
            const command = require(`./commands/utility/${file}`);
            client.modules.utility.set(command.name, command);
        }
    }

    function reloadModerationModule()
    {
        delete client.modules.moderation;
        delete moderationFiles;
        client.modules.moderation = new discord.Collection();
        moderationFiles = fs.readdirSync('./commands/moderation');
        for (const file of moderationFiles)                        // Read commands from the module's folder
        {
            const command = require(`./commands/moderation/${file}`);
            client.modules.moderation.set(command.name, command);
        }
    }

    function reloadAutoRoleModule()
    {
        delete client.modules.autoRole;
        delete autoRoleFiles;
        client.modules.autoRole = new discord.Collection();
        autoRoleFiles = fs.readdirSync('./commands/autoRole');
        for (const file of autoRoleFiles)                        // Read commands from the module's folder
        {
            const command = require(`./commands/autoRole/${file}`);
            client.modules.autoRole.set(command.name, command);
        }
    }

    function reloadTedModule()
    {
        delete client.modules.ted;
        delete tedFiles;
        client.modules.ted = new discord.Collection();
        tedFiles = fs.readdirSync('./commands/ted');
        for (const file of tedFiles)                        // Read commands from the module's folder
        {
            const command = require(`./commands/ted/${file}`);
            client.modules.ted.set(command.name, command);
        }
    }

    function reloadcsgoModule()
    {
        delete client.modules.csgo;
        delete csgoFiles;
        client.modules.csgo = new discord.Collection();
        const csgoFiles = fs.readdirSync('./commands/csgo');
        for (const file of csgoFiles)                        // Read commands from the module's folder
        {
            const command = require(`./commands/csgo/${file}`);
            client.modules.csgo.set(command.name, command);
        }
    }

// =================== EVENTS =======================

    client.on ("ready", onReady);
    client.on("message", onMessage);
    client.on("voiceStateUpdate", onVoiceUpdate);
    client.on("messageReactionAdd", onMessageReactionAdd);
    client.on("messageReactionRemove", onMessageReactionRemove);
    client.on("guildBanAdd", onGuildBanAdd);
    client.on("messageDelete", onMessageDelete);
    client.on("guildMemberAdd", onGuildMemberAdd);
    client.on('raw', onRaw);

// =============== Event Functions ==================

    async function onReady()
    {
        console.log("Ready!");
        client.user.setActivity("Konvict Gaming");
        reloadAllModules();
    }

    async function onMessage(message)                                                                                           // Message handler
    {
        // ************* Check message for requirements and setup message **************
            if (!message.content.startsWith(settings.prefix) || message.author.bot) return;                                     // insure bot doesn't respond to other bots, or its self
            const args = message.content.slice(settings.prefix.length).split(/ +/);                                             // get args
            const commandName = args.shift().toLowerCase();                                                                     // first arg is command name

            const command = await getCommand(commandName);                                                                              // get command from the first arg
            if(!command) return;

            var isOwner = false;
            if (message.author.id == settings.ownerID) isOwner = true;  
        // ********************** Check Command Properties *****************************
            // Owner Only
                if(command.ownerOnly && !isOwner)
                {
                    return message.reply("Only the bot owner can use this command!");
                }
            
            // Guild Only
                if (command.guildOnly && message.channel.type !== 'text')                                                       // Should a message be sent only on a guild channel or can it be sent in a dm?
                {
                    return message.reply('I can\'t execute that command inside DMs!');
                }

            // args & usage
                if (command.args && !args.length)                                                                               // Check to see if the command requires args and see if any were given
                {
                    let reply = `You didn't provide any arguments, ${message.author}!`;
                    if (command.usage)                                                                                          // If  command has a usage property, reply with the proper usage included
                    {
                        reply += `\nThe proper usage would be: \`${settings.prefix}${command.name} ${command.usage}\``;
                    }
                    return message.channel.send(reply);
                }

            // Cooldowns
                if (!cooldowns.has(command.name))                                                                               // Check to see if the command is already in the cooldown collection, if not create it
                {
                    cooldowns.set(command.name, new discord.Collection());
                }

                const now = Date.now();
                const timestamps = cooldowns.get(command.name);
                const cooldownAmount = (command.cooldown || 3) * 1000;

                if (!timestamps.has(message.author.id))                                                                         // check to see if the author's ID is already in the timestamps of the cooldown collection
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
            
            // Permissions
                if(command.requiredRoles && !isOwner)
                {
                    var perms = false;
                    if (command.requiredRoles[0] == '' || command.requiredRoles[0] == 'none' ) perms = true;                                           // if array is empty set to true 
                    for(role of command.requiredRoles)
                    {
                        if (message.member.roles.exists("name", role)) perms = true;
                    }
                    if (!perms) return message.reply("You do not have permissions for this command");
                }

        // **************************** Run Commands ***********************************
            try
            {
                console.log("Atempting to run command: " + commandName );
                command.execute(message, args, connection);
            }
            catch (error) 
            {
                console.error(error);
                message.reply("There was an error trying to execute `" + commandName + "` Please contact a " + message.guild.roles.find("name", "Technician"));
            }
        
        // run activity
            _activityMessage.execute(message,connection).catch(console.log);
    };

    async function onVoiceUpdate(oldMember, newMember)
    {
        _dynamicChannels.execute(oldMember, newMember);
        _modPoke.execute(oldMember, newMember);
        _streamers.execute(oldMember, newMember);
        _activityVoice.execute(oldMember, newMember,connection);
    };

    async function onMessageReactionAdd(messageReaction, user)
    {
        _reactions.execute(messageReaction, user);
    };

    async function onMessageReactionRemove(messageReaction, user)
    {
        _reactions.execute(messageReaction, user);
    };

    async function onMessageDelete(message)
    {
        _messageDeleteLog.execute(message);
    };

    async function onGuildBanAdd(guild,user)
    {
        _guildBanAddLog.execute(guild,user);
    };

    async function onGuildMemberAdd(guildMember)
    {
        const welcome = new discord.RichEmbed()
            .setColor('#FF0000')
            .setTitle('__Welcome!__')
            .setAuthor(guildMember.guild.name, guildMember.guild.iconURL)
            .setThumbnail(guildMember.guild.iconURL)
            .setDescription("Welcome to KG! To get started, please read the #start-here channel to gain permissions!")
            .addField("__Guests:__ ", "Start by choosing sections in the #start_here channel! Feel free to apply at http://www.konvictgaming.com to become a member (members get priority for events and fancy colors)", false)
            .addField("__Applicants:__ ", "Join the application room under konvict staff to get help from a moderator!", false)
            .addField("__Current Members:__ ", "Connect your account on the website using this link: https://www.konvictgaming.com/account/external-accounts ", false)
            .setTimestamp()
            .setFooter('Questions? Contact a Moderator!');

        guildMember.send(welcome);
    }

    async function onRaw(event) // so that all events trigger for all messages (reactions)
    {
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
    };


// ============== Helper Functions ==================

    async function getCommand(commandName)
    {
        for (mod in client.modules)
        {
            if (client.modules[mod].get(commandName) || client.modules[mod].find(cmd => cmd.aliases && cmd.aliases.includes(commandName)))
            {
                const command = await client.modules[mod].get(commandName) || client.modules[mod].find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                return command;
            }
        }
        return undefined;
    };
