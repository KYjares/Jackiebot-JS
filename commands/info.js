const Discord = require("discord.js");

module.exports = {
	name: "info",
	description: "User's ID card",
	async execute(message, args) {
		var taggedUser, user;

		if (!message.mentions.users.size) {
			taggedUser = await message.author;
			guildUser = await message.guild.members.fetch(taggedUser.id);
		} else {
			taggedUser = await message.mentions.users.first();
			guildUser = await message.guild.members.fetch(taggedUser.id);
		}

		const userEmbed = new Discord.MessageEmbed()
			.setColor("0xffd465")
			.setTitle((guildUser.nickname || guildUser.user.username) + "'s info")
			.setDescription("Here's some dirt on them")
			// .addBlankField()
			.addField("Name", guildUser.user.username, true)
			.addField("ID", guildUser.user.id, true)
			//.addField("Status", guildUser.user.presence.status, true)
			.addField("Highest Role", guildUser.roles.highest.name, true)
			//.addField("Joined at", guildUser.joinedAt, true)
			.setThumbnail(
				`https://cdn.discordapp.com/avatars/${guildUser.user.id}/${guildUser.user.avatar}.png?size=256`
			);

		message.channel.send({ embeds: [userEmbed] });
	},
};

//   .setColor('#0099ff')
// 	.setTitle('Some title')
// 	.setURL('https://discord.js.org/')
// 	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
// 	.setDescription('Some description here')
// 	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
// 	.addField('Regular field title', 'Some value here')
// 	.addBlankField()
// 	.addField('Inline field title', 'Some value here', true)
// 	.addField('Inline field title', 'Some value here', true)
// 	.addField('Inline field title', 'Some value here', true)
// 	.setImage('https://i.imgur.com/wSTFkRM.png')
// 	.setTimestamp()
// 	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
