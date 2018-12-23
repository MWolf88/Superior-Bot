const Discord = require('discord.js');
const fs = require('fs');
const path = './commands';
let commandsArray = new Array();
exports.run = (bot, message, args, prefix) => {
  if (args[0] != null) {
    const cmdfile = require(`./${args[0]}`);
    cmdObj = cmdfile.help()[0];
    console.log(cmdObj);
    helpEmbed = new Discord.RichEmbed()
      .setTitle(`${prefix}${cmdObj.name}`)
      .setColor('#008cff')
      .setDescription(`${cmdObj.description}`)
      .setTimestamp()
      .addField('Usage', `\`${cmdObj.usage}\``, true);
    message.channel.send(helpEmbed);
    return;
  }
  fs.readdir(path, function(err, items) {
    if (err) {
      throw err;
    }
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
      let cmdfile = require('./' + items[i]);
      // TODO fix
      let cmdInfo = cmdfile.help();
      //console.log(help[0]);
      if (cmdInfo != null) {
        commandsArray.push(cmdInfo[0]);
        console.log(cmdInfo[0]);
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
          '\n\n**Invite:** HERE'
      )
      .setColor('#008cff')
      .setTimestamp()
      .addField('MISC', commandsString('MISC'), true);

    message.author.send(helpEmbed);
  }

  function commandsString(cmdType) {
    let finalString = '';
    for (var i = 0; i < commandsArray.length; i++) {
      let cmdObj = commandsArray[i];
      if (cmdType == undefined) {
        finalString = finalString + `\`${prefix}${cmdObj.name}\`\n`;
      } else if (cmdObj.type == cmdType) {
        finalString = finalString + `\`${prefix}${cmdObj.name}\`\n`;
      }
    }
    return finalString;
  }
};
exports.help = () => {
  return null;
};
