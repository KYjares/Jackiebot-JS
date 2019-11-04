module.exports = {
  name: "role",
  description: "Get a user's server roles",
  args: true,
  usage: "<user> <role>",
  execute(message, args) {
    message.channel.send("Pong.");
  }
};
