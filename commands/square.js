module.exports = {
    name: "square",
    description: "2+2 is 4",
    args: true,
  usage: "<integer>",
    execute(message, args) {
        if(args.length != 1){
            message.channel.send("Please input only one int argument thank you");
        }else{
            message.channel.send("The square of " + args[0] + " is " + args[0]*args[0]);
        }     
    }
  };
  