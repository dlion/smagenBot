var request = require('request'),
    query = require('querystring');

function smagenBot (options) {
  var self = this;
  this.APIURL = 'https://api.telegram.org/bot';

  this.token = options.token;
  this.username = options.username;
  this.chatId = "";
  this.offset = 0;

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
  var param;
  if(text.charAt(0) === '/') {
    var commands = text.split(' ');
    if(commands.length > 1) {
      param = commands[1];
    }
    text = commands[0].replace('/','');
    try {
      var self = this;
      require('./plugins/'+text)(param, function(obj) {
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
};

module.exports = smagenBot;
