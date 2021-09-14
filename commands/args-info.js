module.exports = {
	name: "args-info",
	description: "Arguments test",
	args: true,
	usage: "<args>",
	execute(message, args) {
		if (args[0] === "foo") {
			return message.channel.send("bar");
		}

		message.channel.send(`First argument: ${args[0]}`);
	},
};
