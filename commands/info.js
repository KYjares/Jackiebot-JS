const Discord = require("discord.js");

module.exports = {
  name: "info",
  description: "User's ID card",
  execute(message, args) {
    let taggedUser, user;

    if (!message.mentions.users.size) {
      taggedUser = message.author;
      user = message.guild.member(taggedUser);
    } else {
      taggedUser = message.mentions.users.first();
      user = message.guild.member(taggedUser);
    }

    const userEmbed = new Discord.RichEmbed()
      .setColor("0xffd465")
      .setTitle(user.displayName + "'s info")
      .setDescription("Here's some dirt on them")
      // .addBlankField()
      .addField("Name", user.displayName, true)
      .addField("ID", user.id, true)
      .addField("Status", user.presence.status, true)
      .addField("Highest Role", user.highestRole.name, true)
      .addField("Joined at", user.joinedAt, true)
      .setThumbnail(user.user.avatarURL);

    message.channel.send(userEmbed);
  }
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
