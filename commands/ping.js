exports.run = (bot, message, args, prefix) => {
  message.channel.send("Pong!");
};

exports.help = () => {
  return [
    {
      name: "ping",
      usage: "-/ping",
      description: "Pings the senders channel",
      tpye: "MISC"
    }
  ];
};
