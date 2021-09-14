const Discord = require("discord.js");

module.exports = {
	name: "roll",
	description: "Slow your roll",
	execute(message, args) {
		if (args) {
			message.channel.send("Result: " + Math.floor(Math.random() * args));
		} else {
			message.channel.send("How many sides?");
			const collector = new Discord.MessageCollector(
				message.channel,
				(m) => m.author.id === message.author.id,
				{ time: 10000 }
			);
			console.log(collector);
			collector.on("collect", (message) => {
				message.channel.send(
					"Result: " + Math.floor(Math.random() * message.content)
				);
			});
		}
	},
};
