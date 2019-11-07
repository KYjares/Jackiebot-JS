module.exports = {
  name: "ban",
  description: "In case the boot wasn't spiky enough",
  guildOnly: true,
  execute(message, args) {
    if (!message.mentions.users.size) {
      return message.reply("you need to tag a user in order to kick them!");
    }
    if (
      message.member.roles.find(r => r.name === "Supreme Overlord") ||
      message.member.roles.find(r => r.name === "Project: Ruka v2.0")
    ) {
      const taggedUser = message.mentions.users.first();
      var banUser = message.guild.member(taggedUser);

      banUser
        .ban()
        .then(taggedUser => {
          message.channel.send(":x: Cya " + taggedUser.displayName);
        })
        .catch(() => {
          message.channel.send("Access Denied");
        });
    }
  }
};
