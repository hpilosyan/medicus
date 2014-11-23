'use strict';

var promise = require('node-promise');
var request = require('request');
var schedule = require('./models/schedule');

function send_schedule(schedule) {
  var deferred = promise.defer();

  schedule.get_schedule(device_token).then(function (schedule) {
    request.post(
      {
        url: 'https://agent.electricimp.com/Z4NF3ZQRf552/update',
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
  });

  return deferred.promise;
}

module.exports = {
  send_schedule: send_schedule
};