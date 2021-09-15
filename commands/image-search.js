const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const GoogleImages = require("google-images");
require("dotenv").config();

const images = new GoogleImages(
	process.env.GOOGLE_CSE_ID,
	process.env.GOOGLE_IMAGE_API
);

module.exports = {
	name: "image-search",
	description: "Fuck notso's image search",
	args: true,
	aliases: ["pic", "img", "image"],
	async execute(message, args) {
		try {
			var page = 1;
			var term, cleanTerm;
			let [result] = "";

			term = args.toString();
			cleanTerm = term.replace(/,/g, " ");
			[result] = await images.search(cleanTerm, { page: page });

			if (!result) return await message.channel.send(":x: No images found!");

			//   const attachment = new Attachment(result.url);
			const imageEmbed = new MessageEmbed()
				.setColor("0xffd465")
				.setImage(result.url);

			const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId("primary")
					.setLabel("Previous Image")
					.setStyle("PRIMARY"),
				new MessageButton()
					.setCustomId("secondary")
					.setLabel("Next Image")
					.setStyle("PRIMARY")
			);

			message.channel
				.send({ embeds: [imageEmbed], components: [row] })
				.then((msg) => {
					const filter = (m) => m.user.id === message.author.id;
					const collector = message.channel.createMessageComponentCollector({
						filter,
					});

					collector.on("collect", async (button) => {
						button.deferUpdate();

						if (button.customId === "primary") {
							if (page > 1) {
								page--;
							}
						} else if (button.customId === "secondary") {
							page++;
						}

						let [result2] = await images.search(cleanTerm, { page: page });

						imageEmbed2 = new MessageEmbed()
							.setColor("0xffd465")
							.setImage(result2.url);

						msg.edit({ embeds: [imageEmbed2] });
					});
				});
		} catch (err) {
			console.error(err);
		}
	},
};

//   client.search('Steve Angello')
//     .then(images => {
//         /*
//         [{
//             "url": "http://steveangello.com/boss.jpg",
//             "type": "image/jpeg",
//             "width": 1024,
//             "height": 768,
//             "size": 102451,
//             "thumbnail": {
//                 "url": "http://steveangello.com/thumbnail.jpg",
//                 "width": 512,
//                 "height": 512
//             }
//         }]
//          */
//     });

// // paginate results
// client.search('Steve Angello', {page: 2});

// // search for certain size
// client.search('Steve Angello', {size: 'large'});
