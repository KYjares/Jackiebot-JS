const Discord = require("discord.js");

module.exports = {
	name: "test-picture",
	description: "Picture upload test",
	execute(message, args) {
		const localEmbed = new Discord.MessageEmbed()
			.setColor("0xffd465")
			//Local
			.setImage("./assets/hs.jpg")
			.setImage("./assets/a.jpg")
			.setImage("./assets/c.png")
			.setImage("./assets/p.gif");

		message.channel.send({ embeds: [localEmbed] });

		const urlEmbed = new Discord.MessageEmbed()
			.setColor("0xffd465")
			//URL
			.setImage(
				"https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&h=350"
			);

		message.channel.send({ embeds: [urlEmbed] });
	},
};
