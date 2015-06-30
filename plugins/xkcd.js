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
        return cb([{
          url: body.img,
          caption: body.safe_title
          }], ["photo"]);
      } else {
        return cb([{
          error: "Id not found"
        }], ["text"]);
      }
    }

    error = new Error("Cannot retrieve images from xkcd");
    error.name = name;
    throw error;
  });
}

var exec = function (param, cb) {
  var APIURL;

  getLastId(function(lastId) {
    if(!param || param === "" || param === "random") {
      var id = Math.floor(Math.random() * lastId);

      APIURL = "http://xkcd.com/"+id+"/info.0.json";
      doRequest(APIURL, cb);
    } else {
      if(parseInt(param, 10) <= lastId) {
        APIURL = "http://xkcd.com/"+parseInt(param,10)+"/info.0.json";
        doRequest(APIURL, cb);
      }
    }
  });
};

module.exports = exec;
