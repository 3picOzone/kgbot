const exec = require('child_process');
const settings = require('../settings.json');   // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
    name: 'restart',                   // Command name (same as the file.js name)
    description: 'Updates the bot with the repo \n**Required Role: Technician', // info that gets pulled by the help command for a description
    aliases: ['update'],  // Optional saiases for the command
    usage: '',                // For help command or if command was sent wrong
    cooldown: 0,                            // Optional Cooldown Between Uses
    args: false,                            // true/false are there any args for this command?
    guildOnly: false,                       // true/false should it only be used in guild channels and not in PM's
    execute(message, args) {                // Function Goes Here
        if (!message.member.roles.exists("name", "Technician"))
        {
            message.reply("You do not have permission to execute this command! You must be at least a Moderator!")
        }
        else
        {
            async function shellExec(cmd){
                return new Promise(function (resolve, reject) {
                    exec(cmd, (err, stdout, stderr) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({ stdout, stderr });
                        }
                    });
                });
            };
            // I gave you control, what goes here then to run the file?
        } 
    },
};