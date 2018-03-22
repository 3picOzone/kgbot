const exec = require('child_process');
const settings = require('../../settings.json');                                        // THIS FILE NEEDS TO BE IN THE COMMANDS FOLDER!!!!!!!

module.exports = {
	name: 'restart',                  	 									    		// Command name (same as the file.js name)
	description: 'restarts the bot and updates the bot with the repo',                  // info that gets pulled by the help command for a description
	aliases: ['update'],  									                    		// Optional saiases for the command
	usage: '',                								                    		// For help command or if command was sent wrong
	requiredRoles: ['Technician'],														// an array of role names that are required to run the command or (false || ['']) to disable
	cooldown: 0,                            											// Optional Cooldown Between Uses (defaults to 3 seconds if none set)
    args: false,                            											// true/false are there any args for this command?
	guildOnly: false,                       											// true/false should it only be used in guild channels and not in PM's
	ownerOnly: true,																	// should this command be only used by the bot owner (3pic_Ozone)
    hidden: true,                                                                       // should this command be hidden from the help menu
	disabled: false,																	// should this command be available to be used
    async execute(message, args, connection)         									// Function Goes Here
	{
        message.reply("Bot Restarting!").then(
        exec.execFile("/home/epic_ozone/kgbot/restart.sh"));
    },
};

/* Code for full bash command... later use? 
async function shellExec(cmd){
    return new Promise(function (resolve, reject) {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {reject(err);}
            else {resolve({ stdout, stderr });}
        });
    });
};
*/ 
