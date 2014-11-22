'use strict';

var promise = require('node-promise');
var request = require('request');

function send_schedule(schedule) {
  var deferred = promise.defer();

  request.post(
    {
      url: 'https://agent.electricimp.com/NB5XyYGwJkmr/update',
      json: true,
      body: schedule
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
          deferred.resolve(response);
        } else {
          deferred.reject(error);
        }
    }
  );

  return deferred.promise;
}

module.exports = {
  send_schedule: send_schedule
};