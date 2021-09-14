module.exports = {
	name: "repeat",
	description: "Repeat stuff repeat stuff repeat stuff",
	args: true,
	usage: "<integer>",
	execute(message, args) {
		for (args; args > 0; args--) {
			message.channel.send("Yes");
		}
	},
};
