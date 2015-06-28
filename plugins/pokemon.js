var request = require('request');

var exec = function (param, cb) {
  var error,
  name = "Pokémon Plugin";

  if(param) {
    var APIURL = "http://pokeapi.co/api/v1/pokemon/";
    request({
      method: 'GET',
      url: APIURL+(param.toLowerCase()),
      json: true
    }, function (err, resp, body) {
      if (!err) {
        if(resp.statusCode === 200) {
          return cb([{
            name: body.name,
            nationalId: body.national_id,
            specialAttack: body.sp_atk,
            specialDefense: body.sp_def,
            speed: body.speed,
            attack: body.attack,
            defense: body.defense,
            exp: body.exp,
            height: body.height,
            weight: body.weight,
            hp: body.hp
          }], ["text"]);
        } else {
          return cb([{
            error: "Pokémon not found"
          }], ["text"]);
        }
      }

      error = new Error("Cannot retrieve information about Pokémon");
      error.name = name;
      throw error;
    });
  } else {
    error = new Error("You must specify which pokémon you want to check");
    error.name = name;
    throw error;
  }
};

module.exports = exec;
