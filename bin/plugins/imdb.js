var request = require('request'),
    query   = require('querystring');

var exec = function (param, cb) {
  var error,
      name = "IMDB Plugin";

  if(param) {
    var APIURL = "http://www.imdbapi.com/?t=";
    request({
      method: 'GET',
      url: APIURL+(query.escape(param)),
      json: true
    }, function (err, resp, body) {
      if (!err) {
        if(resp.statusCode === 200) {
          return cb({
            title: body.Title,
            year: body.Year,
            released: body.Released,
            runtime: body.Runtime,
            genre: body.Genre,
            director: body.Director,
            actors: body.Actors,
            awards: body.Awards,
            poster: body.Poster
          });
        } else {
          return cb({
            error: "Film not found"
          });
        }
      }

      error = new Error("Cannot retrieve information about this film");
      error.name = name;
      throw error;
    });
  } else {
    error = new Error("You must specify which film you want to check");
    error.name = name;
    throw error;
  }
};

module.exports = exec;
