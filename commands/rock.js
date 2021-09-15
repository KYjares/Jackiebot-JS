const Discord = require("discord.js");

module.exports = {
	name: "rock",
	description: "The gentlemanly way of solving problems",
	aliases: ["rockpaperscissors", "paper", "scissors", "jackenpoy"],
	async execute(message, args) {
		message.channel.send("Shoot on the count of 3");
		await new Promise((resolve) => setTimeout(resolve, 1000));
		message.channel.send("3");
		await new Promise((resolve) => setTimeout(resolve, 1000));
		message.channel.send("2");
		await new Promise((resolve) => setTimeout(resolve, 1000));
		message.channel.send("1");
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let tool = ["rock", "paper", "scissors"];
		let tool_choice = tool[Math.floor(Math.random() * 3)];

		const filter = (m) => m.author.id === message.author.id;
		const collector = message.channel.createMessageCollector({
			filter,
			max: 1,
			time: 6000,
			errors: ["time"],
		});
		collector.on("collect", (message) => {
			message.channel.send("I chose " + tool_choice);

			let response = "";

			if (tool_choice === message.content) {
				response = "Its a draw :/";
			} else if (
				(tool_choice === "rock" && message.content === "paper") ||
				(tool_choice === "paper" && message.content === "scissors") ||
				(tool_choice === "scissors" && message.content === "rock")
			) {
				response = "Guess I lost :(";
			} else if (
				(tool_choice === "paper" && message.content === "rock") ||
				(tool_choice === "scissors" && message.content === "paper") ||
				(tool_choice === "rock" && message.content === "scissors")
			) {
				response = "So I win!";
			} else {
				response = "You can't use that :rolling_eyes:";
			}

			return message.channel.send(response);
		});

		collector.on("end", (collected) => {
			if (collected.size == 0) {
				message.channel.send("Too late! Times up!");
			}
		});
	},
};
