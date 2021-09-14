module.exports = {
	name: "naptime",
	description: "time for my afternoon nap",
	async execute(message, args) {
		message.channel.send("Goodnight!");
		await new Promise((resolve) => setTimeout(resolve, 5000));
		message.channel.send("Cyke!");
		await new Promise((resolve) => setTimeout(resolve, 2000));
		message.channel.send("Double cyke, later nerds");
		await message.client.destroy();
	},
};
