const Discordjs = require('discord.js')
exports.run = (bot, message, args, prefix) => {
    if (args[0] <= 100) {

    }

    message.delete();
    async function clean() {
        let fetched = await message.channel.fetchMessages({ limit: 100 });
        //message.channel.bulkDelete(args[0]);
    }
    clean();
    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }

}

exports.help = () => {
    return {
        name: 'clean',
        usage: '-/clean <# of messages>',
        description: 'tets',
        type: 'ADMIN'
    };
};