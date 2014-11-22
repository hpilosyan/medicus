'use strict';

var db = require('../config/db');
var promise = require('node-promise');
var _ = require('underscore');

module.exports = {
  create_schedule: function(device_token, schedule) {
    var deferred = promise.defer();

    db.collection('device').update({token: device_token}, {'$push': {schedule: schedule}}, function (err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });

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
