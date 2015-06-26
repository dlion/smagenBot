var request = require('request');

var exec = function (param, cb) {
  var error,
  name = "Xkcd Plugin";

  if(param) {
    var APIURL = "http://xkcd.com/"+param+"/info.0.json";
    request({
      method: 'GET',
      url: APIURL,
      json: true
    }, function (err, resp, body) {
      if (!err) {
        if(resp.statusCode === 200) {
          return cb({
            url: body.img
          }, "photo");
        } else {
          return cb({
            error: "Id not found"
          }, "text");
        }
      }

      error = new Error("Cannot retrieve images from xkcd");
      error.name = name;
      throw error;
    });
  } else {
    error = new Error("You must specify which id you want to see");
    error.name = name;
    throw error;
  }
};

module.exports = exec;
