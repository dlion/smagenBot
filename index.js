var smagenBot = require('./bin/smagenBot'),
    config    = require('./config.json');

var bot = new smagenBot(config);

function check() {
  bot.getUpdates(function (err, body) {
    if (!err) {
      if (body.result.length > 0) {
        //Watch the last message
        var current = body.result[body.result.length-1];
        //From my chat and nobody else
        if(current.update_id >= bot.offset) {
          bot.chatId = current.message.chat.id;
          bot.offset = current.update_id + 1;
          if(!bot.username) {
            bot.makeAction(current.message.text);
          } else {
            if (bot.username.indexOf(current.message.from.username) != -1)
            {
              bot.makeAction(current.message.text);
            }
            else
            {
              bot.sendMessage("Only "+JSON.stringify(config.username)+" can use me!");
            }
          }
        }
      }
    }
  });
}

setInterval(check, config.interval || 1000);
