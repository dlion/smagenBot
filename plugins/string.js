/**
 * @author carlo "blackout" denaro
 * @desc string plugin example
 * @link http://github.com/blackout314
 */
var request = require('request');

var exec = function (param, cb) {
  var error,
  name = "String Plugin";

  if(param) {
      return cb([ {"STRING":"hi "+param} ], ["text"]);
  } else {
      return cb([ {"STRING":"hello everyone"} ], ["text"]);
  }

};

module.exports = exec;
