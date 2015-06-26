var request = require('request');

var exec = function(param, cb) {
  var error,
      name = "Weather Plugin";

  if(param) {
    var APIURL = "http://api.openweathermap.org/data/2.5/weather?q=";
    request({
      method: 'GET',
      url: APIURL+param,
      json: true
    }, function (err, resp, body) {
      if(!err) {
        return cb({
          main: body.weather[0].main,
          description: body.weather[0].description,
          temp: body.main.temp,
          humidity: body.main.humidity,
          windSpeed: body.wind.speed,
          clouds: body.clouds.all
        }, "text");
      }

      error = new Error("Cannot retrieve information about weather");
      error.name = name;
      throw error;
    });
  } else {
    error = new Error("You must specify which city you want to check");
    error.name = name;
    throw error;
  }
};

module.exports = exec;


