const Discord = require("discord.js");

module.exports = {
	name: "roll",
	description: "Slow your roll",
	execute(message, args) {
		if (args.length) {
			message.channel.send("Result: " + Math.floor(Math.random() * args));
		} else {
			message.channel.send("How many sides?");

			const filter = (m) => m.author.id === message.author.id;
			const collector = message.channel.createMessageCollector({
				filter,
				max: 1,
				time: 6000,
			});
			collector.on("collect", (m) =>
				message.channel.send(`Result: ${Math.floor(Math.random() * m.content)}`)
			);
			// collector.on("end", (collected) =>
			// 	console.log(`Collected ${collected.size} items`)
			// );
		}
	},
};
