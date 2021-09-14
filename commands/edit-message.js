module.exports = {
	name: "edit-message",
	description: "History is written by the winners",
	aliases: ["jovenfacts", "editmessage", "edit"],
	execute(message, args) {
		message.channel.send("Yeet").then(async (msg) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			msg.edit("[REDACTED]");
		});
	},
};
