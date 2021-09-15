const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
require("dotenv").config();
const jackie = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});
jackie.commands = new Collection();
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	jackie.commands.set(command.name, command);
}

const cooldowns = new Collection();

changeStatus = async () => {
	while (true) {
		await jackie.user.setPresence({
			status: "online",
			activities: [{ name: "nice with her bot friends" }],
		});
		await new Promise((resolve) => setTimeout(resolve, 10000));
		await jackie.user.setPresence({
			status: "dnd",
			activities: [{ name: "house" }],
		});
		await new Promise((resolve) => setTimeout(resolve, 10000));
		await jackie.user.setPresence({
			status: "idle",
			activities: [{ name: "Playing Playing" }],
		});
		await new Promise((resolve) => setTimeout(resolve, 10000));
	}
};

jackie.on("ready", async () => {
	console.log(
		`Good day father\nMy name is ${jackie.user.tag}\nMy ID is ${jackie.user.id}`
	);

	changeStatus();
});

/* 
jackie.on("messageReactionAdd", (messageReaction, user) => {
  messageReaction.message.channel.send(
    user.username +
      " has reacted " +
      messageReaction.emoji +
      ' to the message "' +
      messageReaction.message +
      '"'
  );
});
*/

jackie.on("messageCreate", (message) => {
	// console.log(message.content);
	//Swear checker
	/*
  for (const word of badWords) {
    let re_pattern = `(?:^|\\W)${message.content.replace(
      /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      "\\$&"
    )}(?!\\w)`;
    let detect = new RegExp(word, "gi");
    let res = [],
      m;

    while ((m = detect.exec(re_pattern))) {
      res.push(m[1]);
    }
    if (res.length > 0) {
      message.delete();
      message.channel.send("A bad word was said :rage:");
    }
  }
  */
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
		return;

	const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command =
		jackie.commands.get(commandName) ||
		jackie.commands.find(
			(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
		);

	if (!command) return;

	//check if command is server only
	if (command.guildOnly && message.channel.type !== "GUILD_TEXT") {
		return message.reply("I can't execute that command inside DMs!");
	}

	//check arguments
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	//cooldown
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`please wait ${timeLeft.toFixed(
					1
				)} more second(s) before reusing the \`${command.name}\` command.`
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}
});

jackie.login(process.env.TOKEN);
