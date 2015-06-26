var os = require('os');

var exec = function (param, cb) {
  var uptime;
  if((os.uptime() / 3600 < 24)) {
    uptime = parseInt(os.uptime(), 10) + " Seconds";
  } else if ((os.uptime() / 3600) > 24) { //More than 24Hours
    uptime = parseInt(os.uptime() / 86400, 10) + " Days";
  } else {
    uptime = parseInt(os.uptime() / 3600, 10) + "Minutes";
  }

  return cb({
    hostname: os.hostname(),
    type: os.type(),
    platform: os.platform(),
    arch: os.arch(),
    uptime: uptime
  }, "text");
};

module.exports = exec;
