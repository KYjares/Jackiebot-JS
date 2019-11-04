module.exports = {
    name: "8-ball",
    description: "Answers from the beyond.",
    aliases: ['eight_ball', 'eightball', '8ball'],
    execute(message, args) {
        bag_of_words = ['Yes', 'It is certain', 'It is decidedly so', 'Without a doubt', 'You may rely on it',
					'As I see it, yes', 'Most likely', 'Outlook good', 'Signs point to yes', 'Reply hazy, try again',
					'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
					'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful','Niggers']
      
                    message.channel.send(":8ball: " + bag_of_words[Math.floor(Math.random() * bag_of_words.length)]);
    }
  };
  