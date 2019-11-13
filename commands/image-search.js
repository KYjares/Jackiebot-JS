const { RichEmbed, Attachment } = require("discord.js");
const GoogleImages = require("google-images");
const images = new GoogleImages(
  "017633256158255554062:3lkbk9e70f4",
  "AIzaSyCGeKUK71Nnf9J7v-cG13P4dYuZdR812qg"
);

module.exports = {
  name: "image-search",
  description: "Fuck notso's image search",
  aliases: ["pic", "img", "image"],
  async execute(message, args) {
    try {
      let [result] = "";
      if (!args) {
        [result] = await images.search("nibbah", { page: 1 });
      } else {
        let term = args.toString();
        let cleanTerm = term.replace(/,/g, " ");
        [result] = await images.search(cleanTerm, { page: 1 });
      }

      if (!result) return await message.channel.send(":x: No images found!");

      //   const attachment = new Attachment(result.url);
      const imageEmbed = new RichEmbed()
        .setColor("0xffd465")
        .setImage(result.url);

      let imageReaction = await message.channel.send(imageEmbed);
      imageReaction.react("◀️").then(() => imageReaction.react("▶️"));

      //   const filter = reaction => {
      //     return ["◀️", "▶️"].includes(reaction.emoji.name);
      //   };
      //   imageReaction.awaitReactions(filter, { time: 15000, errors: ["time"] });
      // .then(collected => {
      //   const reaction = collected.first();
      //   if (reaction.emoji.name === "◀️") {
      //     message.reply("back");
      //     return ["◀️", "▶️"].includes(reaction.emoji.name);
      //   } else if (reaction.emoji.name === "▶️") {
      //     message.reply("forward");
      //   }
      // })
      // .catch(collected => {
      //   console.log(
      //     `After a minute, only ${collected.size} out of 2 reacted.`
      //   );
      //   message.reply("you didn't react");
      // });
    } catch (err) {
      console.error(err);
    }
  }
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
