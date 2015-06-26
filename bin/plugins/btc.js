/**
 * bitcoin ticker plugin for smagenBot
 * @author carlo "blackout" denaro
 * @link http://github.com/blackout314
 */
var request = require('request');

var exec = function (param, cb) {
  var error,
  name = "Bitcoin Ticker Plugin";

  if(param) {
    var APIURL = "https://blockchain.info/it/ticker";
    request({
      method: 'GET',
      url: APIURL,
      json: true
    }, function (err, resp, body) {
      if (!err) {
        param = param.toUpperCase();    // because params are "uppercase" eg.EUR or USD
        if(resp.statusCode === 200 && typeof body[param] !== "undefined") {
          var ticker = body[param];
          return cb({
            currency: ticker.symbol,
            exchange: ticker.last,
            buy: ticker.buy,
            sell: ticker.sell
          });
        } else {
          return cb({
            error: "Currency not found"
          });
        }
      }

      error = new Error("Cannot retrieve information about choosed currency");
      error.name = name;
      throw error;
    });
  } else {
    error = new Error("You must specify which currency you want to check");
    error.name = name;
    throw error;
  }
};

module.exports = exec;
