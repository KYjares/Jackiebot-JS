module.exports = {
  name: "coin-flip",
  description: "For your Twoface moments",
  aliases: ["coinflip", "coin", "flip"],
  execute(message, args) {
    sides = [":moneybag: Heads", ":purse: Tails"];

    message.channel.send(sides[Math.floor(Math.random() * 2)]);
  }
};
