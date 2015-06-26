var request = require('request'),
    query = require('querystring');

function smagenBot (options) {
  var self = this;
  this.APIURL = 'https://api.telegram.org/bot';

  this.token = options.token;
  this.username = options.username;
  this.chatId = "";
  this.offset = 0;
  this.quiet = options.quiet || false;
  this.botName = options.botName || 'smagenBot';

  this.wrapper = function(cmd, cb) {
    cb = cb || function(){ if (!self.quiet) { console.log('Sent'); } };
    request({
      method: 'GET',
      url: this.APIURL+this.token+'/'+cmd,
      json: true
    }, function (err, resp, body) {
      if (!err && resp.statusCode === 200) {
        cb(null, body);
      } else {
        cb(err, null);
      }
    });
  };
}

smagenBot.prototype.getUpdates = function (cb) {
  this.wrapper('getUpdates', cb);
};

smagenBot.prototype.sendMessage = function (message) {
    this.wrapper('sendMessage?chat_id=' + this.chatId +'&text='+message);
};

smagenBot.prototype.makeAction = function (text) {
  var param,
      nick = false;
  if(typeof text !== "undefined" && text.charAt(0) === '/') {
    text = text.split(' ');
    if(text.length > 0) {
      param = text[1];
    }
    //if there is a nick on the command, must be my name
    var command = text[0].replace('/',''); //Remove slash
    command = text[0].split('@'); //looking for a nick
    var plugin = command[0];
    if(command.length > 0) {
      nick = command[1];
    }

    if(!nick || (nick && nick === this.botName)) {
      try {
        var self = this;
        require('./plugins/'+plugin)(param, function(obj) {
          var str = "";
          for(var key in obj) {
            str += key + ": "+query.escape(obj[key])+"%0A";
          }
          self.sendMessage(str);
        });
      } catch(err) {
        var strError = (err.name === "Error") ?
          "Plugin not found. Type /help to see the plugins list" : err.message;
        this.sendMessage(strError);
      }
    }
  }
};

module.exports = smagenBot;
