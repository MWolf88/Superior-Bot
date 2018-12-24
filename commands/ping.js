
exports.run = (bot, message, args, prefix) => {
  message.channel.send('Pong!' + ` \`${Date.now() - message.createdAt}ms\``);
};

exports.help = () => {
  return {
    name: 'ping',
    usage: '-/ping',
    description: 'Pings the senders channel',
    type: 'MISC'
  };
};
