var urban = require("urban");
const Discord = require("discord.js");

module.exports = {
	name: "urban",
	description: "Search for the internet's definition",
	execute(message, args) {
		let term = args.toString();
		let cleanTerm = term.replace(/,/g, " ");
		let search = urban(cleanTerm);

		search.first((res) => {
			if (!res) message.channel.send("No results found");

			let { word, definition, example, thumbs_up, thumbs_down, author } = res;

			const urbanEmbed = new Discord.MessageEmbed()
				.setColor("0xffd465")
				.setTitle(word)
				.setDescription(definition)
				.setAuthor(author)
				.addField("Example", example, true)
				.addField(
					"Thumbs",
					":thumbsup: " + thumbs_up + " | :thumbsdown:" + thumbs_down,
					true
				);

			message.channel.send({ embeds: [unbanEmbed] });
		});
	},
};
