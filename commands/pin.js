module.exports = {
	name: "pin",
	description: "Stick it on the fridge",
	execute(message, args) {
		message.pin().then(console.log).catch(console.error);
	},
};
