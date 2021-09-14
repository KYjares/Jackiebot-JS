module.exports = {
	name: "ping",
	description: "Play a bit of tabletennis with me",
	cooldown: 5,
	execute(message, args) {
		message.reply(":ping_pong: pong!");
	},
};
