const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
require('dotenv').config();
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

bot.on('message', message => {
    let sender = message.author;
    //message.channel.send('s');

    if (sender.bot) return;
    if (message.channel.type != 'text')
        return message.channel.send('Please use commands in a server!');

    let prefix = '-/';

    let msg = message.content.toUpperCase();
    let args = message.content
        .slice(prefix.length)
        .trim()
        .split(' ');
    let msgcmd = args.shift().toLowerCase();
    /*
    if (msgcmd != 'help') {
        if (!msg.startsWith(prefix)) return;
    } else {
        if (!msg.startsWith('-/')) return;
    }*/
    if (!msg.startsWith('-/')) return;
    try {
        let commandFile = require(`../commands/${msgcmd}.js`);
        commandFile.run(bot, message, args, prefix);
    } catch (e) {
        console.log('Error: ' + e.message);
    } finally {
        console.log(`${message.author.username} ran the command: ${msgcmd}`);
    }
});

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`);
    bot.user.setActivity(`-/help`);
    console.log(`${bot.user.username} is on ${bot.guilds.size} server(s)!`);
});

bot.on('error', e => {
    console.error(e);
});
bot.on('warn', e => {
    console.warn(e);
});
bot.on('info', e => {
    console.info(e);
});

bot.login(process.env.BOT_TOKEN);
