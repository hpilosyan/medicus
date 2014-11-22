'use strict';

var db = require('../config/db');
var promise = require('node-promise');
var _ = require('underscore');

module.exports = {
  get_user_devices: function(devices) {
    var deferred = promise.defer();

    db.collection('device').find({id: {$in: devices}}).toArray(function (err, items) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(items);
      }
    });

    return deferred.promise;
  }
};