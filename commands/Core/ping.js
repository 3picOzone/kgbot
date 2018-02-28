module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	ownerOnly: true,
	requiredRoles: ['admin'],
	execute(message) {
		message.channel.send('Pong!');
	},
};