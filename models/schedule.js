'use strict';

var db = require('../config/db');
var promise = require('node-promise');
var _ = require('underscore');

module.exports = {
  create_schedule: function(device_token, schedule) {
    var deferred = promise.defer();

    db.collection('device').update(
      {token: device_token, 'schedule.box': schedule.box},
      {$set: { "schedule.$" : schedule }},
      function (err, result) {
        if (err) {
          deferred.reject(err);
        } else {
          // If schedule doesn't contain this box, add a new one
          if (result === 0) {
            db.collection('device').update(
              {token: device_token},
              {'$push': {schedule: {'$each': [schedule], '$sort': {box: 1}}}},
              function (err, result) {
                if (err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(result);
                }
              }
            );
            return;
          }
          deferred.resolve(result);
        }
      }
    );

    return deferred.promise;
  },

  get_schedule: function(device_token) {
    var deferred = promise.defer();

    db.collection('device').findOne({token: device_token}, function(err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result.schedule);
      }
    });

    return deferred.promise;
  }
};
