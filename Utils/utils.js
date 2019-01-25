const fs = require('fs');
const _alerts = JSON.parse(fs.readFileSync('./config/alerts.json', 'utf8'));
const _config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
exports.sleep = function(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

exports.kickerror = () => {
    return _alerts.kick_error;
};
