exports.run = (bot, message, args, prefix) => {
    var v = Math.trunc(args[0] / 100);
    var r = args[0] / 100 - v;

    if (args[0] <= 100) {
        async function clean() {
            let fetched = await message.channel.fetchMessages({ limit: args[0] });
            message.channel.bulkDelete(fetched);
            message.channel.send(`Deleted ${fetched.size} messages`).then(msg => {
                msg.delete(5000)
            })
        }
        clean();
    }



    //message.delete();
    async function clean(limit) {
        let fetched = await message.channel.fetchMessages({ limit: 4 });
        message.channel.bulkDelete(fetched);
        await sleep(100);
        fetched = await message.channel.fetchMessages({ limit: 2 });
        message.channel.bulkDelete(fetched);
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