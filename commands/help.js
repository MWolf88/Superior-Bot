const Discord = require('discord.js');
const fs = require('fs');
const path = './commands';
let commandsArray = new Array();
exports.run = (bot, message, args, prefix) => {
  
  if (args[0] != null) {
    const cmdfile = require(`./${args[0]}`);
    cmdObj = cmdfile.help();
    helpEmbed = new Discord.RichEmbed()
      .setTitle(`${prefix}${cmdObj.name}`)
      .setColor('#008cff')
      .setDescription(`${cmdObj.description}`)
      .setTimestamp()
      .addField('Usage', `\`${cmdObj.usage}\``, true);
    message.channel.send(helpEmbed);
    return;
  }
  fs.readdir(path, function (err, items) {
    if (err) {
      throw err;
    }
    for (var i = 0; i < items.length; i++) {
      let cmdfile = require('./' + items[i]);
      let cmdInfo = cmdfile.help();
      if (cmdInfo != null) {
        commandsArray.push(cmdInfo);
      }
    }
    sendEmbed();
  });

  function sendEmbed() {
    helpEmbed = new Discord.RichEmbed()
      .setDescription(
        "I'm a multi-purpose discord bot that does music, \
         moderation and other fun and useful things." +
        `\nDo \`${prefix}help [command]\` for extended info on a command.` +
        '\n\n**Invite:** HERE' +
        '\n<> is required [] is optional'
      )
      .setColor('#008cff')
      .setTimestamp()
      .addField('MISC', commandsString('MISC'), true)
      .addField('ADMIN', commandsString('ADMIN'), true);

    message.author.send(helpEmbed);
  }

  function commandsString(cmdType) {

    let cmdArray = commandsArray.filter(function (arr) {
      return arr.type == cmdType;
    })
    let finalString = '';
    cmdArray.forEach((item) => {
      finalString = finalString + `\`${prefix}${item.name}\`\n`;
    })
    return finalString;
  }

};
exports.help = () => {
  return null;
};
