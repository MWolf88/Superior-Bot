const Utils = require('../Utils/utils');
exports.run = (bot, message, args, prefix) => {
    async function clean(limit) {
        if (limit <= 100) {
            await massDelete(message, limit).then(fetched => {
                message.channel
                    .send(`Deleted **${fetched.size}** messages`)
                    .then(msg => {
                        msg.delete(5000);
                    });
            });
        } else {
            let wholeReps = Math.trunc(limit / 100);
            console.log(wholeReps);
            let Remaning = Math.trunc((limit / 100 - wholeReps) * 100);
            console.log(Remaning);
            let fetched = 0;
            for (var i = 0; i < wholeReps; i++) {
                await massDelete(message, 100).then(_fetched => {
                    fetched += _fetched;
                });
                await Utils.sleep(100);
            }
            await Utils.sleep(100);
            await massDelete(message, Remaning).then(_fetched => {
                fetched += _fetched;
            });
            message.channel
                .send(`Deleted **${fetched}** messages`)
                .then(msg => {
                    msg.delete(5000);
                });
        }
    }
    async function deleteOver14(limit) {
        await message.channel
            .fetchMessages({ limit: limit })
            .then(async _messages => {
                _messages.forEach(msg => {
                    message.channel.fetchMessage(msg).then(_msg => {
                        try {
                            message.delete();
                        } catch (e) {
                            console.log(e);
                        }
                    });
                });
            });
        return new Promise(function(resovle) {
            resovle();
        });
    }

    async function massDelete(message, limiter) {
        let _fetched = await message.channel.fetchMessages({
            limit: limiter
        });
        message.channel.bulkDelete(_fetched).catch(async () => {
            await deleteOver14(limiter);
        });
        return new Promise(resolve => {
            resolve(_fetched.size);
        });
    }
    clean(args[0]);
};

exports.help = () => {
    return {
        name: 'clean',
        usage: 'clean <# of messages>',
        description: 'Deletes amount of messages specified by the user.',
        type: 'ADMIN'
    };
};
