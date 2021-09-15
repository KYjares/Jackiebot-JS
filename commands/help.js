const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
	name: "help",
	description: "List all of my commands or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;
		var helpEmbed;

		if (!args.length) {
			helpEmbed = new Discord.MessageEmbed().addField(
				"Here's a list of all my commands:",
				commands.map((command) => command.name).join(", ") +
					`\n\nYou can send \`${process.env.PREFIX}help [command name]\` to get info on a specific command!`
			);

			message.author
				.send({ embeds: [helpEmbed] })
				.then(() => {
					if (message.channel.type === "DM") return;
					message.reply("I've sent you a DM with all my commands!");
				})
				.catch((error) => {
					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error
					);
					message.reply(
						"it seems like I can't DM you! Do you have DMs disabled?"
					);
				});
		} else {
			const name = args[0].toLowerCase();
			const command =
				commands.get(name) ||
				commands.find((c) => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply("that's not a valid command!");
			}

			helpEmbed = new Discord.MessageEmbed().setTitle(
				`**Name:** ${command.name}`
			);

			if (command.aliases)
				helpEmbed.addField("**Aliases:**", command.aliases.join(", "));
			if (command.description)
				helpEmbed.addField("**Description:**", command.description);
			if (command.usage)
				helpEmbed.addField(
					"**Usage:**",
					process.env.PREFIX + command.name + command.usage
				);

			helpEmbed.addField("**Cooldown:**", command.cooldown || 3 + " second(s)");

			message.channel.send({ embeds: [helpEmbed] });
		}
	},
};
