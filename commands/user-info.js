module.exports = {
  name: "user-info",
  description: "Get a user's info",
  execute(message, args) {
    message.channel.send(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
    );
  }
};
