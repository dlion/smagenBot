var request = require('request'),
    query = require('querystring');

var exec = function (param, cb) {
  var error,
      name = "Expand Plugin";

  if(param) {
    var APIURL = "http://api.longurl.org/v2/expand?url=";
    request({
      method: 'GET',
      url: APIURL+query.escape(param)+"&format=json",
      json:true
    }, function (err, resp, body) {
      if(!err) {
        return cb({
          longUrl: body['long-url']
        }, "text");
      }

      error = new Error("Cannot retrieve information about long url");
      error.name = name;
      throw error;
    });
  } else {
    error = new Error("You must specify which url you want to expand");
    error.name = name;
    throw error;
  }
};

module.exports = exec;

