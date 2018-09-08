let fs = require("fs");
let path = "./commands";
let commandsArray = new Array();
exports.run = (bot, message, args, prefix) => {
  fs.readdir(path, function(err, items) {
    //console.log(items);

    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);

      let cmdfile = require("./" + items[i]);
      // TODO fix
      let cmdInfo = cmdfile.help();
      //console.log(help[0]);
      if (cmdInfo != null) {
        console.log(cmdInfo[0].name);
      }
    }
  });
};
exports.help = () => {
  return null;
};
