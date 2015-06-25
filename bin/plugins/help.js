var list = require('../../list.json');

var exec = function(param, cb) {
  return cb(list);
};

module.exports = exec;
