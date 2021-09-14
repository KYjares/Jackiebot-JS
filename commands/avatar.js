const Discord = require("discord.js");

module.exports = {
	name: "avatar",
	description: "Display mentioned user(s) avatar(s)",
	aliases: ["icon", "pfp"],
	execute(message, args) {
		if (!message.mentions.users.size) {
			const avatarEmbed = new Discord.MessageEmbed()
				.setAuthor(`Your Avatar`)
				.setImage(
					`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`
				);
			message.channel.send({ embeds: [avatarEmbed] });
		}

		const avatarList = message.mentions.users.map((user) => {
			const avatarEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username}'s Avatar`)
				.setImage(
					`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
				);
			message.channel.send({ embeds: [avatarEmbed] });
		});

		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	},
};
