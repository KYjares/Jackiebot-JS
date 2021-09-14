const Discord = require("discord.js");

module.exports = {
	name: "server",
	description: "Show a summary of the server",
	execute(message, args) {
		const server = message.guild;

		const serverEmbed = new Discord.MessageEmbed()
			.setColor("0xffd465")
			.setTitle(server.name + "'s info")
			.setDescription("Some more dirt for you")
			// .addBlankField()
			.addField("Name", server.name, true)
			.addField("ID", server.id, true)
			// WORK ON DISPLAYING
			// .addField("Roles", server.roles, true)
			// .addField(
			//   "Members",
			//   server.members.forEach(member => member.displayName),
			//   true
			// )
			.setThumbnail(server.iconURL);

		message.channel.send({ embeds: [serverEmbed] });
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
