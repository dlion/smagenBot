var request = require('request'),
    formData = require('form-data'),
    query = require('querystring'),
    winston = require('winston');;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: 'smagen.log' })
    ]
});

function smagenBot (options) {
  var self = this;
  this.APIURL = 'https://api.telegram.org/bot';

  this.token = options.token;
  this.username = options.username;
  this.chatId = "";
  this.offset = 0;
  this.quiet = options.quiet || false;
  this.botName = options.botName || 'smagenBot';

  //Wrapper to send text messages
  this.wrapperText = function(route, chatId, text, cb) {
    cb = cb || function(){ 
      if (!self.quiet) { 
        console.log('Text Sent');
        logger.log('info', 'Text Sent to <'+chatId+'>.');
      } 
    };
    request({
      method: 'GET',
      url: this.APIURL+this.token+'/'+route+chatId+text,
      json: true
    }, function (err, resp, body) {
      if (!err && resp.statusCode === 200) {
        cb(null, body);
      } else {
        cb(err, null);
      }
    });
  };

  //Wrapper to send images from an url
  this.wrapperPhoto = function(route, chatId, url, caption, cb) {
    cb = cb || function() { if (!self.quiet) { console.log('Photo Sent'); } };
    var form = new formData();
    form.append('chat_id', chatId);
    form.append('photo', request(url));
    if(caption !== '') {
      form.append('caption', caption);
    }

    form.submit(this.APIURL+this.token+'/'+route, function(err, resp) {
      if(!err && resp.statusCode === 200) {
        cb(null, resp);
      } else {
        cb(err, null);
      }
    });
  };

  //wrapper to send documents from an url
  this.wrapperDocument = function(route, chatId, url, cb) {
    cb = cb || function() { if (!self.quiet) { console.log('Document Sent'); } };
    var form = new formData();
    form.append('chat_id', chatId);
    form.append('document', request(url));
    form.submit(this.APIURL+this.token+'/'+route, function(err, resp) {
      if(!err && resp.statusCode === 200) {
        cb(null, resp);
      } else {
        cb(err, null);
      }
    });
  };

  //wrapper to send videos from an url
  this.wrapperVideo = function(route, chatId, url, cb) {
    cb = cb || function() { if (!self.quiet) { console.log("Video Sent"); } };
    var form = new formData();
    form.append('chat_id', chatId);
    form.append('video', request(url));
    form.submit(this.APIURL+this.token+'/'+route, function(err, resp) {
      if(!err && resp.statusCode === 200) {
        cb(null, resp);
      } else {
        cb(err, null);
      }
    });
  };

  //Wrapper to send status
  this.wrapperAction = function(route, chatId, action, cb) {
    request({
      method: 'GET',
      url: this.APIURL+this.token+'/'+route+chatId+action,
      json: true
    }, function ( err, resp, body) {
      if (!err && resp.statusCode === 200) {
        cb(null, body);
      } else {
        cb(err, null);
      }
    });
  };
}

smagenBot.prototype.getUpdates = function (cb) {
  this.wrapperText('getUpdates', '', '', cb);
};

smagenBot.prototype.sendMessage = function (message) {
    this.wrapperText('sendMessage', '?chat_id=' + this.chatId, '&text='+encodeURIComponent(message));
};

smagenBot.prototype.sendPhoto = function (url, caption, cb) {
  this.wrapperPhoto('sendPhoto', this.chatId, url, caption, cb);
};

smagenBot.prototype.sendDocument = function (url, cb) {
  this.wrapperDocument('sendDocument', this.chatId, url, cb);
};

smagenBot.prototype.sendVideo = function (url, cb) {
  this.wrapperVideo('sendVideo', this.chatId, url, cb);
};

smagenBot.prototype.sendAction = function(action, cb) {
  this.wrapperAction('sendChatAction', '?chat_id=' + this.chatId, '&action='+action, cb);
};

smagenBot.prototype.makeAction = function (text) {
  var param = "",
      nick = false;
  if(typeof text !== "undefined" && text.charAt(0) === '/') {
    text = text.split(' ');
    //If send more parameters
    if(text.length > 0) {
      for(var i = 1; i < text.length; i++) {
        param += (i < text.length-1) ? text[i]+" " : text[i];
      }
    }
    var command = text[0].replace('/',''); //Remove slash
    //if there is a nick on the command, must be my name
    command = command.split('@'); //looking for a nick
    var plugin = command[0];
    if(command.length > 0) {
      nick = command[1];
    }

    if(!nick || (nick && nick === this.botName)) {
      try {
        var self = this;
        require('../plugins/'+plugin)(param, function(objs, types) {
          for(var i in objs) {
            if(types[i] === "text") {

              var str = "";
              for(var key in objs[i]) {
                str += ((key!=="STRING") ? (key + ": ") : "") + 
                  query.escape(objs[i][key]) +
                  "\n";
              }

              self.sendAction('typing', function(err, res) {
                if(!err) {
                  self.sendMessage(str);
                }
              });
            } else if(types[i] === "photo") {
              self.sendAction('upload_photo', function(err, res) {
                if(!err) {
                  self.sendPhoto(objs[i].url, objs[i].caption, function(err, res) {
                    if(err) {
                      self.sendMessage("Error during the upload on the Telegram's Servers");
                    }
                  });
                }
              });
            } else if(types[i] === "video") {
              self.sendAction('upload_video', function(err, res) {
                if(!err) {
                  self.sendVideo(objs[i].url, function(err, res) {
                    if(!err) {
                      self.sendMessage("Error during the upload on the Telegram's Servers");
                    }
                  });
                }
              });
            }
          }
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
