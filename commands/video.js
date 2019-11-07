const YouTube = require("discord-youtube-api");
const { youtubeAPI } = require("../config.json");

const youtube = new YouTube(youtubeAPI);
const Discord = require("discord.js");

module.exports = {
  name: "video",
  description: "Youtube search",
  async execute(message, args) {
    let video;
    if (!args) {
      video = await youtube.searchVideos("big poppa biggie smalls", 1);
    } else {
      let term = args.toString();
      let cleanTerm = term.replace(/,/g, " ");
      video = await youtube.searchVideos(cleanTerm, 1);
    }

    // const ytEmbed = new Discord.RichEmbed()
    //   .setColor("0xffd465")
    //   .setTitle(video.title)
    //   .setDescription(video.description)
    //   .setThumbnail(video.url);

    message.channel.send(video.title);
    message.channel.send(video.url);
  }
};
