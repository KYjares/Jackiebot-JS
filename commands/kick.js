module.exports = {
	name: "kick",
	description: "When someone is missing a boot",
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply("you need to tag a user in order to kick them!");
		}
		if (
			message.member.roles.find((r) => r.name === "Supreme Overlord") ||
			message.member.roles.find((r) => r.name === "Project: Ruka v2.0")
		) {
			const taggedUser = message.mentions.users.first();
			var kickUser = message.guild.member(taggedUser);

			kickUser
				.kick()
				.then((taggedUser) => {
					message.channel.send(
						":boot: BEGONE " + taggedUser.displayName + "!!!"
					);
				})
				.catch(() => {
					message.channel.send("Access Denied");
				});
		}
	},
};
