'use strict';

var db = require('../config/db');
var promise = require('node-promise');
var _ = require('underscore');

var device = require('../models/device');

module.exports = {
  get_user: function() {
    var deferred = promise.defer();

    db.collection('user').find().toArray(function (err, items) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(items);
      }
    });

    return deferred.promise;
  },

  get_user_with_devices: function() {
    var deferred = promise.defer();

    db.collection('user').findOne(function (err, user) {
      if (err) {
        deferred.reject(err);
      } else {
        device.get_user_devices(user.devices).then(function(devices) {
          user.devices = devices;
          deferred.resolve(user);
        }, function(err) {
          deferred.reject(err);
        });
      }
    });

    return deferred.promise;
  }
};

