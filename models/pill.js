'use strict';

var db = require('../config/db');
var promise = require('node-promise');
var _ = require('underscore');

module.exports = {
  add_pill: function (device_token, name) {
    var deferred = promise.defer();

    db.collection('device').update({token: device_token}, {'$push': {pills: name}}, function (err, device) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(device);
      }
    });

    return deferred.promise;
  }
};