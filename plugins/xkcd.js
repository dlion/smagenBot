var request = require('request');

function getLastId(cb) {
  request.get({
    url: 'http://xkcd.com/info.0.json',
    json: true,
  }, function(err, resp, body) {
    if(!err) {
      if(resp.statusCode === 200) {
        return cb(body.num);
      }
    }
  });
}

function doRequest(APIURL, cb) {
  var error,
      name = "Xkcd Plugin";

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
}

var exec = function (param, cb) {
  var error,
      APIURL,
  name = "Xkcd Plugin";

  if(param) {
    if(param === "random") {
      getLastId(function(lastId) {
        var id = Math.floor(Math.random() * lastId);

        APIURL = "http://xkcd.com/"+id+"/info.0.json";
        doRequest(APIURL, cb);
      });
    } else {
        APIURL = "http://xkcd.com/"+param+"/info.0.json";
        doRequest(APIURL, cb);
    }
  } else {
    error = new Error("You must specify which id you want to see");
    error.name = name;
    throw error;
  }
};

module.exports = exec;
